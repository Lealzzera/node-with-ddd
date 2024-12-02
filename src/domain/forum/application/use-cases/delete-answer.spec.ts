import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer Test", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });
  it("Should be able to delete a answer by its answerId", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    });

    const answer = await inMemoryAnswersRepository.findById(
      newAnswer.id.toString()
    );

    expect(answer).toEqual(null);
    expect(answer).toBeFalsy();
  });

  it("Should not be able to delete a answer by a wrong authorId", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "123",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
