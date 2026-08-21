import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return dayjs(date).format("MMM D, YYYY");
}

export function fromNow(date) {
  return dayjs(date).fromNow();
}

export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}
