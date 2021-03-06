import * as yup from "yup";

export const editProfileSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .required("Podaj nazwe użytkownika")
    .max(12, "Maksymalnie 12 znaków"),
  email: yup
    .string()
    .trim()
    .required("Podaj adres email")
    .email("Nieprawidłowy adres email"),
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^\d+$/, "Nieprawidłowy numer telefonu")
    .length(9, "Nieprawidłowy numer telefonu")
    .nullable(),
});
