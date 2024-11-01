import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug Test", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it("Should be able to get a question by its slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const questionBySlug = await sut.execute({ slug: "example-question" });

    expect(newQuestion.id).toEqual(questionBySlug.question.id);
    expect(questionBySlug.question.slug.value).toEqual(expect.any(String));
    expect(questionBySlug.question.slug.value).toEqual(newQuestion.slug.value);
  });
});
