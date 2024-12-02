import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers Test", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });
  it("Should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.answers).toHaveLength(3);
  });

  it("Should be able to fetch paginated question answers", async () => {
    let createQuestionsPromise = [];
    for (let i = 1; i <= 22; i++) {
      createQuestionsPromise.push(
        inMemoryAnswersRepository.create(
          makeAnswer({ questionId: new UniqueEntityID("question-1") })
        )
      );
    }

    Promise.all(createQuestionsPromise);

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});
