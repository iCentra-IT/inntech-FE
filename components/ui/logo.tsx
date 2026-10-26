import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  eager = false,
  className,
}: {
  tone?: "light" | "dark";
  eager?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={tone === "light" ? "/images/brand/logo-white.png" : "/images/brand/logo-blue.png"}
      alt="InnTech, Innovation & Technology Summit"
      // Display size (~36px tall); the source file is 1355×359.
      width={170}
      height={45}
      loading={eager ? "eager" : "lazy"}
      className={cn("h-9 w-auto", className)}
    />
  );
}
