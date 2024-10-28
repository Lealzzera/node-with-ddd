import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Questions Test", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });
  it("Should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      questionId: "1",
      content: "Answer Content",
      instructorId: "1",
    });

    expect(answer.id).toBeTruthy();
    expect(answer.questionId.toValue()).toEqual(expect.any(String));
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
    expect(answer.authorId.toValue()).toEqual(expect.any(String));
  });
});
