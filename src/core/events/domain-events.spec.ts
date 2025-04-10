import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregated: CustomAggregate) {
    this.aggregate = aggregated;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));
    return aggregate;
  }
}

describe("domain events", () => {
  it("should be able to dispatch and listen to events", () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(() => {}, CustomAggregateCreated.name);
    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvent).toHaveLength(1);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvent).toHaveLength(0);
  });
});
