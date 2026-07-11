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
  // Use wa.me instead of whatsapp.com/api.whatsapp.com/web.whatsapp.com because
  // WhatsApp blocks those pages from being embedded inside preview iframes.
  return `https://wa.me/${cleanPhone}${query ? `?${query}` : ""}`;
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

  // Open in a real top-level tab so WhatsApp is not loaded inside Lovable's
  // preview iframe, which triggers ERR_BLOCKED_BY_RESPONSE.
  const openedWindow = window.open("about:blank", "_blank", "noopener,noreferrer");
  if (openedWindow) {
    openedWindow.opener = null;
    openedWindow.location.href = url;
    return;
  }
  // Popup blocked — let the browser handle the universal link at top level.
  window.location.href = url;
}