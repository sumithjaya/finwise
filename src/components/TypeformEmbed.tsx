"use client";

import { Widget, PopupButton } from "@typeform/embed-react";

type MixedHidden = Record<string, string | number | boolean>;

function normalizeHidden(hidden?: MixedHidden): Record<string, string> | undefined {
  if (!hidden) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(hidden)) {
    out[k] = typeof v === "string" ? v : String(v);
  }
  return out;
}

export default function TypeformEmbed({
  formId,
  mode = "inline",
  height = 560,
  hidden,
}: {
  formId: string;
  mode?: "inline" | "popup";
  height?: number;
  hidden?: MixedHidden; // you can pass string | number | boolean here
}) {
  const hiddenStrMap = normalizeHidden(hidden);

  if (mode === "popup") {
    return (
      <PopupButton id={formId} hidden={hiddenStrMap} className="btn">
        Open form
      </PopupButton>
    );
  }
 console.log("hiddenStrMap",hiddenStrMap)
  return (
    <div style={{ width: "100%", minHeight: height }}>
      <Widget id={formId} hidden={hiddenStrMap} style={{ width: "100%", height }} />
    </div>
  );
}
