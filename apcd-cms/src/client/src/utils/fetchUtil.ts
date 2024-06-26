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
  params?: Record<string, string>;
  // Other options you want to include
}

export async function fetchUtil({ url, params, ...options }: FetchUtilParams) {
  const request = new URL(url, window.location.origin);
  for (const [key, val] of Object.entries(params || {})) {
    request.searchParams.append(key, val);
  }

  const fetchParams: RequestInit = {
    credentials: 'same-origin',
    ...options,
  };

  fetchParams.headers = {
    'X-CSRFToken': Cookies.get('csrftoken') || '', // Make sure it's not undefined
    ...(fetchParams.headers as HeadersInit), // Explicit cast to HeadersInit
  };

  const response = await fetch(request.toString(), fetchParams);
  const json = await response.json();

  if (!response.ok) {
    throw new FetchError(json, response);
  }

  return json;
}
