"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  name: string;
  color: string;
  size: string;
  link: string;
  image: string;
};

export default function SharedContent() {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const data = params.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        if (Array.isArray(decoded)) {
          setProducts(decoded);
        }
      } catch (err) {
        console.error("Fehler beim Dekodieren der Wunschliste", err);
      }
    }
  }, [params]);

  return (
    <>
      {products.length === 0 ? (
        <p className="text-gray-500">
          Keine Produkte gefunden oder ungültiger Link.
        </p>
      ) : (
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-gray-50 flex items-center gap-4"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              )}
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.color} • {product.size}
                </p>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  Link öffnen
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
