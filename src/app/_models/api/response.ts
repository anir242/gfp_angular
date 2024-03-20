export interface Response<T> {
  status?: number;
  message?: string;
  error?: string;
  success?: boolean;
  code?: string;
  data?: T;
  total?: number;
}
