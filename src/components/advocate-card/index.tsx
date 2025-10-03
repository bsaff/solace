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
import { formatPhoneNumber, generatePatientsHelped } from "./utils";

type AdvocateCardProps = {
  advocate: Advocate;
};

function AdvocateCard({ advocate }: AdvocateCardProps) {
  const patientsHelped = generatePatientsHelped();

  return (
    <Card className="p-6 transition-shadow duration-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100/70">
            <User className="h-8 w-8 text-brand-600" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="font-semibold text-lg text-slate-900">
              {advocate.firstName} {advocate.lastName}
            </h3>
            <div className="flex items-center gap-1 text-slate-500">
              <GraduationCap className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 text-sm">{advocate.degree}</span>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-500" />
            <span className="font-medium text-brand-600 text-sm">
              {advocate.yearsOfExperience} years of experience
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {advocate.specialties.map((specialty) => (
              <Badge className="text-xs" key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 text-sm">{advocate.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 text-sm">
                {formatPhoneNumber(advocate.phoneNumber)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MedalIcon className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-600 text-sm">
                {patientsHelped}+ patients helped
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AdvocateCard;
