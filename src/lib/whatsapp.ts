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
  const textPart = message ? `&text=${encodeURIComponent(message)}` : "&text";
  return `https://api.whatsapp.com/send/?phone=${cleanPhone}${textPart}&type=phone_number&app_absent=0`;
}

export function openWhatsAppUrl(url: string, event?: MouseEvent<HTMLElement>) {
  event?.preventDefault();

  const openedWindow = window.open(url, "_blank");
  if (openedWindow) {
    openedWindow.opener = null;
    openedWindow.focus();
    return;
  }

  window.location.assign(url);
}