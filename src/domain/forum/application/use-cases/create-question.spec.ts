import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Questions Test", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("Should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "New question title",
      content: "New question Content",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
    expect(question.authorId.toValue()).toEqual(expect.any(String));
  });
});
