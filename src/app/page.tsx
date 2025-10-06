/** biome-ignore-all assist/source/useSortedAttributes: <explanation> */
"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import type { Advocate } from "./types";
import { Card } from "@/components/ui/card";
import AdvocateCard from "@/components/advocate-card";
import { NoDataPlaceholder } from "@/components/no-results";
import { Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("asc");
  const [sortField, setSortField] = useState<string>("lastName");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advocateCards = useMemo(
    () =>
      filteredAdvocates.map((advocate) => (
        <AdvocateCard advocate={advocate} key={advocate.id} />
      )),
    [filteredAdvocates]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const DEBOUNCE_DELAY = 300;
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      fetch(`/api/advocates?search=${encodeURIComponent(trimmed)}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          setFilteredAdvocates(jsonResponse.data);
        });
    }, DEBOUNCE_DELAY);
  };

  const handleSelectChange = (val: string) => {
    setSort(val);
  };

  useEffect(() => {
    // Send to backend
  }, [sort, sortField, filteredAdvocates]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Banner */}
      <section className="w-full bg-gradient-to-br from-brand-500 to-brand-700">
        <div className="flex flex-col items-center gap-4 px-6 py-12 text-white">
          <div className="flex gap-2">
            <Sun className="h-12 w-12 text-brand-accent" />
            <h1 className="font-lora text-5xl">Solace Advocates</h1>
          </div>
          <p className="text-lg opacity-90">
            Find the right health advocate for your needs
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-8">
        {/* Search Panel */}
        <Card className="w-full px-6 py-8">
          <div>
            <p className="font-extrabold text-slate-700 text-sm tracking-wide">
              SEARCH BY SPECIALTY
            </p>
            <div className="mt-3">
              <input
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none ring-brand-accent ring-offset-0 transition focus:border-brand-accent focus:ring-2"
                onChange={onChange}
                placeholder="e.g., Bipolar, LGBTQ, Trauma & PTSD..."
                type="text"
                value={searchTerm}
              />
            </div>
          </div>
          <div className="py-2 flex gap-2">
            <Select
              onValueChange={handleSelectChange}
              value={sortField}
              defaultValue="lastName"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="firstName">First Name</SelectItem>
                <SelectItem value="lastName">Last Name</SelectItem>
                <SelectItem value="city">City</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={handleSelectChange} value={sort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {filteredAdvocates.length === 0 ? (
          <NoDataPlaceholder
            subtitle={
              searchTerm
                ? "Try searching for a different specialty or check your spelling"
                : undefined
            }
            title={searchTerm ? "No advocates found" : undefined}
          />
        ) : (
          <div className="w-full space-y-4">{advocateCards}</div>
        )}
      </section>
    </main>
  );
}
