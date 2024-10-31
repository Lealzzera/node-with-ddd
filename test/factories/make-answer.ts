import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { faker } from "@faker-js/faker";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return answer;
}
