import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer Test", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });
  it("Should be able to edit a answer by its answerId", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: "New Answer Content",
    });

    const answer = await inMemoryAnswersRepository.findById(
      newAnswer.id.toString()
    );

    expect(answer?.content).toEqual("New Answer Content");
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "New Answer Content",
    });
  });

  it("Should not be able to edit a answer by a wrong authorId", async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID("author-1") });

    await inMemoryAnswersRepository.create(newAnswer);

    expect(async () => {
      await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: "123",
        content: "New Answer Content",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to edit a answer by a wrong answerId", async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID("author-1") });

    await inMemoryAnswersRepository.create(newAnswer);

    expect(async () => {
      await sut.execute({
        answerId: "123",
        authorId: newAnswer.authorId.toString(),
        content: "New Answer Content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
