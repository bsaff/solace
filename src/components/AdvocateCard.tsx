import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, MapPin, GraduationCap, Calendar } from "lucide-react";
import type { Advocate } from "@/app/types";

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
            <User className="w-8 h-8 text-brand-600" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">
              {advocate.firstName} {advocate.lastName}
            </h3>
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{advocate.city}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">{advocate.degree}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">
              {advocate.yearsOfExperience} years of experience
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {advocate.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">
              {advocate.phoneNumber}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
