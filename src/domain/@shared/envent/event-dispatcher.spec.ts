import SendEmailWhenProductIsCreatedHandler from '../../product/envent/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/envent/product-created.event';
import EventDispatcher from './event-dispatcher';

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(2);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][1]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(2);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][1]).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      description: 'Product 1 description',
      name: 'Product 1',
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
