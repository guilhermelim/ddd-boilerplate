import { NotificationErrorProps } from './notification.interface';
import NotificationError from './notification.error';

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  messages(context?: string): string {
    let message = '';
    this.errors.forEach((error) => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }

  notify() {
    if (this.hasErrors()) {
      throw new NotificationError(this.getErrors());
    }
  }

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
