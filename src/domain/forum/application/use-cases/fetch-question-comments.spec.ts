import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryCommentRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Comments Test", () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryCommentRepository);
  });
  it("Should be able to fetch question comments", async () => {
    await inMemoryCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.questionComments).toHaveLength(3);
  });

  it("Should be able to fetch paginated question comments", async () => {
    let createQuestionsPromise = [];
    for (let i = 1; i <= 22; i++) {
      createQuestionsPromise.push(
        inMemoryCommentRepository.create(
          makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
        )
      );
    }

    Promise.all(createQuestionsPromise);

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
