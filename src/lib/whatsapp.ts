import type { MouseEvent } from "react";

export const WHATSAPP_PHONE = "201554901390";

export function getWhatsAppUrl({
  phone = WHATSAPP_PHONE,
  message = "",
}: {
  phone?: string;
  message?: string;
} = {}) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const textPart = message ? `&text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleanPhone}${textPart}`;
}

function getWhatsAppAppUrl(url: string) {
  const parsedUrl = new URL(url);
  const phone = parsedUrl.pathname.replace(/[^0-9]/g, "");
  const text = parsedUrl.searchParams.get("text");
  return `whatsapp://send?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ""}`;
}

export function openWhatsAppUrl(url: string, event?: MouseEvent<HTMLElement>) {
  event?.preventDefault();

  window.location.href = getWhatsAppAppUrl(url);
  window.setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, 700);
}