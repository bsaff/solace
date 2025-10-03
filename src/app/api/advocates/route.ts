import db from "../../../db";
import { advocates } from "../../../db/schema";
import { desc, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const getAdvocates = (rawSearch: string) => {
  const search = rawSearch.toLowerCase();
  const cacheKey = search ? `advocates-search-${search}` : "advocates-all";

  return unstable_cache(
    async () => {
      console.log("🔥 Hitting the database...");

      let query = db
        .select()
        .from(advocates)
        .orderBy(desc(advocates.yearsOfExperience));

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
  const data = await getAdvocates(search);
  return Response.json({ data });
}
