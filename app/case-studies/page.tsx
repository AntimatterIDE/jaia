import { redirect } from "next/navigation";

/** Case studies live on `/partners` with partner spotlights. */
export default function CaseStudiesPage() {
  redirect("/partners");
}
