import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-respository";
import { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("Answer question test", async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(
    fakeAnswersRepository
  );
  const answer = await answerQuestionUseCase.execute({
    instructorId: "1",
    questionId: "1",
    content: "New answer",
  });

  expect(answer.content).toEqual("New answer");
  expect(answer.id.toValue()).toEqual(expect.any(String));
});
