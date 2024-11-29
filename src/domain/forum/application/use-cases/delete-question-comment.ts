import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommnentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}
  async execute({
    authorId,
    questionCommnentId,
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommnentId
    );
    if (!questionComment) {
      throw new Error("Question comment not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Method not allowed");
    }

    await this.questionCommentsRepository.delete(questionComment);
  }
}
