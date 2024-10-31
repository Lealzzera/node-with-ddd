import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-respository";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer Not Found!");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    answer.content = content;

    await this.answersRepository.save(answer);
    return { answer };
  }
}
