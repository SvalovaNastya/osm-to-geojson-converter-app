import createUrl from '../utils/url';

export class HttpError extends Error { }

export class ApiError extends HttpError {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class HttpResponse<T> {
  public data: T;

  public error?: ApiError;

  constructor(data: T, error?: ApiError) {
    this.data = data;
    this.error = error;
  }

  public static fromData<T>(data: T): HttpResponse<T> {
    return new HttpResponse(data, undefined);
  }

  public static fromError<T>(error: ApiError): HttpResponse<T> {
    return new HttpResponse(undefined as T, error);
  }
}

class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(
    relativeUrl: string,
    params: Record<string, string | number | string[] | number[]>,
  ): Promise<HttpResponse<T>> {
    const url = createUrl(this.baseUrl, relativeUrl, params);
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };

    return HttpClient.makeRequest<T>(url, requestInit);
  }

  private static async makeRequest<T>(
    info: RequestInfo,
    params: RequestInit,
  ): Promise<HttpResponse<T>> {
    let response: Response;
    try {
      response = await fetch(info, params);
    } catch (e) {
      throw new HttpError('Http error during request');
    }

    if (response.ok) {
      return HttpResponse.fromData<T>(await response.json());
    }

    let errorMessage: string;
    try {
      errorMessage = await response.text();
    } catch (e) {
      errorMessage = `Api error during request with status ${response.status}`;
    }

    return HttpResponse.fromError(new ApiError(response.status, errorMessage));
  }
}

export default HttpClient;
