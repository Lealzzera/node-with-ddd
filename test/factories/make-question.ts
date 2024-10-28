import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: "Question Title",
    slug: Slug.create("question-title"),
    content: "Question Content",
    authorId: new UniqueEntityID(),
  });

  return question;
}
