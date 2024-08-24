export type LocationError = {
  error: string;
  errorCode: number;
  message: string;
};

export interface Location {
  latitude: number;
  longitude: number;
}
