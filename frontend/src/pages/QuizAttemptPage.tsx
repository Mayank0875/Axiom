/* Quiz Attempt Page — backend powered */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, LayoutGrid, Bookmark } from "lucide-react";
import { ApiQuizDetail, fetchQuizDetail, submitQuiz } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// Status of each question for the bottom dot navigator
type QuestionStatus = "unattempted" | "attempted" | "viewed" | "marked";

const QuizAttemptPage = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<ApiQuizDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Current question index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Stores the selected answer for each question: { questionId: optionKey }
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Questions marked for review
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);

  // Questions that have been viewed (navigated to)
  const [viewed, setViewed] = useState<number[]>([0]);

  useEffect(() => {
    if (!auth?.token || !id) return;
    fetchQuizDetail(Number(id), auth.token)
      .then(setQuiz)
      .finally(() => setLoading(false));
  }, [auth?.token, id]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading quiz...</div>;
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Quiz not found.
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Select an answer for the current question
  const handleSelectOption = (key: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }));
  };

  // Clear the selected answer for current question
  const handleClearSelection = () => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
  };

  // Toggle mark for review
  const handleMarkForReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  // Navigate to a specific question
  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    // Mark as viewed if not already
    if (!viewed.includes(index)) {
      setViewed((prev) => [...prev, index]);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  // Submit the quiz — save answers to sessionStorage and go to review
  const handleSubmit = () => {
    if (!auth?.token || !auth?.user?.id) return;
    submitQuiz(
      Number(id),
      {
        studentId: Number(auth.user.id),
        answers,
      },
      auth.token
    ).then((attempt) => {
      navigate(`/quizzes/${id}/review?attemptId=${attempt.id}`);
    });
  };

  // Determine the dot color/status for each question
  const getStatus = (index: number): QuestionStatus => {
    const q = questions[index];
    if (markedForReview.includes(q.id)) return "marked";
    if (answers[q.id]) return "attempted";
    if (viewed.includes(index)) return "viewed";
    return "unattempted";
  };

  const isMarked = markedForReview.includes(currentQuestion.id);
  const selectedKey = answers[currentQuestion.id];

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Top bar: quiz title + submit */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <p className="text-sm font-semibold text-foreground leading-snug max-w-md">
          {quiz.title}
        </p>
        <button
          onClick={handleSubmit}
          className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Submit Quiz
        </button>
      </div>

      {/* Question area */}
      <div className="flex-1 border rounded-xl bg-card p-6">
        {/* Question header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Question {currentIndex + 1}/{totalQuestions}
          </p>
          <div className="flex items-center gap-2">
            {/* Mark for review */}
            <button
              onClick={handleMarkForReview}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                isMarked
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              {isMarked ? "Marked" : "Mark for review"}
            </button>

            {/* Clear selection */}
            <button
              onClick={handleClearSelection}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>

        {/* Question text */}
        <p className="text-base font-semibold text-foreground mb-5">
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
                    ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-medium"
                    : "border-border hover:bg-muted text-foreground"
                }`}
              >
                {/* Option key badge */}
                <span
                  className={`w-6 h-6 rounded shrink-0 flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {option.key}
                </span>
                {option.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom navigator */}
      <div className="mt-4 border rounded-xl bg-card px-4 py-3">
        {/* Question dots */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {questions.map((_, index) => {
            const status = getStatus(index);
            const isCurrent = index === currentIndex;

            // Color map for each status
            const dotStyle = isCurrent
              ? "bg-blue-100 border-2 border-blue-500 text-blue-700 font-bold"
              : status === "attempted"
              ? "bg-emerald-100 border border-emerald-400 text-emerald-700"
              : status === "marked"
              ? "bg-blue-500 text-white border border-blue-500"
              : status === "viewed"
              ? "bg-yellow-100 border border-yellow-400 text-yellow-700"
              : "bg-white border border-border text-muted-foreground";

            return (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${dotStyle}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-400 inline-block" />
            Attempted
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-yellow-100 border border-yellow-400 inline-block" />
            Viewed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-100 border-2 border-blue-500 inline-block" />
            Current Question
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
            Marked for Review
          </span>
        </div>

        {/* Prev / grid / Next */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Grid icon — placeholder for overview modal */}
          <button className="p-2 border rounded-lg hover:bg-muted transition-colors">
            <LayoutGrid className="w-4 h-4 text-muted-foreground" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizAttemptPage;
