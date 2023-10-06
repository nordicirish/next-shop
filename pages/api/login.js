export default function handleLogin(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    //return to prevent rest of function from running
    return;
  }
  console.log("login", req.body);
  res.status(200).json({});
}
