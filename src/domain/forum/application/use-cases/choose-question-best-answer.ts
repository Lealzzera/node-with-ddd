import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { AnswersRepository } from "../repositories/answers-respository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  questionId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

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
      throw new Error("Question Not Found!");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not Allowed!");
    }

    if (answerId !== answer?.id.toString()) {
      throw new Error("Answer Not Found");
    }

    if (answer.questionId !== question.id) {
      throw new Error("Not Allowed!");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return { question };
  }
}
