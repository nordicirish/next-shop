import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
// useMutation is a react-query hook used to make request that modify data
import { useMutation } from "react-query";

// simulate a slow network
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // useMutation is called in an async function
  const mutation = useMutation(() =>
    fetchJson("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    // await sleep(2000);

    try {
      // call mutation
      // api response is user object
      const user = await mutation.mutateAsync();
      console.log("sign in", user);
      // redirect to home page after sign in
      router.push("/");
    } catch (error) {
      // no need to set as mutation.isError will be true;
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
        {mutation.isError && (
          <p className="text-red-700">Invalid credentials</p>
        )}
        {/* //hide button when loading */}
        {mutation.isLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}
