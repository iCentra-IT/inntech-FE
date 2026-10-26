import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function EmptyState({ icon, title, body, action, className }: { icon: React.ReactNode; title: string; body: string; action?: React.ReactNode; className?: string }) {
  return (
    <Reveal className={cn("flex flex-col items-start gap-5 rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-8 sm:p-12", className)}>
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-white">{icon}</span>
      <div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 max-w-xl leading-relaxed">{body}</p>
      </div>
      {action}
    </Reveal>
  );
}
