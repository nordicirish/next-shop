import { useState } from "react";
import Input from "../components/Input";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Page from "./Page";
import { fetchJson } from "@/lib/api";

// simulate a slow network
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // await sleep(2000);
    setStatus({ loading: true, error: false });
    try {
      const response = await fetchJson("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setStatus({ loading: false, error: false });
      console.log("sign in", response);
    } catch (error) {
      setStatus({ loading: false, error: true });
    }
  };
  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {status.error && <p className="text-red-700">Invalid credentials</p>}
        {/* //hide button when loading */}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}
