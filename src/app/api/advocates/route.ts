import db from "../../../db";
import { advocates } from "../../../db/schema";
import { asc, desc, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const getAdvocates = (rawSearch: string, sortField, sortDirection) => {
  const search = rawSearch.toLowerCase();
  const cacheKey = search ? `advocates-search-${search}` : "advocates-all";

  return unstable_cache(
    async () => {
      console.log("🔥 Hitting the database...");

      const sort =
        sortDirection === "asc"
          ? asc(advocates[sortField])
          : desc(advocates[sortField]);

      let query = db.select().from(advocates).orderBy(sort);

      if (search) {
        const pattern = `%${search}%`;

        query = query.where(sql`
          EXISTS (
            SELECT 1
            FROM jsonb_array_elements_text(
              jsonb_build_array(${advocates.specialties})
            ) AS t(val)
            WHERE t.val ILIKE ${pattern}
          )
        `);
      }

      return await query;
    },
    [cacheKey],
    { revalidate: 60, tags: ["advocates"] }
  )();
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() ?? "";
  const sortField = url.searchParams.get("sortField")?.trim() ?? "firstName";
  const sortDirection = url.searchParams.get("sortDirection")?.trim() ?? "desc";
  const data = await getAdvocates(search, sortField, sortDirection);
  return Response.json({ data });
}
