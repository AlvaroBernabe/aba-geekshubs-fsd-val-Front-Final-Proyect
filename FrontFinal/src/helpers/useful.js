import dayjs from "dayjs";

export const validate = (name, data, required) => {
  switch (name) {
    case "name":
    case "surname":
    case "nombre":
    case "apellido":
    case "nombrecompleto":
    case "fullname":
    case "fullName":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[a-z]/gi.test(data)) {
        return { message: "Please fill with a valid text", validated: false };
      } else if (data.length > 70) {
        return {
          message: "The input cannot be more than 70 characters long",
          validated: false,
        };
      }
      return { message: "", validated: true };
    case "email":
    case "correo":
    case "payment":
    case "e-mail":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)
      ) {
        return { message: "Invalid e-mail format", validated: false };
      }
      return { message: "", validated: true };

    case "dni_nif":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (/^[x]*\d{8}[a-z]$/.test(data)) {
        return { message: "Invalid DNI format 11123654F", validated: false };
      } else {
      }
      return { message: "", validated: true };

    case "contraseña":
    case "password":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (data.length < 8) {
        return {
          message: "Password must be at least 8 characters long",
          validated: false,
        };
      }
      if (!/[a-z]/.test(data)) {
        return {
          message: "Password must contain at least a lower case",
          validated: false,
        };
      }
      if (!/[A-Z]/.test(data)) {
        return {
          message: "Password must contain at least an upper case",
          validated: false,
        };
      }
      if (!/[0-9]/.test(data)) {
        return {
          message: "Password must contain at least a number",
          validated: false,
        };
      }
      if (data.length > 64) {
        return {
          message: "The input cannot be more than 64 characters long",
          validated: false,
        };
      } else {
      }
      return { message: "", validated: true };
    case "phone":
    case "tfno":
    case "tlfno":
    case "telefono":
    case "phonenumber":
    case "phone_number":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[0-9]/.test(data)) {
        return { message: "Invalid phone format", validated: false };
      } else if (data.length > 10) {
        return {
          message: "The input cannot be more than 10 characters long",
          validated: false,
        };
      } else {
        return { message: "", validated: true };
      }
    default:
      console.log("Field not recognized");

    case "direction":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
        // } else if (!/[a-z]/gi.test(data)) {
        //     return {message: "Please fill with a valid text", validated: false};
      } else if (data.length > 70) {
        return {
          message: "The input cannot be more than 90 characters long",
          validated: false,
        };
      }
      return { message: "", validated: true };

    case "birth_date":
      const isAfter1900 = (date) => {
        const minDate = dayjs("1900-10-10");
        return dayjs(date).isAfter(minDate, "day");
      };
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!isAfter1900(data)) {
        return {
          message: "Please fill with a date after 1900",
          validated: false,
        };
      } else {
        return { message: "", validated: true };
      }
  }
};
