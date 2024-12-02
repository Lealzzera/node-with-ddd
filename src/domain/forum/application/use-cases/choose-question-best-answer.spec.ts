import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRespository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer Test", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRespository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRespository
    );
  });
  it("Should be able to select a best answer", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
      questionId: newQuestion.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRespository.create(newAnswer);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id
    );
  });

  it("Should not be able to select a best answer with a wrong answerId", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
      questionId: newQuestion.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRespository.create(newAnswer);

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      answerId: "123",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
