/* Quiz Review Page — shown after submission or when quiz is already submitted */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ApiQuizReview, fetchQuizReview } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const QuizReviewPage = () => {
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const attemptId = Number(searchParams.get("attemptId"));
  const [quiz, setQuiz] = useState<ApiQuizReview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token || !attemptId) return;
    fetchQuizReview(attemptId, auth.token)
      .then(setQuiz)
      .finally(() => setLoading(false));
  }, [attemptId, auth?.token]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading review...</div>;
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Quiz not found.
      </div>
    );
  }

  const correctCount = quiz.questions.filter((q) => q.isCorrect).length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Link
            to="/quizzes"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <p className="text-sm font-semibold text-foreground leading-snug max-w-md">
            {quiz.title}
          </p>
        </div>
        <span className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700">
          Submitted
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 items-start">
        <div className="border rounded-xl bg-card p-4 space-y-4 lg:sticky lg:top-6">
          <div>
            <p className="text-xs text-muted-foreground">Total Questions</p>
            <p className="text-lg font-semibold mt-1">{quiz.questions.length} Questions</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Test Date</p>
            <p className="text-base font-semibold mt-1">-</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="text-base font-semibold mt-1">
              {correctCount}/{quiz.questions.length} ({quiz.score})
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {quiz.questions.map((question, index) => {
            const userKey = question.selectedKey;
            const isCorrect = question.isCorrect;

            return (
              <section key={question.id} className="pb-6 border-b last:border-b-0">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.16em]">
                    Question {index + 1}/{quiz.questions.length}
                  </p>
                  <p className={`text-xs font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                </div>

                <p className="text-lg font-semibold text-foreground mb-4">{question.question}</p>

                <div className="space-y-2.5">
                  {question.options.map((option) => {
                    const isUserChoice = userKey === option.key;
                    const isCorrectOption = option.key === question.correctKey;

                    let optionStyle = "border-border bg-card text-foreground";
                    if (isCorrectOption) {
                      optionStyle = "border-emerald-300 bg-emerald-50 text-emerald-800";
                    } else if (isUserChoice && !isCorrect) {
                      optionStyle = "border-red-300 bg-red-50 text-red-700";
                    }

                    return (
                      <div
                        key={option.key}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm ${optionStyle}`}
                      >
                        <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
                          {option.key}
                        </span>
                        <span className="flex-1">{option.text}</span>
                        {isCorrectOption && (
                          <span className="text-xs font-semibold text-emerald-700">✓</span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="text-xs font-semibold text-red-700">✕</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Your answer: <span className="font-semibold text-foreground">{userKey || "Not answered"}</span>
                  {" • "}
                  Correct answer: <span className="font-semibold text-emerald-700">{question.correctKey}</span>
                </p>

                <div className="mt-3 p-3 border rounded-lg bg-muted/40 text-sm text-foreground leading-relaxed">
                  <span className="font-semibold">Explanation:</span> {question.explanation}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizReviewPage;
