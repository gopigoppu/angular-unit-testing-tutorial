export class CustomValidator {
  static passwordValidator(password): any {
    if (password.pristine) {
      return null;
    }
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const URL_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    password.markAsTouched();
    if (URL_REGEXP.test(password.value)) {
      return null;
    }
    return {
      invalidFormat: true
    };
  }
}

