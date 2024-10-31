import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswersRepository {
  save(answer: Answer): Promise<void>;
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
}
