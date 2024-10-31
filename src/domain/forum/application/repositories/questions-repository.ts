import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  save(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
