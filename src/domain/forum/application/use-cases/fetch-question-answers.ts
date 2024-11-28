import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-respository";

interface FetchQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );
    return { answers };
  }
}
