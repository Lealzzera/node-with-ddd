import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  QuestionComment,
  QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from "@faker-js/faker";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID
) {
  const questioncomment = QuestionComment.create(
    {
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return questioncomment;
}
