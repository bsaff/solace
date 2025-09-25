"use client";

import { useEffect, useState } from "react";
import type { Advocate } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

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

      <section className="flex flex-col gap-4 items-start py-8">
        {/* Search Panel */}
        <Card className="mx-auto max-w-5xl px-6 py-8 w-full">
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

        <Card className="mx-auto max-w-5xl pb-12">
          <table className="w-full table-auto text-left rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-100 text-slate-700 ">
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Degree</th>
                <th className="px-4 py-3">Specialties</th>
                <th className="px-4 py-3">Years of Experience</th>
                <th className="px-4 py-3">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate) => {
                return (
                  <tr key={advocate.id} className="border-t border-slate-200">
                    <td className="px-4 py-3">{advocate.firstName}</td>
                    <td className="px-4 py-3">{advocate.lastName}</td>
                    <td className="px-4 py-3">{advocate.city}</td>
                    <td className="px-4 py-3">{advocate.degree}</td>
                    <td className="px-4 py-3">
                      {advocate.specialties.map((s, idx) => (
                        <div key={idx}>{s}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3">{advocate.yearsOfExperience}</td>
                    <td className="px-4 py-3">{advocate.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </section>
    </main>
  );
}
