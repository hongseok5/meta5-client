"use client"  
import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function SideNav() {
  const pathname = usePathname();
  console.log("pathename : " + pathname)


  return (
    <nav style={{ width: '200px', background: '#e9ecef', padding: '10px', height: '100vh' }}>
      <ul>
        <li>
          <Link
            href="/"
            className={pathname === "/" ? "font-bold text-blue-500" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/player"
            className={pathname === "/player" ? "font-bold text-blue-500" : ""}
          >
            Route 1
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={pathname === "/contact" ? "font-bold text-blue-500" : ""}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/domain"
            className={pathname === "/domain" ? "font-bold text-blue-500" : ""}
          >
            도메인
          </Link>
        </li>
        <li>
          <Link
            href="/words"
            className={pathname === "/words" ? "font-bold text-blue-500" : ""}
          >
            단어
          </Link>
        </li>
        <li>
          <Link
            href="/terms"
            className={pathname === "/terms" ? "font-bold text-blue-500" : ""}
          >
            용어
          </Link>
        </li>
      </ul>
  
    </nav>
  );
}
  