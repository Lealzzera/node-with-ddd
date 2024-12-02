import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { AnswersRepository } from "../repositories/answers-respository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  questionId: string;
  answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;
export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRespository: AnswersRepository
  ) {}
  async execute({
    authorId,
    questionId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);
    const answer = await this.answerRespository.findById(answerId);

    if (questionId !== question?.id.toString()) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    if (answerId !== answer?.id.toString()) {
      return left(new ResourceNotFoundError());
    }

    if (answer.questionId !== question.id) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
