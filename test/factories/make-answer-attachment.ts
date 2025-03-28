import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachments(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const answer = AnswerAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return answer;
}
