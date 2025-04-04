"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-100 to-white px-6 py-12">
      <Image
        src="/gift-icon.png" // optional: dein eigenes Logo
        alt="Wunschlisten Icon"
        width={80}
        height={80}
        className="mb-4"
      />

      <h1 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4">
        🎁 Wunschlisten-App
      </h1>

      <p className="text-gray-600 max-w-xl mb-8 text-lg">
        Erstelle deine persönliche Wunschliste und teile sie mit Freund:innen &
        Familie – ganz ohne WhatsApp-Nachricht-Chaos.
      </p>

      <Link
        href="/create"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition"
      >
        ➕ Jetzt Wunschliste erstellen
      </Link>
    </main>
  );
}
