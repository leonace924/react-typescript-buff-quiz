export interface QuestionResponse {
  response_code: number;
  results?: (Question)[] | null;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  correct_answers?: (string)[] | null;
  incorrect_answers?: (string)[] | null;
}


