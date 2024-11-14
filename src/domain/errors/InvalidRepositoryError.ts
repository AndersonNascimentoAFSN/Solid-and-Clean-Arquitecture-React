export class InvalidTodoError extends Error {
  constructor() {
    super('Invalid Todo')
    this.name = 'InvalidTodoError'
  }
}
