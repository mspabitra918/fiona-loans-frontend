import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/apply", changeFrequency: "weekly", priority: 0.9 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/rates-and-fees", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/loan-status", changeFrequency: "monthly", priority: 0.5 },
  { path: "/site-map", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  { path: "/fair-lending", changeFrequency: "yearly", priority: 0.3 },
  {
    path: "/direct-lender-disclosure",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  { path: "/state-licenses", changeFrequency: "yearly", priority: 0.3 },
  { path: "/e-sign-consent", changeFrequency: "yearly", priority: 0.3 },
  { path: "/glba-privacy-notice", changeFrequency: "yearly", priority: 0.3 },
  { path: "/patriot-act-notice", changeFrequency: "yearly", priority: 0.3 },
  { path: "/sms-terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
