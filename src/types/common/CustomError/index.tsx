export interface CustomError {
  message: string;
  status: number;
  error?: Record<string, unknown>;
}
