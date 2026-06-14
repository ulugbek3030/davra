import {
  Wifi,
  Snowflake,
  Tv,
  Car,
  Moon,
  Presentation,
  Music,
  BadgeCheck,
  Trees,
  Baby,
  type LucideIcon,
} from "lucide-react";
import type { Amenity } from "@/lib/venues";

export const AMENITY_ICONS: Record<Amenity, LucideIcon> = {
  wifi: Wifi,
  ac: Snowflake,
  tv: Tv,
  parking: Car,
  namozxona: Moon,
  projector: Presentation,
  music: Music,
  halal: BadgeCheck,
  terrace: Trees,
  kids: Baby,
};
