import { Response } from "express";

interface IApiResponseData<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  errorMessage?: string | null;
  stack?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
}

type ApiResponseWithoutStatusCode<T> = Omit<IApiResponseData<T>, "statusCode">;

const sendResponse = <T>(res: Response, data: IApiResponseData<T>): void => {
  const responseData: ApiResponseWithoutStatusCode<T> = {
    success: data.success,
    message: data.message || null,
    meta: data.meta || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
