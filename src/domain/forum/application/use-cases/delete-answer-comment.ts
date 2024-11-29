import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommnentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}
  async execute({
    authorId,
    answerCommnentId,
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommnentId
    );
    if (!answerComment) {
      throw new Error("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Method not allowed");
    }

    await this.answerCommentsRepository.delete(answerComment);
  }
}
