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
  // Use the click-to-chat short link served from whatsapp.com — avoids
  // api.whatsapp.com / web.whatsapp.com which are blocked in some iframes.
  return `https://whatsapp.com/send/?phone=${cleanPhone}${query ? `&${query}` : ""}`;
}

export function getWhatsAppAppUrl({
  phone = WHATSAPP_PHONE,
  message = "",
}: {
  phone?: string;
  message?: string;
} = {}) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const params = new URLSearchParams({ phone: cleanPhone });
  if (message) params.set("text", message);
  return `whatsapp://send?${params.toString()}`;
}

export function openWhatsAppUrl(url: string, event?: MouseEvent<HTMLElement>) {
  event?.preventDefault();

  // Try the native app scheme first (works on mobile with WhatsApp installed),
  // then open the web click-to-chat link in a new tab as a reliable fallback.
  const appUrl = getWhatsAppAppUrl();
  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (openedWindow) {
    openedWindow.opener = null;
    return;
  }
  // Popup blocked — try the app scheme via top-level navigation.
  window.location.href = appUrl;
}