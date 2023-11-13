import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { VALID_NIGERIAN_PHONE_NUMBER_REGEX } from 'src/utils/constants';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
         return VALID_NIGERIAN_PHONE_NUMBER_REGEX.test(value)
        },
      },
    });
  };
}
