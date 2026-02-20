import React from "react";

type PackshotImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  flipX?: boolean;
};

export const PACKSHOT_PREMIUM_STYLE: React.CSSProperties = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
  padding: "8%",
};

export const PACKSHOT_DAILY_MATCHA_STYLE: React.CSSProperties = {
  ...PACKSHOT_PREMIUM_STYLE,
};

export function getPackshotStyleByProductId(productId?: string): React.CSSProperties {
  void productId;
  return PACKSHOT_DAILY_MATCHA_STYLE;
}

export default function PackshotImage({ flipX = false, ...props }: PackshotImageProps) {
  const mergedTransform = `${flipX ? "scaleX(-1)" : ""}${props.style?.transform ? ` ${props.style.transform}` : ""}`.trim();

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000000",
      }}
    >
      <img
        {...props}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          transform: mergedTransform || undefined,
          imageRendering: "auto",
          filter: "none",
          ...props.style,
        }}
      />
    </div>
  );
}
