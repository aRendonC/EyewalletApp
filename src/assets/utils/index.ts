// Dependencies.
import validator from 'validator';

// Constants.
import * as CONSTANTS from '../../app/constanst';

export const validateEmail = (data: string): boolean => {
   if (
      !validator.isEmpty(data) &&
      validator.isEmail(data)
   ) {
     return true;
   } else {
     return false;
   }
 }

 export const validatePhone = (data: string): boolean => {
   const regExp = /^\+[1-9]{1}[0-9]{3,14}$/;
   if (regExp.test(data)) {
      return true;
   } else {
      return false;
   }

   // if (
   //    !validator.isEmpty(data) &&
   //    validator.isMobilePhone(data, CONSTANTS.LOCATION_PHONE_NUMBER)
   // ) {
   //    return true;
   // } else {
   //    return false;
   // }
}

export const validatePassword = (data: string): boolean => {
   const passwordLength = {
      min: 6,
      max: undefined
   };

   if (
      !validator.isEmpty(data) &&
      validator.isLength(data, passwordLength) &&
      !validator.isAlphanumeric(data) &&
      validator.isAscii(data)
   ) {
      return true;
   } else {
      return false;
   }
}

export const validatePin = (data: string): boolean => {
   const pinLength: object = {
      min: 6,
      max: 6
   }

   if (
      !validator.isEmpty(data) &&
      validator.isNumeric(data) &&
      validator.isLength(data, pinLength)
    ) {
      return true;
    } else {
      return false;
    }
}
