import Link from "next/link";
import footer_logo from "../../public/logo-green.png";
import Image from "next/image";
export default function Footer() {
  return (
    // <div className="footer">
    //   <div className="footer-logo">
    //     <Image src={footer_logo} alt="logo-green" />
    //   </div>
    //   <ul className="footer-nav">
    //     <li>
    //       <Link href="/">About us</Link>
    //     </li>
    //     <li>
    //       <Link href="/">Download apps</Link>
    //     </li>
    //     <li>
    //       <Link href="/">Become a guide</Link>
    //     </li>
    //     <li>
    //       <Link href="/">Careers</Link>
    //     </li>
    //     <li>
    //       <Link href="/">Contact</Link>
    //     </li>
    //   </ul>
    //   <p className="copyright">©️2023 Ansh Kaushik</p>
    // </div>
    <footer className="footer">
      <div className="footer__logo">
        <Image src={`/logo-green.png`} alt="Natours-logo" width={150} height={120} />
      </div>
      <ul className="footer__nav">
        <li>
          {" "}
          <Link href={`#`}>About Us</Link>
        </li>
        <li>
          {" "}
          <Link href={`#`}>Download apps</Link>
        </li>
        <li>
          {" "}
          <Link href={`#`}>Become a guide</Link>
        </li>
        <li>
          {" "}
          <Link href={`#`}>Careers</Link>
        </li>
        <li>
          {" "}
          <Link href={`#`}>Contact</Link>
        </li>
      </ul>
      <p className="footer__copyright">&copy; by Ansh Kaushik</p>
    </footer>
  );
}
