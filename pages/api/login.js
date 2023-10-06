import { fetchJson } from "../../lib/api";
const { CMS_URL } = process.env;
export default async function handleLogin(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    //return to prevent rest of function from running
    return;
  }
  const { email, password } = req.body;
  // destructing jwt and user from response
  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password: password }),
    });
    //TODO: store jwt in cookie
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    // return 401 unauthorised - if login fails
    res.status(401).end();
  }
}
