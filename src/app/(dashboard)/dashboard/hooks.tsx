"use client";

import { Users, Building2, User } from "lucide-react";
import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export function useGreeting() {
  const { t } = useI18n();
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  }, [t]);
}

export function useWelcomeMessage(currentSpace: string | undefined, orgName?: string | null) {
  const { t } = useI18n();
  return useMemo(() => {
    switch (currentSpace) {
      case "personal":
        return t("dashboard.welcome.personal");
      case "company":
        return t("dashboard.welcome.company");
      case "organization":
        return t("dashboard.welcome.organization", { name: orgName || t("dashboard.welcome.back") });
      default:
        return t("dashboard.welcome.back");
    }
  }, [currentSpace, orgName, t]);
}

export function spaceIcon(space: string | undefined) {
  switch (space) {
    case "personal":
      return <User className="h-5 w-5" />;
    case "company":
      return <Building2 className="h-5 w-5" />;
    case "organization":
      return <Users className="h-5 w-5" />;
    default:
      return null;
  }
}

