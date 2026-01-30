// by default next 15 support server components and hence we wish to add interactivity by using useState useEffects etc we have use use client directive
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsCSR() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //client side fetching and rendering
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
       <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Products CSR Data
      </h1>

      {loading ? (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="rounded-2xl border border-gray-200 p-4 shadow-sm animate-pulse"
            >
              <div className="h-24 w-24 rounded-lg bg-gray-200" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
              <div className="mt-4 h-6 w-24 rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <li
              key={product.id}
              className="group rounded-2xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product.image}
                  alt={product.title} width={200} height={300}
                  className="h-24 w-24 rounded-lg object-contain"
                  loading="lazy"
                />
                <div>
                  <h2 className="line-clamp-2 text-lg font-medium group-hover:text-blue-600">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-base font-semibold">
                  ₹{(product.price * 84).toFixed(0)}
                </p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {product.rating?.rate ?? "—"} ★
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                {product.description}
              </p>

              <button className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
