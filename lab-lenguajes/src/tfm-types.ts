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
