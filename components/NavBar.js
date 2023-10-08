import Link from "next/link";

import { fetchJson } from "../lib/api";
import { useQuery } from "react-query";

export default function NavBar() {
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
  const user = query.data;

  const handleSignOut = async () => {
    await fetchJson("/api/logout");
    // set to undefined as is the initial state of user
    // setUser(undefined);
  };

  console.log("[NavBar] user:", user);
  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
