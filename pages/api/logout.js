import cookie from "cookie";

export default function handleLogout(req, res) {
  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      // set cookie value tp empty string
      cookie.serialize("jwt", "", {
        path: "/api",
        // set expires to a time in the past
        expires: new Date(0),
      })
    )
    .json({});
}
