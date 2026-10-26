import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FREE_AI_FOUNDATION_CTA,
  FREE_AI_FOUNDATION_PAYMENT_URL,
} from "@/data/free-ai-foundation-course";
import { cn } from "@/lib/utils";

export function PayNowButton({ className }: { className?: string }) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "h-12 rounded-xl bg-brand-accent px-10 text-base font-bold text-white shadow-lg shadow-brand-accent/35 hover:bg-brand-accent/90",
        className
      )}
    >
      <a href={FREE_AI_FOUNDATION_PAYMENT_URL}>
        {FREE_AI_FOUNDATION_CTA}
        <ArrowRight className="size-4" aria-hidden />
      </a>
    </Button>
  );
}
