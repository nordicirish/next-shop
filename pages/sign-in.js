import { useState } from "react";
import Input from "../components/Input";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Page from "./Page";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", { email, password });
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
