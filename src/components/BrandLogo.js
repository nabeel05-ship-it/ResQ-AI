import React from "react";
import { tokens } from "../theme";

const SIZES = {
  full: {
    xs: { width: "120px", height: "auto" },
    sm: { width: "160px", height: "auto" },
    md: { width: "200px", height: "auto" },
    lg: { width: "240px", height: "auto" },
    xl: { width: "300px", height: "auto" },
  },
  compact: {
    xs: { iconSize: 24, fontSize: "14px", tagSize: "10px" },
    sm: { iconSize: 28, fontSize: "15px", tagSize: "10px" },
    md: { iconSize: 34, fontSize: "16px", tagSize: "11px" },
    lg: { iconSize: 42, fontSize: "18px", tagSize: "12px" },
    xl: { iconSize: 52, fontSize: "22px", tagSize: "13px" },
  },
  icon: {
    xs: { size: 24, radius: "6px" },
    sm: { size: 28, radius: "7px" },
    md: { size: 34, radius: "8px" },
    lg: { size: 42, radius: "10px" },
    xl: { size: 52, radius: "12px" },
  },
};

/**
 * BrandLogo - Unified branding component for ResQ AI
 *
 * @param {('full'|'compact'|'icon')} variant
 *   - 'full': Full branded composition (emblem + wordmark)
 *   - 'compact': Standalone emblem paired with typography lockup (ideal for headers)
 *   - 'icon': Standalone emblem only
 * @param {('xs'|'sm'|'md'|'lg'|'xl'|number)} size
 * @param {('light'|'dark')} theme - Text tone ('light' for dark navy surfaces, 'dark' for white/light surfaces)
 * @param {boolean} showTagline - Displays "Emergency First-Response" subtitle
 * @param {string} alt - Accessible alt text
 * @param {boolean} isDecorative - If true, marks image as decorative (alt="", aria-hidden="true")
 */
export default function BrandLogo({
  variant = "compact",
  size = "md",
  theme = "dark",
  showTagline = false,
  alt = "ResQ AI — Emergency First Response Assistant",
  isDecorative = false,
  className = "",
  style = {},
  onClick,
}) {
  const altText = isDecorative ? "" : alt;
  const isDarkSurface = theme === "light"; // 'light' text on dark surfaces

  // Full Logo Composition
  if (variant === "full") {
    const sizeConfig =
      typeof size === "string" && SIZES.full[size]
        ? SIZES.full[size]
        : typeof size === "number"
        ? { width: `${size}px`, height: "auto" }
        : SIZES.full.md;

    return (
      <div
        className={`resq-brand-full ${className}`}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1,
          ...style,
        }}
        onClick={onClick}
      >
        <img
          src="/assets/resq-ai-logo.png"
          alt={altText}
          aria-hidden={isDecorative}
          style={{
            width: sizeConfig.width,
            height: sizeConfig.height,
            maxWidth: "100%",
            objectFit: "contain",
            display: "block",
            userSelect: "none",
          }}
          loading="eager"
        />
        {showTagline && (
          <span
            style={{
              marginTop: "8px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isDarkSurface ? "#94A3B8" : tokens.color.textMuted,
            }}
          >
            Emergency First-Response
          </span>
        )}
      </div>
    );
  }

  // Standalone Icon
  if (variant === "icon") {
    const iconDim =
      typeof size === "string" && SIZES.icon[size]
        ? SIZES.icon[size].size
        : typeof size === "number"
        ? size
        : 34;

    const iconRadius =
      typeof size === "string" && SIZES.icon[size]
        ? SIZES.icon[size].radius
        : `${Math.round(iconDim * 0.24)}px`;

    return (
      <img
        src="/assets/resq-ai-emblem.png"
        alt={altText}
        aria-hidden={isDecorative}
        className={`resq-brand-icon ${className}`}
        style={{
          width: `${iconDim}px`,
          height: `${iconDim}px`,
          borderRadius: iconRadius,
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
          userSelect: "none",
          ...style,
        }}
        onClick={onClick}
        loading="eager"
      />
    );
  }

  // Compact Lockup (Emblem + Typography) - Default for Navbars
  const compactConfig =
    typeof size === "string" && SIZES.compact[size]
      ? SIZES.compact[size]
      : SIZES.compact.md;

  const iconPixels =
    typeof size === "number" ? size : compactConfig.iconSize;
  const fontPixels =
    typeof size === "number"
      ? `${Math.max(14, Math.round(size * 0.48))}px`
      : compactConfig.fontSize;
  const tagPixels =
    typeof size === "number"
      ? `${Math.max(10, Math.round(size * 0.3))}px`
      : compactConfig.tagSize;

  const textColor = isDarkSurface ? "#FFFFFF" : tokens.color.text;
  const subColor = isDarkSurface ? "#94A3B8" : tokens.color.textSubtle;

  return (
    <div
      className={`resq-brand-compact ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${Math.round(iconPixels * 0.28)}px`,
        textDecoration: "none",
        userSelect: "none",
        ...style,
      }}
      onClick={onClick}
    >
      <img
        src="/assets/resq-ai-emblem.png"
        alt={altText}
        aria-hidden={isDecorative || !altText ? true : undefined}
        style={{
          width: `${iconPixels}px`,
          height: `${iconPixels}px`,
          borderRadius: `${Math.round(iconPixels * 0.24)}px`,
          objectFit: "contain",
          flexShrink: 0,
          display: "block",
        }}
        loading="eager"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          lineHeight: 1.15,
        }}
      >
        <span
          style={{
            fontSize: fontPixels,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: textColor,
            whiteSpace: "nowrap",
          }}
        >
          ResQ AI
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: tagPixels,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: subColor,
              marginTop: "1px",
              whiteSpace: "nowrap",
            }}
          >
            Emergency First-Response
          </span>
        )}
      </div>
    </div>
  );
}
