import Image from "next/image"
import { cn } from "@/lib/utils"

type BrandLogoVariant = "header" | "footer" | "compact"

type BrandLogoProps = {
  variant?: BrandLogoVariant
  className?: string
  imageClassName?: string
}

const variantStyles: Record<BrandLogoVariant, { image: string; title: string; subtitle: string; gap: string }> = {
  header: {
    image: "h-8 w-8 lg:h-9 lg:w-9",
    title: "text-xl lg:text-2xl",
    subtitle: "text-[10px] lg:text-xs",
    gap: "gap-2",
  },
  footer: {
    image: "h-8 w-8",
    title: "text-2xl",
    subtitle: "text-xs",
    gap: "gap-2",
  },
  compact: {
    image: "h-[18px] w-[18px]",
    title: "text-sm",
    subtitle: "text-[10px]",
    gap: "gap-1.5",
  },
}

export default function BrandLogo({ variant = "header", className, imageClassName }: BrandLogoProps) {
  const styles = variantStyles[variant]

  return (
    <div className={cn("inline-flex items-center", styles.gap, className)}>
      <Image
        src="/images/logo-y.png"
        alt="Logo YORI"
        width={72}
        height={72}
        className={cn(
          "rounded-full border border-border/60 bg-card object-contain object-center",
          styles.image,
          imageClassName
        )}
        quality={100}
        unoptimized
        priority={variant === "header"}
      />

      {variant !== "compact" && (
        <>
          <span className={cn("font-serif font-bold tracking-wider text-primary", styles.title)}>YORI</span>
          <span className={cn("tracking-widest text-muted-foreground uppercase", styles.subtitle)}>Matcha</span>
        </>
      )}
    </div>
  )
}
