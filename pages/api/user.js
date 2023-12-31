import { fetchJson } from "@/lib/api";

// destructuring the CMS_URL from the environment variables
const { CMS_URL } = process.env;

export default async function handleUser(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (err) {
    res.status(401).end();
  }
}
