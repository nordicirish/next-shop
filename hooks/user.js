import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

const USER_QUERY_KEY = "user";

export function useSignIn() {
  const queryClient = useQueryClient();
  // useMutation is called in an async function
  const mutation = useMutation(({ email, password }) =>
    fetchJson("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        // updates user data in cache
        // user is the key for the query
        // updates the navbar immediately to show user and signout
        queryClient.setQueryData(USER_QUERY_KEY, user);
        // return value used by sign-in page to assess redirect to home page
        return true;
      } catch (err) {
        return false;
      }
    },

    signInError: mutation.isError,
    siginLoading: mutation.isLoading,
  };
}
export function useUser() {
  //"user" is the key for the query
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("/api/user");
      } catch (err) {
        return undefined;
        // not signed in
      }
    },
    // options object
    {
      //user state is cached indefinitely
      cacheTime: Infinity,
      // user data is fresh for 30 seconds and won't be refetched
      // prevents unnecessary refetching
      staleTime: 30000,
    }
  );
  return query.data;
}
