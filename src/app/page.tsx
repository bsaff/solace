"use client";

import { useRef, useState, useMemo } from "react";
import type { Advocate } from "./types";
import { Card } from "@/components/ui/card";
import AdvocateCard from "@/components/advocate-card";
import { NoDataPlaceholder } from "@/components/no-results";
import { Sun } from "lucide-react";

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advocateCards = useMemo(
    () =>
      filteredAdvocates.map((advocate) => (
        <AdvocateCard key={advocate.id} advocate={advocate} />
      )),
    [filteredAdvocates],
  );

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

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Banner */}
      <section className="w-full bg-gradient-to-br from-brand-500 to-brand-700">
        <div className="px-6 py-12 flex flex-col items-center gap-4 text-white">
          <div className="flex gap-2">
            <Sun className="text-brand-accent w-12 h-12" />
            <h1 className="text-5xl font-lora">Solace Advocates</h1>
          </div>
          <p className="text-lg opacity-90">
            Find the right health advocate for your needs
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
        </Card>

        {filteredAdvocates.length === 0 ? (
          <NoDataPlaceholder
            title={searchTerm ? "No advocates found" : undefined}
            subtitle={
              searchTerm
                ? "Try searching for a different specialty or check your spelling"
                : undefined
            }
          />
        ) : (
          <div className="w-full space-y-4">{advocateCards}</div>
        )}
      </section>
    </main>
  );
}
