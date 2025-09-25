import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  MedalIcon,
} from "lucide-react";
import type { Advocate } from "@/app/types";

interface AdvocateCardProps {
  advocate: Advocate;
}

// Generate a random number of patients helped between 1 and 1000
const generatePatientsHelped = (): number => {
  return Math.floor(Math.random() * 1000) + 1;
};

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  const patientsHelped = generatePatientsHelped();

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-brand-100/70 flex items-center justify-center">
            <User className="w-8 h-8 text-brand-600" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">
              {advocate.firstName} {advocate.lastName}
            </h3>
            <div className="flex items-center gap-1 text-slate-500">
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">{advocate.degree}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600">
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">{advocate.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">
                {advocate.phoneNumber}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MedalIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">
                {patientsHelped}+ patients helped
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
