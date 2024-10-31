import { Question } from "../../enterprise/entities/question";
import { PaginationParams } from "@/core/repositories/pagination-params";

export interface QuestionsRepository {
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  save(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
