import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default interface EventDispatcherInterface {
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  notify(event: EventInterface): void;
  unregisterAll(): void;
}
