import Image from "next/image";
import logo from "../../public/logo-white.png";
import Link from "next/link";

export default function Header() {
  const user: any = null;
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" href="/">
          All Tours
        </Link>
      </nav>
      <div className="header__logo">
        <Image src="/logo-white.png" width={60} height={120} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user != null && (
            <a href="" className="nav__el nav__el--logout">
              Logout
            </a>
          ) && (
            <a href="/me" className="nav__el">
              <Image
                className="nav__user-img"
                src={`/users/${user.photo}`}
                alt="Photo of user"
                width={100}
                height={100}
              />
            </a>
          )}
        <a href="/login" className="nav__el">
          Login
        </a>
        <a href="#" className="nav__el nav__el--cta">
          Sign up
        </a>
      </nav>
    </header>
  );
}

//pending logo users  and tour vraible
