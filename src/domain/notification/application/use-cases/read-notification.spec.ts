import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { ReadNotificationUseCase } from "./read-notification";
import { makeNotification } from "test/factories/make-notification";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/domain/forum/application/use-cases/errors/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification Test", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });
  it("Should be able to read a notification", async () => {
    const notification = makeNotification();

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it("Should not be able to read a notification from another user", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("recipient-1"),
    });

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: "recipient-2",
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
