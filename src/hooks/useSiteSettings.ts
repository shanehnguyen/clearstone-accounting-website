import { useSanityQuery } from "@/hooks/useSanityQuery";
import type { SiteSettingsData } from "@/types/sanity";

export function useSiteSettings() {
  return useSanityQuery<SiteSettingsData>(
    ["siteSettings"],
    '*[_type == "siteSettings"][0]',
    undefined,
    { staleTime: Infinity },
  );
}
