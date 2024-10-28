import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

export interface QuestionProps {
  title: string;
  content: string;
  authorId: UniqueEntityID;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
  bestAnswerId?: UniqueEntityID;
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set bestAnswerId(id: UniqueEntityID | undefined) {
    this.props.bestAnswerId = id;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
