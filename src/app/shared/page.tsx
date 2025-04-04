"use client"; // ← das ist jetzt erlaubt & nötig

import SharedContent from "./sharedContent";

export default function SharedPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-purple-600">
          🎁 Geteilte Wunschliste
        </h1>
        <SharedContent />
      </div>
    </main>
  );
}
