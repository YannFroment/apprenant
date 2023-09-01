export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super();

    this.name = `Email ${email} is already in use!`;
  }
}
