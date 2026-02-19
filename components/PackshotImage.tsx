import React from "react";
import { motion } from "framer-motion";

type PackshotImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  overlay?: boolean;
  flipX?: boolean;
};

const darkBackdropImages = [
  "/images/yori uji harmony.png",
  "/images/uji single garden.png",
  "/images/yame heritage.png",
];

function usesDarkBackdrop(src?: string) {
  if (!src) return false;
  const normalized = src.toLowerCase();
  return darkBackdropImages.some((image) => normalized.includes(image));
}

export default function PackshotImage({ overlay = true, flipX = false, ...props }: PackshotImageProps) {
  const darkBackdrop = usesDarkBackdrop(typeof props.src === "string" ? props.src : undefined);
  const mergedTransform = `${flipX ? "scaleX(-1)" : ""}${props.style?.transform ? ` ${props.style.transform}` : ""}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: darkBackdrop ? "#050505" : undefined,
      }}
    >
      <img
        {...props}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: darkBackdrop ? "contain" : undefined,
          transform: mergedTransform || undefined,
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
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}
    </motion.div>
  );
}
