import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryCommentRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch Answer Comments Test", () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryCommentRepository);
  });
  it("Should be able to fetch answer comments", async () => {
    await inMemoryCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    await inMemoryCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    await inMemoryCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
  });

  it("Should be able to fetch paginated answer comments", async () => {
    let createAnswersPromise = [];
    for (let i = 1; i <= 22; i++) {
      createAnswersPromise.push(
        inMemoryCommentRepository.create(
          makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
        )
      );
    }

    Promise.all(createAnswersPromise);

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
  });
});
