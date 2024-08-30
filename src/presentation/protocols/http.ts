export type HttpResponseSuccess = any;

export interface HttpResponseError {
  error_code: string;
  error_description: string | Error;
}

export type HttpResponse = HttpResponseSuccess | HttpResponseError;

export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
}
