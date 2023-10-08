import Link from "next/link";
import { fetchJson } from "../lib/api";
import { useUser } from "@/hooks/user";

export default function NavBar() {
  // use custom hook useUser
  const user = useUser();
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
