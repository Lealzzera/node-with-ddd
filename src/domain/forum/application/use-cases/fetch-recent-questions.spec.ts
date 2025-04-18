import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions Test", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });
  it("Should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 0, 20),
      })
    );

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 0, 18),
      })
    );

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 0, 23),
      })
    );

    const result = await sut.execute({ page: 1 });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("Should be able to fetch paginated recent questions", async () => {
    let createQuestionsPromise = [];
    for (let i = 1; i <= 22; i++) {
      createQuestionsPromise.push(
        inMemoryQuestionsRepository.create(makeQuestion())
      );
    }

    Promise.all(createQuestionsPromise);

    const result = await sut.execute({ page: 2 });

    expect(result.value?.questions).toHaveLength(2);
  });
});
