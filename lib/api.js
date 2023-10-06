// returns more detailed error message when fetch fails

export class ApiError extends Error {
  constructor(url, status) {
    super(`${url} returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.status = status;
  }
}
// options allows all fetch options to be passed in such as method, headers, body, etc.
export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new ApiError(url, response.status);
  }
  const data = await response.json();
  return data;
}
