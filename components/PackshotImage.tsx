import React from "react";

type PackshotImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  overlay?: boolean;
  flipX?: boolean;
};

export const PACKSHOT_PREMIUM_STYLE: React.CSSProperties = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
  padding: "8%",
};

export default function PackshotImage({ overlay = true, flipX = false, ...props }: PackshotImageProps) {
  const mergedTransform = `${flipX ? "scaleX(-1)" : ""}${props.style?.transform ? ` ${props.style.transform}` : ""}`.trim();

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#050505",
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
      {overlay && (
        <img
          src="/images/matcha-overlay.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "58%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
            objectFit: "cover",
            opacity: 1,
          }}
        />
      )}
    </div>
  );
}
