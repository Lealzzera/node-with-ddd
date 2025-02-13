import { expect, test } from "vitest";
import { Slug } from "./slug";

test("it should be able to create a new slug from a title", () => {
  const slug = Slug.createFromText("Example question title");

  expect(slug.value).toEqual("example-question-title");
});
