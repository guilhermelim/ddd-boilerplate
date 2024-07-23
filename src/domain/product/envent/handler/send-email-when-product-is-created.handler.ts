import EventHandlerInterface from '../../../@shared/envent/event-handler.interface';
import ProductCreatedEvent from '../product-created.event';

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ${JSON.stringify(event.eventData)}...`); // Enviando para rabbitmq
  }
}
