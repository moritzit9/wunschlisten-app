"use client";

import { useEffect, useState } from "react";

type Product = {
  name: string;
  color: string;
  size: string;
  link: string;
  image: string;
};
type ProductField = keyof Product;

export default function CreatePage() {
  const [wishlists, setWishlists] = useState<Record<string, Product[]>>({});
  const [currentListName, setCurrentListName] = useState("Meine Wunschliste");
  const [form, setForm] = useState<Product>({
    name: "",
    color: "",
    size: "",
    link: "",
    image: "",
  });

  // 📥 Laden der gespeicherten Listen beim Start
  useEffect(() => {
    const stored = localStorage.getItem("wishlists");
    if (stored) {
      setWishlists(JSON.parse(stored));
    }
  }, []);

  // 💾 Speichern bei jeder Änderung
  useEffect(() => {
    localStorage.setItem("wishlists", JSON.stringify(wishlists));
  }, [wishlists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedList = [...(wishlists[currentListName] || []), form];
    setWishlists({ ...wishlists, [currentListName]: updatedList });
    setForm({ name: "", color: "", size: "", link: "", image: "" });
  };

  const clearCurrentList = () => {
    if (confirm("Wirklich Wunschliste löschen?")) {
      const newLists = { ...wishlists };
      delete newLists[currentListName];
      setWishlists(newLists);
      setCurrentListName("Meine Wunschliste");
    }
  };

  const currentProducts = wishlists[currentListName] || [];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-purple-600">
          ✨ Wunschliste: {currentListName}
        </h1>

        {/* 🎯 Wunschliste wählen oder erstellen */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Wunschliste wählen / erstellen
          </label>
          <div className="flex gap-2">
            <select
              value={currentListName}
              onChange={(e) => setCurrentListName(e.target.value)}
              className="w-1/2 border rounded-md p-2"
            >
              {Object.keys(wishlists).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
            <input
              type="text"
              value={currentListName}
              onChange={(e) => setCurrentListName(e.target.value)}
              placeholder="Neue Wunschliste"
              className="w-1/2 border rounded-md p-2 placeholder-neutral-500"
            />
          </div>
        </div>

        {/* ➕ Produkt hinzufügen */}
        <form onSubmit={addProduct} className="space-y-4">
          {(["name", "color", "size", "link", "image"] as ProductField[]).map(
            (field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field === "name" ? "Produktname" : field}
                className="w-full border rounded-md p-2 placeholder-neutral-500"
                required={field === "name"}
              />
            )
          )}
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            ➕ Produkt hinzufügen
          </button>
        </form>

        {/* 🧾 Vorschau */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-700">
              🧾 Wunschliste: {currentListName}
            </h2>
            <button
              onClick={clearCurrentList}
              className="text-sm text-red-500 underline hover:text-red-700"
            >
              Liste löschen
            </button>
            <button
              onClick={() => {
                const data = wishlists[currentListName];
                const encoded = btoa(JSON.stringify(data));
                const url = `${window.location.origin}/shared?data=${encoded}`;
                navigator.clipboard.writeText(url);
                alert("Link wurde in die Zwischenablage kopiert!");
              }}
              className="text-sm text-purple-600 underline hover:text-purple-800 ml-4"
            >
              📎 Wunschliste teilen
            </button>
          </div>
          {currentProducts.length === 0 ? (
            <p className="text-gray-500">Noch keine Produkte hinzugefügt.</p>
          ) : (
            <ul className="space-y-4">
              {currentProducts.map((product, index) => (
                <li
                  key={index}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
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
                  </div>
                  <button
                    onClick={() => {
                      const updated = currentProducts.filter(
                        (_, i) => i !== index
                      );
                      setWishlists({
                        ...wishlists,
                        [currentListName]: updated,
                      });
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
