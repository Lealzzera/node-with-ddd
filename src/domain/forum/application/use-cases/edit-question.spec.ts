import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question Test", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("Should be able to edit a question by its questionId", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: "New Question Title",
      content: "New Question Content",
    });

    const question = await inMemoryQuestionsRepository.findById(
      newQuestion.id.toString()
    );

    expect(question?.title).toEqual("New Question Title");
    expect(question?.content).toEqual("New Question Content");
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "New Question Title",
      content: "New Question Content",
    });
  });

  it("Should not be able to edit a question by a wrong authorId", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(async () => {
      await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: "123",
        title: "New Question Title",
        content: "New Question Content",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to edit a question by a wrong questionId", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(async () => {
      await sut.execute({
        questionId: "123",
        authorId: newQuestion.authorId.toString(),
        title: "New Question Title",
        content: "New Question Content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
