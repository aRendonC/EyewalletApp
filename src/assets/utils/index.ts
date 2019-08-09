// Dependencies.
import validator from 'validator';

// Constants.

export const validateEmail = (data: string): boolean => {
   return !!(!validator.isEmpty(data) &&
       validator.isEmail(data));
 };

 export const validatePhone = (data: string): boolean => {
   const regExp = /^\+[1-9][0-9]{3,14}$/;
   return regExp.test(data);
};

export const validatePassword = (data: string): boolean => {
   const passwordLength = {
      min: 6,
      max: undefined
   };

   return !!(!validator.isEmpty(data) &&
       validator.isLength(data, passwordLength) &&
       !validator.isAlphanumeric(data) &&
       validator.isAscii(data));
};

export const validatePin = (data: string): boolean => {
   const pinLength: object = {
      min: 6,
      max: 6
   };

   return !!(!validator.isEmpty(data) &&
       validator.isNumeric(data) &&
       validator.isLength(JSON.stringify(data), pinLength));
};

export const validatePinRegistry = (data: string): boolean => {
   const pinLength: object = {
      min: 6,
      max: 6
   };

   return validator.isLength(JSON.stringify(data), pinLength);
}
