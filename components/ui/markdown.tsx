import { Fragment } from "react";

/** Inline **bold** and [links](url). */
function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]}>{link[1]}</a>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Renders the small markdown subset used by news posts: ## headings,
 * "- " lists, "> " quotes and paragraphs. Swap for the CMS rich-text
 * renderer when content moves to Payload.
 */
export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);
  return (
    <div className="prose-inntech">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
        if (block.startsWith("> ")) return <blockquote key={i}>{inline(block.replace(/^> /gm, ""))}</blockquote>;
        if (block.startsWith("- ")) {
          return (
            <ul key={i}>
              {block.split("\n").map((line, j) => (
                <li key={j}>{inline(line.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}
