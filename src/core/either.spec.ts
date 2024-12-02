import { Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  } else {
    return left("error");
  }
}

test("success result", () => {
  const result = doSomething(true);

  if (result.isRight()) {
    console.log(result.value);
  }

  expect(result.isRight()).toBe(true);
  expect(result.isLeft()).toBe(false);
});

test("error result", () => {
  const result = left("error");

  expect(result.isLeft()).toBe(true);
  expect(result.isRight()).toBe(false);
});
