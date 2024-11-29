import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(questionComment: QuestionComment): Promise<void>;
  create(questionComment: QuestionComment): Promise<void>;
}
