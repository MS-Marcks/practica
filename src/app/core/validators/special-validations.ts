export class SpecialValidations {

  static password(controlName: string): any {
    return (control: any) => {
      if (!control?.value) return;
      const urlRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isCorrect = urlRegex.test(control?.value);
      if (isCorrect) return null;
      return { [`${controlName}_invalid_format`]: true };
    };
  }
}
