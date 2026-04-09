/* Faculty Panel — create lectures, assignments, quizzes, announcements */
import { useState } from "react";
import { Plus, BookOpen, FileEdit, CircleHelp, Megaphone, Trash2 } from "lucide-react";

interface CreatedItem {
  id: number;
  type: "lecture" | "assignment" | "quiz" | "announcement";
  title: string;
  details: string;
  createdAt: string;
}

const FacultyPanel = () => {
  const [items, setItems] = useState<CreatedItem[]>([]);
  const [activeTab, setActiveTab] = useState<"lecture" | "assignment" | "quiz" | "announcement">("lecture");

  const addItem = (item: Omit<CreatedItem, "id" | "createdAt">) => {
    setItems((prev) => [
      { ...item, id: Date.now(), createdAt: new Date().toLocaleString() },
      ...prev,
    ]);
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const tabs = [
    { key: "lecture" as const, label: "Lecture", icon: BookOpen },
    { key: "assignment" as const, label: "Assignment", icon: FileEdit },
    { key: "quiz" as const, label: "Quiz", icon: CircleHelp },
    { key: "announcement" as const, label: "Announcement", icon: Megaphone },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Faculty Panel</h1>

      {/* Tabs */}
      <div className="flex border rounded-lg overflow-hidden mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === t.key ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Create Form */}
      <div className="border rounded-lg bg-card p-6 max-w-2xl mb-8">
        {activeTab === "lecture" && <LectureForm onSubmit={addItem} />}
        {activeTab === "assignment" && <AssignmentForm onSubmit={addItem} />}
        {activeTab === "quiz" && <QuizForm onSubmit={addItem} />}
        {activeTab === "announcement" && <AnnouncementForm onSubmit={addItem} />}
      </div>

      {/* Created Items List */}
      <h2 className="text-base font-semibold mb-3">Created Items ({items.length})</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items created yet. Use the form above to create lectures, assignments, quizzes, or announcements.</p>
      ) : (
        <div className="space-y-2 max-w-2xl">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 bg-card flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    item.type === "lecture" ? "bg-blue-50 text-blue-700" :
                    item.type === "assignment" ? "bg-green-50 text-green-700" :
                    item.type === "quiz" ? "bg-purple-50 text-purple-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                </div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.details}</p>
              </div>
              <button onClick={() => deleteItem(item.id)} className="text-muted-foreground hover:text-destructive p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* --- Lecture Form --- */
function LectureForm({ onSubmit }: { onSubmit: (item: any) => void }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ type: "lecture", title, details: `Duration: ${duration || "N/A"} · ${description}` });
    setTitle(""); setDuration(""); setDescription("");
  };

  return (
    <div>
      <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Create Lecture</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Lecture Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Introduction to Arrays"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Duration</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 45 min"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Brief description..."
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <button onClick={handleSubmit} className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create Lecture
        </button>
      </div>
    </div>
  );
}

/* --- Assignment Form --- */
function AssignmentForm({ onSubmit }: { onSubmit: (item: any) => void }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalGrade, setTotalGrade] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ type: "assignment", title, details: `Due: ${dueDate || "N/A"} · Grade: ${totalGrade || "N/A"} · ${description}` });
    setTitle(""); setDueDate(""); setTotalGrade(""); setDescription("");
  };

  return (
    <div>
      <h3 className="font-semibold mb-4 flex items-center gap-2"><FileEdit className="w-4 h-4" /> Create Assignment</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Assignment Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Build a Portfolio"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Total Grade</label>
            <input type="number" value={totalGrade} onChange={(e) => setTotalGrade(e.target.value)} placeholder="100"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Instructions..."
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <button onClick={handleSubmit} className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>
    </div>
  );
}

/* --- Quiz Form with MCQ questions --- */
function QuizForm({ onSubmit }: { onSubmit: (item: any) => void }) {
  const [title, setTitle] = useState("");
  const [passingPct, setPassingPct] = useState("70");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correct: 0 }]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { question: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const updateQuestion = (idx: number, field: string, value: any) => {
    setQuestions((prev) => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions((prev) => prev.map((q, i) =>
      i === qIdx ? { ...q, options: q.options.map((o, j) => j === oIdx ? value : o) } : q
    ));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    const validQs = questions.filter((q) => q.question.trim());
    onSubmit({
      type: "quiz",
      title,
      details: `${validQs.length} questions · Passing: ${passingPct}%`,
    });
    setTitle(""); setPassingPct("70");
    setQuestions([{ question: "", options: ["", "", "", ""], correct: 0 }]);
  };

  return (
    <div>
      <h3 className="font-semibold mb-4 flex items-center gap-2"><CircleHelp className="w-4 h-4" /> Create Quiz</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Quiz Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Python Basics Quiz"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Passing Percentage</label>
          <input type="number" value={passingPct} onChange={(e) => setPassingPct(e.target.value)} placeholder="70"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring max-w-32" />
        </div>

        {/* Questions */}
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-3">Questions</p>
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="border rounded-lg p-4 mb-3 bg-muted/30">
              <label className="text-xs text-muted-foreground block mb-1">Question {qIdx + 1}</label>
              <input value={q.question} onChange={(e) => updateQuestion(qIdx, "question", e.target.value)}
                placeholder="Enter question..." className="w-full px-3 py-2 border rounded-lg text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-ring" />
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qIdx}`}
                      checked={q.correct === oIdx}
                      onChange={() => updateQuestion(qIdx, "correct", oIdx)}
                    />
                    <input value={opt} onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                      placeholder={`Option ${oIdx + 1}`} className="flex-1 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="text-sm text-primary hover:underline">
            + Add another question
          </button>
        </div>

        <button onClick={handleSubmit} className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create Quiz
        </button>
      </div>
    </div>
  );
}

/* --- Announcement Form --- */
function AnnouncementForm({ onSubmit }: { onSubmit: (item: any) => void }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ type: "announcement", title, details: message });
    setTitle(""); setMessage("");
  };

  return (
    <div>
      <h3 className="font-semibold mb-4 flex items-center gap-2"><Megaphone className="w-4 h-4" /> Post Announcement</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Class cancelled tomorrow"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Announcement details..."
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <button onClick={handleSubmit} className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Post Announcement
        </button>
      </div>
    </div>
  );
}

export default FacultyPanel;
