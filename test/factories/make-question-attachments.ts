import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  QuestionAttachmentProps,
  QuestionAttachment,
} from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachments(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const question = QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return question;
}
