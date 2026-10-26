"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { SocialIcon } from "./social-icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: <WhatsAppIcon /> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <SocialIcon name="linkedin" /> },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: <SocialIcon name="x" /> },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <SocialIcon name="facebook" /> },
  ];
  const btn =
    "grid size-10 place-items-center rounded-full border border-line text-ink transition hover:border-brand-600 hover:bg-brand-600 hover:text-white";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" aria-label={`Share on ${l.label}`} className={btn}>
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        className={btn}
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
      <span role="status" className="text-sm text-muted">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.24 9.42-9.44 9.42Zm8.03-17.46A11.3 11.3 0 0 0 12.05.7C5.8.7.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.72-1.5a11.3 11.3 0 0 0 5.72 1.46h.01c6.25 0 11.34-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02Z" />
    </svg>
  );
}
