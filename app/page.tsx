"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900">

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-8 py-4 border-b bg-white/70 backdrop-blur-md">
        <h1 className="text-lg font-semibold tracking-tight">
          ResumeAI
        </h1>

        <button
          onClick={() => router.push("/resume-builder")}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Get Started
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          Build Professional Resumes in Minutes 🚀
        </h1>

        <p className="mt-4 text-zinc-600 max-w-xl text-lg">
          Create, edit, and manage multiple resumes with AI-powered suggestions,
          modern templates, and instant preview.
        </p>

        {/* CTA */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push("/resume-builder")}
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Generate Resume
          </button>

          <button
            onClick={() => router.push("/resume-history")}
            className="px-6 py-3 rounded-md border border-zinc-300 hover:bg-zinc-100"
          >
            View Resumes
          </button>
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        
        <h2 className="text-2xl font-semibold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Live Preview</h3>
            <p className="text-sm text-zinc-600">
              See your resume update in real-time as you edit.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Multiple Templates</h3>
            <p className="text-sm text-zinc-600">
              Choose from modern, corporate, and ATS-friendly designs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Save & Manage</h3>
            <p className="text-sm text-zinc-600">
              Store multiple resumes and manage them easily.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-zinc-500 py-6 border-t">
        Built with ❤️ using Next.js
      </footer>
    </div>
  );
}