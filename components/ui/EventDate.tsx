"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

function formatEventDate(iso: string): string {
  const d = dayjs(iso);
  const time = d.format("h:mma"); // 9:00am

  if (d.isToday()) return `Today @${time}`;
  if (d.isTomorrow()) return `Tomorrow @${time}`;

  // Within the next 6 days — show weekday name
  const daysUntil = d.startOf("day").diff(dayjs().startOf("day"), "day");
  if (daysUntil > 0 && daysUntil <= 6) {
    return `${d.format("dddd")} @${time}`;
  }

  return `${d.format("ddd, MMM D")} @${time}`;
}

export default function EventDate({ iso }: { iso: string }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(formatEventDate(iso));
  }, [iso]);

  // Render nothing on server to avoid hydration mismatch
  if (!formatted) return null;

  return <span>{formatted}</span>;
}
