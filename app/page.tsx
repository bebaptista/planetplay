"use client";

import React, { use } from "react";
import Image from 'next/image';
import GiftModal from "./components/gift-modal";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Page() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-neutral-950 to-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 bg-[radial-gradient(120%_160%_at_80%_0%,rgba(87,203,255,0.28)_0%,rgba(0,0,0,0)_55%),linear-gradient(270deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_70%)]">
          <div className="grid grid-flow-row grid-auto-rows-fr gap-15">
            <nav className="text-xs text-neutral-400 py-4 h-[1rem]">
              <a href="/br/" className="hover:text-white">Home</a>
              <span className="mx-2">›</span>
              <a href="/br/store/" className="hover:text-white">Store</a>
              <span className="mx-2">›</span>
              <span className="text-white">Apple Gift Card</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Apple Gift Card</h1>

            <div className="w-[260px] h-[180px] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
              <Image
                src="/apple-gift-card.png"
                width={260}
                height={180}
                alt="Apple Gift Card"
              />
            </div>
          </div>


          <div className="content-center pl-25">
            <div className="border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400">Price</p>
                  <p className="mt-1 text-2xl font-bold">25.00 <span className="text-sm font-medium opacity-70">USD</span></p>
                </div>
                <div className="text-xs text-emerald-400">🌱 Trees saved</div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push('/stripe-payment-page')}
                  className="bg-emerald-500/90 hover:bg-emerald-500 text-black font-semibold py-2"
                >
                  Purchase
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2"
                >
                  Gift 🎁
                </button>
                <GiftModal
                  open={open}
                  onClose={() => setOpen(false)}
                  onConfirm={() => {
                    router.push('/stripe-payment-page');
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">

            <Card title="About this Gift card">
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  For all things Apple — iPad, AirPods, Apple Watch, iPhone, MacBook, iCloud, accessories, and more.
                </li>
                <li>
                  Perfect for App Store purchases and subscriptions — get apps, games, music, movies, TV shows, and more.
                </li>
                <li>The perfect gift to say happy birthday, thank you, congratulations, and more.</li>
                <li>
                  Use it for purchases at any Apple Store location, on the Apple Store app, apple.com, the App Store, iTunes,
                  Apple Music, Apple TV+, Apple News+, Apple Books, Apple Arcade, Apple Fitness+, and iCloud.
                </li>
                <li>
                  To make purchases at an Apple Store location, take the gift card to the Apple Store before redeeming it.
                </li>
                <li>
                  For online purchases on your Apple Account, go to apple.com/redeem to add to your balance.
                </li>
                <li>Not valid for other payments.</li>
                <li>No returns or refunds on Apple Gift Cards. Terms apply.</li>
              </ul>
            </Card>

            <Card title="How to Redeem">
              <p className="text-neutral-300">
                Go to <a href="https://apple.com/redeem" className="underline hover:text-white">apple.com/redeem</a> to add to your Apple Account.
                Use your balance for online and Apple Store purchases.
              </p>
            </Card>

            <Card title="Terms and Conditions">
              <p className="text-neutral-400 text-sm leading-6">
                Valid only for U.S. transactions in Apple properties. For assistance, visit <a className="underline" href="https://support.apple.com/">support.apple.com</a> or call 1-800-275-2273. Not redeemable at Apple resellers or for cash and no resale,
                refund, or exchange, except as required by law. Apple is not responsible for unauthorized use. Terms apply: <a className="underline" href="https://apple.com/legal/itunes/us/">apple.com/legal/itunes/us/</a>.
              </p>
            </Card>
          </div>

          <aside className="lg:col-span-5 space-y-6">

            <div className="border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold mb-3">Related Products</h3>
              <div className="space-y-3">
                {[15, 50].map((price, i) => (
                  <div key={i} className="flex items-center gap-3 border border-white/10 bg-white/5 p-3">
                    <Image
                      src={`/apple-gift-card.png`}
                      width={126}
                      height={80}
                      alt="Apple Gift Card"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Apple Gift Card</p>
                      <p className="text-xs text-neutral-400">{price}.00 USD</p>
                    </div>
                    <button className="bg-white/10 px-3 py-1 text-sm hover:bg-white/20">View</button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Last seen</h2>
            <a href="#" className="text-sm text-neutral-400 hover:text-white">View all</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="group border border-white/10 bg-white/5 overflow-hidden">
                <Image
                  src={`/image${idx+1}.png`}
                  width={260}
                  height={180}
                  alt={`Image ${idx+1}`}
                />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">80.00 <span className="text-xs opacity-70">USD</span></p>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5">0.9 tons CO₂</span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-300 leading-5">
                    Conan Exiles: The Riddle of Steel Ultimate Deluxe Collection
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-white/10 bg-white/5 p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}
