export interface ReceiptItem {
  key: string;
  label: string;
  price: number | null;   // null = price is typed in by staff
  fixed: boolean;         // true = price cannot be changed
  settlement?: boolean;   // true = links to a previous unpaid receipt
}

export const RECEIPT_ITEMS: ReceiptItem[] = [
  { key: "membership_beginner", label: "Membership: Beginner", price: 500, fixed: true },
  { key: "membership_conversation", label: "Membership: Conversation", price: 500, fixed: true },
  { key: "membership_advanced", label: "Membership: Advanced", price: 500, fixed: true },
  { key: "private", label: "Private", price: 1500, fixed: false },
  { key: "space", label: "Space", price: null, fixed: false },
  { key: "remaining", label: "Remaining (settle an older receipt)", price: null, fixed: false, settlement: true },
];

export const receiptItem = (key?: string | null) =>
  RECEIPT_ITEMS.find((i) => i.key === key);

export const receiptItemLabel = (key?: string | null, fallback?: string | null) =>
  receiptItem(key)?.label || fallback || "—";
