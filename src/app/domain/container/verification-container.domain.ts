export class VerificationContainer {
  verification: boolean;

  public static Instance(setter: boolean) {
    let result = new VerificationContainer;
    result.verification = setter;
    return result;
  }
}
