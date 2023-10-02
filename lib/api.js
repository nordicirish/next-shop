export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
