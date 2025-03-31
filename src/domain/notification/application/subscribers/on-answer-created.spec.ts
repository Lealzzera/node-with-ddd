import { makeAnswer } from "test/factories/make-answer";
import { OnAnswerCreated } from "./on-answer-created";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAttachmentsRepository: InMemoryAnswerAttachmentsRepository;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAttachmentsRepository
    );
  });
  it("should send notification when answer is created", async () => {
    const onAnswerCreated = new OnAnswerCreated();

    const answer = makeAnswer();

    inMemoryAnswersRepository.create(answer);
  });
});
