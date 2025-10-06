import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStar } from "lucide-react";

type NoDataPlaceholderProps = {
  title?: string;
  subtitle?: string;
  loading?: boolean;
};

export function NoDataPlaceholder({
  title = "No data to show yet",
  subtitle = "Provide a speciality to search for advocates",
  loading = false,
}: NoDataPlaceholderProps) {
  return (
    <div className="flex w-full flex-col lg:col-span-2">
      <Card className="h-full py-5">
        <CardContent className="flex flex-1 flex-col items-center justify-center text-center">
          {loading ? (
            <>
              <div className="mb-4 h-16 w-16">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
              <Skeleton className="mb-2 h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </>
          ) : (
            <>
              <div className="text-gray-400">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <UserStar className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="mb-2 font-medium text-gray-600 text-lg">
                {title}
              </h3>
              <p className="text-gray-500 text-sm">{subtitle}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
