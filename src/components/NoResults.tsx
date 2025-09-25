import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStar } from "lucide-react";

interface NoDataPlaceholderProps {
  title?: string;
  subtitle?: string;
  loading?: boolean;
}

export function NoDataPlaceholder({
  title = "No data to show yet",
  subtitle = "Provide a speciality to search for advocates",
  loading = false,
}: NoDataPlaceholderProps) {
  return (
    <div className="flex flex-col lg:col-span-2 w-full">
      <Card className="h-full py-5">
        <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
          {loading ? (
            <>
              <div className="w-16 h-16 mb-4">
                <Skeleton className="w-16 h-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </>
          ) : (
            <>
              <div className="text-gray-400 mb-2">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <UserStar className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
