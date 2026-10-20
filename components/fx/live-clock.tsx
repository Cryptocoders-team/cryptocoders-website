"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("es-BO", {
  timeZone: "America/La_Paz",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Hora local de La Paz (UTC−4), como el sello de lote de los afiches. */
export default function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      LPZ UTC−4:00 · {now ?? "--:--:--"}
    </span>
  );
}
