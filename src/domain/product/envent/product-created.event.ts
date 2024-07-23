import EventInterface from '../../@shared/envent/event.interface';

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: unknown;

  constructor(eventData: unknown) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
