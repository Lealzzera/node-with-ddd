import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification Test", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });
  it("Should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "New notification title",
      content: "New notification Content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0].id).toEqual(
      result.value?.notification.id
    );
  });
});
