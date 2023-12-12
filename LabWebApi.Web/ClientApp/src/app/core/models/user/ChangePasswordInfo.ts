import { alpha, compare, email, maxDate, minLength, password, required } from
"@rxweb/reactive-form-validators";
export class ChangePasswordInfo {
    @password({validation:{minLength: 5, digit: true, specialCharacter: true}})
    password: any;
    @required()
    @password({validation:{minLength: 5, digit: true, specialCharacter: true}})
    @compare({fieldName:'password'})
    confirmPassword: any;
}