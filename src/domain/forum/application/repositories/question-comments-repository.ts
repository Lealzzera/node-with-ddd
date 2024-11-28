import { Question } from "../../enterprise/entities/question";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
