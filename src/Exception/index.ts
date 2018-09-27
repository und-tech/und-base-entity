export class ValueRequiredNotFoundError extends Error {
  constructor(valueName: string) {
    super(`Attribute ${valueName} is required`);
  }
}
