import Link from "next/link";
const user = { name: "Alice" };
export default function NavBar() {
  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Home</Link>
        </li>
        <li role="separator" className="flex-1" />
        {/* spacing li role separator for accessibility */}
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button>Sign Out</button>
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
