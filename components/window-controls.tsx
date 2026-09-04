"use client"

import { cn } from "@/lib/utils"

type Props = {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  /** Labels surface as tooltips and to screen readers. */
  labels?: { close?: string; minimize?: string; maximize?: string }
  size?: "sm" | "md"
  className?: string
}

/**
 * macOS-style traffic lights that actually work. Glyphs appear on hover of the
 * cluster, and each dot carries an invisible expanded hit area so the 10px
 * targets stay tappable on touch screens.
 */
export function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  labels,
  size = "sm",
  className,
}: Props) {
  const dot = size === "md" ? "h-3 w-3" : "h-2.5 w-2.5"
  const glyph = size === "md" ? "text-[9px]" : "text-[8px]"

  const items = [
    { key: "close", color: "bg-red-400", mark: "×", label: labels?.close ?? "Close", action: onClose },
    { key: "minimize", color: "bg-yellow-400", mark: "−", label: labels?.minimize ?? "Minimize", action: onMinimize },
    { key: "maximize", color: "bg-green-400", mark: "+", label: labels?.maximize ?? "Maximize", action: onMaximize },
  ]

  return (
    <div className={cn("group/wc flex items-center gap-1.5", className)}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-label={item.label}
          title={item.label}
          onClick={item.action}
          className={cn(
            dot,
            item.color,
            "relative flex items-center justify-center rounded-full font-bold leading-none text-black/70",
            "transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-1",
            "before:absolute before:-inset-2 before:content-['']",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(glyph, "opacity-0 transition-opacity group-hover/wc:opacity-100")}
          >
            {item.mark}
          </span>
        </button>
      ))}
    </div>
  )
}
