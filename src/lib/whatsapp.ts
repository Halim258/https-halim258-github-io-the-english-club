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
  const params = new URLSearchParams();

  if (message) {
    params.set("text", message);
  }

  const query = params.toString();
  return `https://wa.me/${cleanPhone}${query ? `?${query}` : ""}`;
}

export function openWhatsAppUrl(url: string, event?: MouseEvent<HTMLElement>) {
  event?.preventDefault();

  const openedWindow = window.open("about:blank", "_blank", "noopener,noreferrer");

  if (openedWindow) {
    openedWindow.opener = null;
    openedWindow.location.href = url;
    return;
  }
}