import Link from "next/link";

export default function Home() {
  return (
     <div>
        <h1>Next js Deployment </h1>
        <ul>
          <li>
            <Link href='/products'>Products</Link>
          </li>
        </ul>
    </div>
  );
}
