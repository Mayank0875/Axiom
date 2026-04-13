import { createContext, useContext, useState, useMemo } from "react";

export type Semester = {
  number: number;
  label: string;
  year: number; // academic year within the program (1, 2, 3, 4)
};

// Dummy program: 4-year, 8-semester B.Tech Computer Science
const DUMMY_SEMESTERS: Semester[] = [
  { number: 1, label: "Semester 1", year: 1 },
  { number: 2, label: "Semester 2", year: 1 },
  { number: 3, label: "Semester 3", year: 2 },
  { number: 4, label: "Semester 4", year: 2 },
  { number: 5, label: "Semester 5", year: 3 },
  { number: 6, label: "Semester 6", year: 3 },
  { number: 7, label: "Semester 7", year: 4 },
  { number: 8, label: "Semester 8", year: 4 },
];

const STORAGE_KEY = "axiom_selected_semester";

type SemesterContextValue = {
  semesters: Semester[];
  selected: Semester;
  setSelected: (s: Semester) => void;
};

const SemesterContext = createContext<SemesterContextValue | undefined>(undefined);

export const SemesterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelectedState] = useState<Semester>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Semester;
      } catch {
        /* ignore */
      }
    }
    return DUMMY_SEMESTERS[0];
  });

  const setSelected = (s: Semester) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    setSelectedState(s);
  };

  const value = useMemo<SemesterContextValue>(
    () => ({ semesters: DUMMY_SEMESTERS, selected, setSelected }),
    [selected]
  );

  return <SemesterContext.Provider value={value}>{children}</SemesterContext.Provider>;
};

export const useSemester = () => {
  const ctx = useContext(SemesterContext);
  if (!ctx) throw new Error("useSemester must be used inside SemesterProvider");
  return ctx;
};
