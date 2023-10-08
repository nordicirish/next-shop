import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
// useMutation is a react-query hook used to make request that modify data
import { useMutation, useQueryClient } from "react-query";
import { useSignIn } from "@/hooks/user";

// simulate a slow network
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // use custom hook useSignIn + destructuring to get signInError and signInLoading
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      //only redirect if sign in is successful
      router.push("/");
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
        {signInError && <p className="text-red-700">Invalid credentials</p>}
        {/* //hide button when loading */}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}
