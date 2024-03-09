import { Answer } from "./answer.model";

export interface Question {
  question: string;
  hint: string;
  answers: Answer[];
  numberOfCorrectAns: number;
}
