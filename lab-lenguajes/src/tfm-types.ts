// Tipos de Memora: tests generados con IA a partir de un temario.

// ─── Uniones de literales ───────────────────────────────────────

export type PlanId = "gratis" | "estudiante" | "academia";

export type QuestionType = "single" | "multiple" | "true-false" | "short";

// generating → draft (la IA ya ha propuesto, el usuario revisa) → ready → archived
export type TestStatus = "generating" | "draft" | "ready" | "archived";

export type Subject =
  | "historia"
  | "biologia"
  | "quimica"
  | "matematicas"
  | "ingles"
  | "derecho"
  | "otra";

export type Theme = "teal" | "klein" | "amarillo";

// ─── Usuarios y planes ──────────────────────────────────────────

export interface Plan {
  readonly id: PlanId;
  name: string;
  pricePerMonth: number; // en euros
  aiQuestionsPerMonth: number;
  maxSavedTests?: number; // sin límite si no está
  questionTypes: QuestionType[];
  maxStudents?: number; // sólo Academia
}

export interface UserPreferences {
  theme: Theme;
  darkMode: boolean;
  dailyGoal: number; // preguntas al día
}

export interface User {
  readonly id: number;
  name: string;
  email: string;
  planId: PlanId;
  preferences: UserPreferences;
  readonly createdAt: string; // ISO 8601
}

// ─── Temario: texto pegado o PDF subido ─────────────────────────

export interface TextSource {
  kind: "text";
  content: string;
}

export interface PdfSource {
  kind: "pdf";
  fileName: string;
  pages: number;
}

export type Source = TextSource | PdfSource;

// ─── Preguntas: una unión discriminada por `type` ──────────────

interface BaseQuestion {
  readonly id: number;
  statement: string;
  explanation?: string; // se muestra al corregir
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single";
  options: string[];
  correctIndex: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple";
  options: string[];
  correctIndexes: number[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correct: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: "short";
  acceptedAnswers: string[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ShortAnswerQuestion;

// ─── Tests ──────────────────────────────────────────────────────

export interface Test {
  readonly id: number;
  readonly ownerId: number;
  title: string;
  subject: Subject;
  status: TestStatus;
  source: Source;
  questions: Question[];
  sharedWith?: number[]; // ids de alumnos (plan Academia)
  readonly createdAt: string;
  updatedAt: string;
}

// Lo que el usuario elige antes de que la IA proponga el test
export interface GenerationRequest {
  source: Source;
  subject: Subject;
  questionCount: number;
  questionTypes: QuestionType[];
}

// ─── Repaso ─────────────────────────────────────────────────────

export interface Answer {
  questionId: number;
  given: number | number[] | boolean | string; // depende del tipo de pregunta
  isCorrect: boolean;
}

export interface StudySession {
  readonly id: number;
  readonly userId: number;
  readonly testId: number;
  answers: Answer[];
  readonly startedAt: string;
  finishedAt?: string; // sin terminar si no está
}

export interface StudyStats {
  streakDays: number;
  answeredToday: number;
  accuracy: number; // 0.8 significa un 80 %
}

// ─── Tipos derivados para crear y editar ───────────────────────

// El servidor pone id, ownerId y las fechas
export type NewTest = Omit<Test, "id" | "ownerId" | "createdAt" | "updatedAt">;

// Editar: cualquier campo de NewTest, ninguno obligatorio. El id no se puede cambiar.
export type TestChanges = Partial<NewTest>;

export type NewUser = Omit<User, "id" | "createdAt" | "preferences"> & {
  preferences?: Partial<UserPreferences>; // lo que falte toma el valor por defecto
};

export type UserChanges = Partial<Omit<User, "id" | "createdAt" | "email">>;

export type NewSession = Omit<StudySession, "id" | "answers" | "finishedAt">;

// Omit sobre una unión no se reparte por cada miembro: junta las propiedades comunes
// y se pierden options, correct… Este helper aplica Omit a cada pregunta por separado.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type NewQuestion = DistributiveOmit<Question, "id">;

// Vista ligera para listados y tarjetas
export type TestPreview = Pick<Test, "id" | "title" | "subject" | "status"> & {
  questionCount: number;
};

// Cuántos tests hay en cada estado
export type TestsByStatus = Record<TestStatus, number>;

// ─── Funciones puras ────────────────────────────────────────────

// Corrige una respuesta según el tipo de pregunta. En cada case, TypeScript
// sabe qué campos tiene la pregunta (correctIndex, correct…).
export const checkAnswer = (question: Question, given: Answer["given"]): boolean => {
  switch (question.type) {
    case "single":
      return given === question.correctIndex;
    case "multiple":
      return (
        Array.isArray(given) &&
        given.length === question.correctIndexes.length &&
        question.correctIndexes.every((index) => given.includes(index))
      );
    case "true-false":
      return given === question.correct;
    case "short":
      return (
        typeof given === "string" &&
        question.acceptedAnswers.some(
          (accepted) => accepted.trim().toLowerCase() === given.trim().toLowerCase()
        )
      );
  }
};

// Aplica los cambios y devuelve un test nuevo. La fecha llega como argumento
// (no se lee el reloj aquí dentro), así que con la misma entrada da la misma salida.
export const updateTest = (test: Test, changes: TestChanges, now: string): Test => ({
  ...test,
  ...changes,
  updatedAt: now,
});

// Cuántos tests hay en cada estado, con reduce y sin mutar el acumulador
export const countTestsByStatus = (tests: Test[]): TestsByStatus =>
  tests.reduce(
    (counts, test) => ({ ...counts, [test.status]: counts[test.status] + 1 }),
    { generating: 0, draft: 0, ready: 0, archived: 0 }
  );
