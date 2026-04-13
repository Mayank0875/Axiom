import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Calendar, Hash, Trophy, ArrowLeft, ClipboardList, CheckCircle2 } from "lucide-react";
import { ApiQuizDetail, ApiQuizAttempt, fetchQuizDetail, fetchMyQuizAttempt } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const QuizInstructionsPage = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<ApiQuizDetail | null>(null);
  const [attempt, setAttempt] = useState<ApiQuizAttempt | null | undefined>(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token || !id) return;
    Promise.all([
      fetchQuizDetail(Number(id), auth.token),
      fetchMyQuizAttempt(Number(id), auth.token).catch(() => null),
    ])
      .then(([quizData, attemptData]) => {
        setQuiz(quizData);
        setAttempt(attemptData);
      })
      .finally(() => setLoading(false));
  }, [auth?.token, id]);

  if (loading) {
    return <div className="text-sm text-muted-foreground p-8">Loading quiz…</div>;
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Quiz not found.
      </div>
    );
  }

  const isAttempted = !!attempt;

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Link
        to="/home/quizzes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Quizzes
      </Link>

      <div className="border rounded-xl bg-card overflow-hidden">
        {/* Banner */}
        <div className={`flex flex-col items-center justify-center py-14 px-6 border-b ${isAttempted ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-muted"}`}>
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-md ${isAttempted ? "bg-emerald-600" : "bg-foreground"}`}>
            {isAttempted
              ? <CheckCircle2 className="w-10 h-10 text-white" />
              : <ClipboardList className="w-10 h-10 text-background" />
            }
          </div>
          <h1 className="text-xl font-bold text-center">{quiz.title}</h1>
          {isAttempted && attempt && (
            <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Score: {attempt.score} / {quiz.total_marks}
            </p>
          )}
        </div>

        <div className="p-8 space-y-8">
          {/* Syllabus */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Test Syllabus
            </p>
            <p className="text-base text-foreground leading-relaxed">
              {quiz.description || "No syllabus provided."}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-secondary/40">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Status</span>
              </div>
              <p className="text-sm font-bold">
                {isAttempted
                  ? <span className="text-emerald-600">Submitted</span>
                  : "Available"}
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-secondary/40">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Hash className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Questions</span>
              </div>
              <p className="text-sm font-bold">{quiz.questions.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-secondary/40">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Total Marks</span>
              </div>
              <p className="text-sm font-bold">{quiz.total_marks}</p>
            </div>
          </div>

          {/* Already attempted — show result + review button */}
          {isAttempted && attempt ? (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                  You have already submitted this quiz.
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted on {new Date(attempt.submitted_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
              <button
                onClick={() => navigate(`/home/quizzes/${id}/review?attemptId=${attempt.id}`)}
                className="w-full py-3.5 bg-foreground hover:opacity-90 text-background font-semibold rounded-lg transition-opacity"
              >
                View Result & Review
              </button>
            </div>
          ) : (
            /* Not attempted — show instructions + start */
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Instructions
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  {[
                    "Read each question carefully before selecting an answer.",
                    "You can navigate between questions using Previous and Next buttons.",
                    "Use 'Mark for Review' to flag questions you want to revisit.",
                    "You can change your answer any time before submitting.",
                    "Once submitted, you cannot re-attempt the quiz.",
                  ].map((instruction, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-muted border text-xs font-bold flex items-center justify-center shrink-0 text-muted-foreground">
                        {i + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => navigate(`/home/quizzes/${id}/attempt`)}
                className="w-full py-3.5 bg-foreground hover:opacity-90 text-background font-semibold rounded-lg transition-opacity"
              >
                Start Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizInstructionsPage;
