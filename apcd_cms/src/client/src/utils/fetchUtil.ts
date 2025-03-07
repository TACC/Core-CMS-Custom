import Cookies from 'js-cookie';

export class FetchError extends Error {
  public status: number;

  constructor(json: any, response: Response) {
    super(json.message);
    this.name = 'FetchError';
    this.status = response.status;
  }
}

interface FetchUtilParams {
  url: string;
  method?: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  body?: any;
}

export async function fetchUtil({
  url,
  params,
  method = 'GET',
  headers = {},
  body,
  ...options
}: FetchUtilParams) {
  const request = new URL(url, window.location.origin);
  for (const [key, val] of Object.entries(params || {})) {
    request.searchParams.append(key, val);
  }

  const fetchParams: RequestInit = {
    method,
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken') || '',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  };

  const response = await fetch(request.toString(), fetchParams);
  const json = await response.json();

  if (!response.ok) {
    throw new FetchError(json, response);
  }

  return json;
}
