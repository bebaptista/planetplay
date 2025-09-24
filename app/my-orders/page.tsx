'use client';

import Image from "next/image";
import { useState } from "react";

export default function MyOrdersPage() {
  const order = {
    id: "#897956",
    date: "Jul 30, 2025",
    title: "Apple Gift Card",
    trees: 6,
    codeMasked: "ABCD1234567890XX",
    image: "/apple-gift-card.png",
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-black text-white">
      <section className="relative w-full">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_160%_at_80%_0%,rgba(87,203,255,0.28)_0%,rgba(0,0,0,0)_55%),linear-gradient(180deg,rgba(43,167,140,0.65)_0%,rgba(0,0,0,0)_62%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pt-8 pb-10">
          <nav className="mb-4 text-xs text-neutral-300">
            <a href="/br/" className="hover:underline">Home</a>
            <span className="mx-2">/</span>
            <span className="text-neutral-400">My Orders</span>
          </nav>

          <h1 className="text-2xl md:text-[28px] font-bold tracking-[-0.01em]">
            My Orders
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16">
        <div className="mt-2 mb-3 text-[13px] font-medium text-neutral-300">
          {order.date}
        </div>

        <article className="rounded-md border border-neutral-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_12%)]">
          <div className="flex items-stretch gap-4 p-4 md:p-5">
            <div className="shrink-0 overflow-hidden rounded bg-neutral-900 ring-1 ring-black/50">
              <Image
                src={order.image}
                alt="Apple Gift Card"
                width={160}
                height={90}
                className="h-[68px] w-[120px] md:h-[90px] md:w-[160px] object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-[15px] md:text-base font-semibold">
                    {order.title}
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                    <span className="inline-flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 16 16" className="opacity-80" aria-hidden>
                        <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                      {order.trees} trees saved
                    </span>
                  </div>
                </div>

                <div className="hidden md:block text-xs text-neutral-400">
                  Order <span className="text-neutral-300">{order.id}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <a
                  href="#how-to-redeem"
                  className="inline-flex h-8 items-center justify-center rounded bg-neutral-800 px-3 text-xs font-medium text-neutral-100 hover:bg-neutral-700"
                >
                  How to redeem
                </a>

                <CodeCopy value={order.codeMasked} />
              </div>
            </div>
          </div>
        </article>
      </section>

      <div className="h-6" />
    </main>
  );
}

function CodeCopy({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative flex w-full sm:w-[300px] items-center">
      <div className="pointer-events-none absolute left-2 text-neutral-400">
        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
          <path d="M6 6V3.5A1.5 1.5 0 0 1 7.5 2H14a2 2 0 0 1 2 2v6.5A1.5 1.5 0 0 1 14.5 12H12" stroke="currentColor" fill="none"/>
          <rect x="4" y="6" width="8.5" height="8.5" rx="1.2" stroke="currentColor" fill="none"/>
        </svg>
      </div>
      <input
        readOnly
        value={value}
        className="h-8 w-full rounded bg-neutral-800 pl-7 pr-20 text-xs text-neutral-100 outline-none ring-1 ring-inset ring-neutral-700"
      />
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          } catch {}
        }}
        className="absolute right-1 inline-flex h-[26px] items-center rounded bg-neutral-700 px-2 text-[11px] font-medium hover:bg-neutral-600"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
