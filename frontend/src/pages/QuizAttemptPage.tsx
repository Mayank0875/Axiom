import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bookmark, BookOpen } from "lucide-react";
import { ApiQuizDetail, fetchQuizDetail, fetchMyQuizAttempt, submitQuiz } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type QuestionStatus = "unattempted" | "attempted" | "viewed" | "marked";

const QuizAttemptPage = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<ApiQuizDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  // answers: questionId (number) → selected option key
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [viewed, setViewed] = useState<number[]>([0]);

  useEffect(() => {
    if (!auth?.token || !id) return;
    setLoading(true);
    // If already attempted, redirect to review immediately
    fetchMyQuizAttempt(Number(id), auth.token)
      .then((attempt) => {
        if (attempt) {
          navigate(`/home/quizzes/${id}/review?attemptId=${attempt.id}`, { replace: true });
          return Promise.resolve();
        }
        return fetchQuizDetail(Number(id), auth.token).then(setQuiz);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load quiz."))
      .finally(() => setLoading(false));
  }, [auth?.token, id]);

  // ── loading / error / empty guards ──────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-muted-foreground">Loading quiz…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-sm text-destructive">{error}</p>
        <Link to="/home/quizzes" className="text-sm text-primary underline">Back to Quizzes</Link>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground text-sm">
        Quiz not found.
      </div>
    );
  }

  const questions = quiz.questions ?? [];

  // Guard: quiz exists but has no questions yet
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <BookOpen className="w-10 h-10 text-muted-foreground opacity-40" />
        <p className="font-semibold">No questions available</p>
        <p className="text-sm text-muted-foreground">This quiz has no questions added yet.</p>
        <Link to="/home/quizzes" className="text-sm text-primary underline">Back to Quizzes</Link>
      </div>
    );
  }

  const totalQuestions = questions.length;
  // Clamp index in case of stale state
  const safeIndex = Math.min(currentIndex, totalQuestions - 1);
  const currentQuestion = questions[safeIndex];
  // Normalise id to number — pg returns bigint as string
  const currentQId = Number(currentQuestion.id);

  // ── handlers ────────────────────────────────────────────────

  const handleSelectOption = (key: string) => {
    setAnswers((prev) => ({ ...prev, [currentQId]: key }));
  };

  const handleClearSelection = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQId];
      return next;
    });
  };

  const handleMarkForReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQId)
        ? prev.filter((x) => x !== currentQId)
        : [...prev, currentQId]
    );
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    if (!viewed.includes(index)) setViewed((prev) => [...prev, index]);
  };

  const handleSubmit = async () => {
    if (!auth?.token || !auth?.user?.id || !id) return;
    setSubmitting(true);
    try {
      const stringAnswers: Record<string, string> = {};
      Object.entries(answers).forEach(([k, v]) => { stringAnswers[k] = v; });

      const attempt = await submitQuiz(
        Number(id),
        { studentId: Number(auth.user.id), answers: stringAnswers },
        auth.token
      );
      navigate(`/home/quizzes/${id}/review?attemptId=${attempt.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
      setSubmitting(false);
    }
  };

  const getStatus = (index: number): QuestionStatus => {
    const qId = Number(questions[index].id);
    if (markedForReview.includes(qId)) return "marked";
    if (answers[qId]) return "attempted";
    if (viewed.includes(index)) return "viewed";
    return "unattempted";
  };

  const isMarked = markedForReview.includes(currentQId);
  const selectedKey = answers[currentQId];
  const attemptedCount = Object.keys(answers).length;

  // ── render ───────────────────────────────────────────────────
  return (
    <div className="w-full flex flex-col gap-4">

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Link
            to="/home/quizzes"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
          >
            <ArrowLeft className="w-3 h-3" /> Quizzes
          </Link>
          <p className="text-sm font-semibold truncate">{quiz.title}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="shrink-0 px-4 py-2 bg-primary hover:opacity-90 text-primary-foreground text-sm font-semibold rounded-lg transition-opacity disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Quiz"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4 items-start">

        {/* ── Question card ── */}
        <div className="border rounded-xl bg-card p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Question {safeIndex + 1} / {totalQuestions}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkForReview}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  isMarked
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isMarked ? "Marked" : "Mark for review"}
              </button>
              <button
                onClick={handleClearSelection}
                className="px-3 py-1.5 rounded-lg border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Question text */}
          <p className="text-base font-semibold text-foreground mb-5 leading-relaxed">
            {currentQuestion.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedKey === option.key;
              return (
                <button
                  key={option.key}
                  onClick={() => handleSelectOption(option.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm text-left transition-all ${
                    isSelected
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs font-bold ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {option.key}
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <button
              onClick={() => goToQuestion(safeIndex - 1)}
              disabled={safeIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-xs text-muted-foreground">
              {attemptedCount}/{totalQuestions} answered
            </span>
            <button
              onClick={() => goToQuestion(safeIndex + 1)}
              disabled={safeIndex === totalQuestions - 1}
              className="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Question palette (right panel) ── */}
        <div className="border rounded-xl bg-card p-4 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Questions
          </p>

          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((_, index) => {
              const status = getStatus(index);
              const isCurrent = index === safeIndex;
              const dotStyle = isCurrent
                ? "bg-primary text-primary-foreground border-primary font-bold"
                : status === "attempted"
                ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                : status === "marked"
                ? "bg-amber-100 border-amber-400 text-amber-700"
                : status === "viewed"
                ? "bg-muted border-border text-muted-foreground"
                : "bg-background border-border text-muted-foreground";

              return (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-full aspect-square rounded-md text-xs border flex items-center justify-center transition-all ${dotStyle}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="space-y-1.5 text-xs text-muted-foreground pt-1 border-t">
            {[
              { color: "bg-primary", label: "Current" },
              { color: "bg-emerald-100 border border-emerald-400", label: "Answered" },
              { color: "bg-amber-100 border border-amber-400", label: "Marked" },
              { color: "bg-muted border border-border", label: "Visited" },
              { color: "bg-background border border-border", label: "Not visited" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm shrink-0 ${color}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttemptPage;
