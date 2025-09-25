import db from "../../../db";
import { advocates } from "../../../db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() ?? "";

  const data = await db
    .select()
    .from(advocates)
    .orderBy(desc(advocates.yearsOfExperience));

  if (!search) {
    return Response.json({ data });
  }

  const filtered = data.filter((advocate) => {
    return (advocate.specialties as string[]).some((s: string) =>
      s.toLowerCase().includes(search.toLowerCase()),
    );
  });

  return Response.json({ data: filtered });
}
