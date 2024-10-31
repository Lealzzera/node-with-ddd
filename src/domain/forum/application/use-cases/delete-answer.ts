import { throws } from "assert";
import { AnswersRepository } from "../repositories/answers-respository";
import { Answer } from "../../enterprise/entities/answer";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {
  answer: Answer;
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer Not Found!");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerRepository.delete(answer);
    return { answer };
  }
}
