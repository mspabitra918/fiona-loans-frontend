import ThankYouContent from "@/components/forms/steps/ThankYouContent";
import { Suspense } from "react";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
