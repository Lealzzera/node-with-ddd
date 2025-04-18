import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id
    );

    return questionComment ?? null;
  }
  async delete(questionComment: QuestionComment): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    );
    this.items.splice(questionIndex, 1);
  }
  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }
}
