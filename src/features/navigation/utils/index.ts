import { User } from "@/db/schema";
import { HomeIcon, type LucideIcon } from "lucide-react";

export type NavEntry = {
  label: string;
  url: string;
  icon: LucideIcon;
  items?: Omit<NavEntry, "items">[];
};

export const NAV_BY_ROLE: Record<User["role"], NavEntry[]> = {
  user: [
    {
      label: "Dashboard",
      url: "/guarded/dashboard/user",
      icon: HomeIcon,
    },
  ],
  manager: [
    {
      label: "Dashboard",
      url: "/guarded/dashboard/manager",
      icon: HomeIcon,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      url: "/guarded/dashboard/admin",
      icon: HomeIcon,
    },
  ],
};
