import { useState } from "react";
import Input from "../components/Input";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Page from "./Page";
import { fetchJson } from "@/lib/api";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchJson("http://localhost:1337/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password: password }),
    });
    console.log("sign in", response);
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
        <Button type="submit">Sign In</Button>
      </form>
    </Page>
  );
}
