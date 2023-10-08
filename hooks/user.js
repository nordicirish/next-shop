import { useQuery } from "react-query";
import { fetchJson } from "../lib/api";
export default function useUser() {
  //"user" is the key for the query
  const query = useQuery(
    "user",
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
