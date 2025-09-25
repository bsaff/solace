import db from "../../../db";
import { advocates } from "../../../db/schema";
import type { Advocate } from "../../types/index";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() ?? "";

  const data = (await db.select().from(advocates)) as Advocate[];

  if (!search) {
    return Response.json({ data });
  }

  const filtered = data.filter((advocate: Advocate) => {
    return advocate.specialties.some((s) =>
      s.toLowerCase().includes(search.toLowerCase()),
    );
  });

  return Response.json({ data: filtered });
}
