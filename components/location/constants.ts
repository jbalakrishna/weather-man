import { LocationError } from "./types";

export const ErrorDenied: LocationError = {
  error: "denied",
  errorCode: 1,
  message:
    "Permission was denied, please try again or open settings to allow the app to access your location.",
};

export const ErrorGeneric: LocationError = {
  error: "generic",
  errorCode: 2,
  message: "Unable to fetch location now, please try again later.",
};
