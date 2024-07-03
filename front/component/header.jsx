import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign In", path: "/auth/signin" },
    !currentUser && { label: "Sign Up", path: "/auth/signup" },
    currentUser && { label: "Sign Out", path: "/auth/signout" },
  ].filter((link) => link);

  return (
    <div>
      <nav className="navbar navbar-light bg-light mx-3">
        <Link href="/" className="navbar-brand">
          Ticketing App
        </Link>

        <ul className="navbar-nav d-flex flex-row gap-2">
          {links.map(({ label, path }) => (
            <li key={path} className="nav-item" id={path}>
              <Link className="nav-link" href={path}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
