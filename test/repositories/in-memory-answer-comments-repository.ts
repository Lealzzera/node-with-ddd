import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const questionComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.items.find(
      (item) => item.id.toString() === id
    );

    return answerComment ?? null;
  }
  async delete(answerComment: AnswerComment): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.id === answerComment.id
    );
    await this.items.splice(answerIndex, 1);
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }
}
