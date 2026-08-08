export class PriorityMessagesServiceError extends Error {
  public constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = 'PriorityMessagesServiceError';
  }
}
