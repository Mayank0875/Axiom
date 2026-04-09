/* Quiz Instructions Page — backend powered */
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Calendar, Hash, Trophy, ArrowLeft, ClipboardList } from "lucide-react";
import { ApiQuizDetail, fetchQuizDetail } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const QuizInstructionsPage = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<ApiQuizDetail | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Back */}
      <Link
        to="/quizzes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Quizzes
      </Link>

      {/* Main card */}
      <div className="border rounded-xl bg-card overflow-hidden">

        {/* Top banner */}
        <div className="bg-muted flex flex-col items-center justify-center py-14 px-6 border-b">
          <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center mb-4 shadow-md">
            <ClipboardList className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-center">{quiz.title}</h1>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">

          {/* Syllabus */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Test Syllabus
            </p>
            <p className="text-base text-foreground leading-relaxed">{quiz.description || "No syllabus provided."}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Scheduled */}
            <div className="border rounded-lg p-4 bg-secondary/40">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Scheduled For</span>
              </div>
              <p className="text-sm font-bold text-foreground">Available now</p>
            </div>

            {/* Questions */}
            <div className="border rounded-lg p-4 bg-secondary/40">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Hash className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Questions</span>
              </div>
              <p className="text-sm font-bold text-foreground">{quiz.questions.length} Questions</p>
            </div>

            {/* Total XP */}
            <div className="border rounded-lg p-4 bg-secondary/40">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Total XP</span>
              </div>
              <p className="text-sm font-bold text-foreground">{quiz.total_marks} Marks</p>
            </div>
          </div>

          {/* Instructions list */}
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

          {/* Start button */}
          <button
            onClick={() => navigate(`/quizzes/${id}/attempt`)}
            className="w-full py-3.5 bg-foreground hover:opacity-90 text-background font-semibold rounded-lg transition-opacity text-base"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructionsPage;
