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
  const params = new URLSearchParams({ phone: cleanPhone });

  if (message) {
    params.set("text", message);
  }

  return `https://web.whatsapp.com/send?${params.toString()}`;
}

export function openWhatsAppUrl(url: string, event?: MouseEvent<HTMLElement>) {
  event?.preventDefault();

  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");

  if (openedWindow) {
    openedWindow.opener = null;
    return;
  }

  window.location.assign(url);
}