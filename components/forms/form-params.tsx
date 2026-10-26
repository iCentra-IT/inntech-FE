"use client";

import { useSearchParams } from "next/navigation";
import { PartnershipForm, RegistrationForm, type EditionOption } from "./forms";

/** Pre-selects the pass chosen on a ticket card (/register?ticket=vip). */
export function RegistrationWithParams(props: { editions: EditionOption[]; defaultEdition: string; tickets: EditionOption[] }) {
  const ticket = useSearchParams().get("ticket");
  const known = props.tickets.some((t) => t.value === ticket);
  return <RegistrationForm {...props} defaultTicket={known ? ticket! : undefined} />;
}

/** Pre-selects the package chosen on a package card (/partners?package=gold#partreg). */
export function PartnershipWithParams(props: { editions: EditionOption[]; defaultEdition: string }) {
  const pkg = useSearchParams().get("package") ?? undefined;
  return <PartnershipForm key={pkg} {...props} defaultPackage={pkg} />;
}
