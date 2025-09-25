"use client";

import { useRef, useState } from "react";
import type { Advocate } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvocateCard } from "@/components/AdvocateCard";
import { NoDataPlaceholder } from "../components/NoResults";

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      fetch(`/api/advocates?search=${encodeURIComponent(trimmed)}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          setFilteredAdvocates(jsonResponse.data);
        });
    }, 300);
  };

  const onClick = () => {};

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Banner */}
      <section className="w-full bg-brand-700">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-white">
          <h1 className="text-5xl font-bold font-serif">Solace Advocates</h1>
          <div className="mx-auto mt-4 w-72 border-t border-brand-accent" />
          <p className="mt-4 text-lg opacity-90">
            Find the right mental health advocate for your needs
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 items-center p-8 max-w-4xl mx-auto">
        {/* Search Panel */}
        <Card className="px-6 py-8 w-full">
          <div>
            <p className="text-sm font-extrabold tracking-wide text-slate-700">
              SEARCH BY SPECIALTY
            </p>
            <div className="mt-3">
              <input
                type="text"
                value={searchTerm}
                onChange={onChange}
                placeholder="e.g., Bipolar, LGBTQ, Trauma & PTSD..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none ring-brand-accent ring-offset-0 transition focus:border-brand-accent focus:ring-2"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
              onClick={() => {
                /* Search is live as-you-type for now */
              }}
            >
              SEARCH
            </Button>
            <Button
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={onClick}
            >
              Reset
            </Button>
          </div>
        </Card>

        {filteredAdvocates.length === 0 ? (
          <NoDataPlaceholder
            title="No advocates found"
            subtitle="Try searching for a different specialty or check your spelling"
          />
        ) : (
          <div className="w-full space-y-4">
            {filteredAdvocates.map((advocate) => (
              <AdvocateCard key={advocate.id} advocate={advocate} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
