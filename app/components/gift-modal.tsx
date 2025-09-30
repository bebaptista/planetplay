"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./modal";

export default function GiftModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: {
    senderName: string;
    recipientName: string;
    recipientEmail: string;
    message?: string;
  }) => Promise<void> | void;
}) {
  const firstRef = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState({
    senderName: "Paul",
    recipientName: "John",
    recipientEmail: "john@yoko.com",
    confirmEmail: "john@yokoono.com",
    message:
      "And when the brokenhearted people, Living in the world agree, There will be an answer.",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) firstRef.current?.focus();
  }, [open]);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.recipientEmail.trim()),
    [data.recipientEmail]
  );
  const confirmMatches = useMemo(
    () =>
      data.confirmEmail.trim().toLowerCase() ===
      data.recipientEmail.trim().toLowerCase(),
    [data.confirmEmail, data.recipientEmail]
  );
  const ready =
    data.senderName.trim() &&
    data.recipientName.trim() &&
    emailOk &&
    confirmMatches;

  async function submit() {
    if (!ready || busy) return;
    setBusy(true);
    try {
      await onConfirm({
        senderName: data.senderName.trim(),
        recipientName: data.recipientName.trim(),
        recipientEmail: data.recipientEmail.trim(),
        message: data.message.trim(),
      });
      onClose();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="gift-title">

      <div className="px-6 pt-6 pb-2">
        <h2 id="gift-title" className="text-center text-[28px] font-extrabold">
          Gift Details
        </h2>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Sender’s Name*"
            placeholder="Paul"
            value={data.senderName}
            inputRef={firstRef}
            onChange={(v) => setData((d) => ({ ...d, senderName: v }))}
            onBlur={() => setTouched((t) => ({ ...t, senderName: true }))}
          />
          <Field
            label="Recipient’s Name*"
            placeholder="John"
            value={data.recipientName}
            onChange={(v) => setData((d) => ({ ...d, recipientName: v }))}
            onBlur={() => setTouched((t) => ({ ...t, recipientName: true }))}
          />
          <Field
            label="Recipient’s Email*"
            placeholder="john@yoko.com"
            type="email"
            value={data.recipientEmail}
            onChange={(v) => setData((d) => ({ ...d, recipientEmail: v }))}
            onBlur={() =>
              setTouched((t) => ({ ...t, recipientEmail: true }))
            }
            state={
              touched.recipientEmail && !emailOk ? "error-soft" : "default"
            }
            helpText={
              touched.recipientEmail && !emailOk ? "Invalid email" : undefined
            }
          />
          <Field
            label="Confirm Email*"
            placeholder="john@yokoono.com"
            type="email"
            value={data.confirmEmail}
            onChange={(v) => setData((d) => ({ ...d, confirmEmail: v }))}
            onBlur={() => setTouched((t) => ({ ...t, confirmEmail: true }))}
            state={touched.confirmEmail && !confirmMatches ? "error" : "default"}
            helpText={
              touched.confirmEmail && !confirmMatches ? "Invalid email" : undefined
            }
          />
        </div>

        <Field
          className="mt-2"
          label="Message (Optional)"
          textarea
          placeholder="Your message…"
          value={data.message}
          onChange={(v) => setData((d) => ({ ...d, message: v }))}
        />

        <div className="mt-6 grid grid-cols-2 gap-4 md:w-[420px] md:ml-auto">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-md text-base font-medium text-neutral-200 hover:opacity-90"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!ready || busy}
            className="h-11 rounded-md bg-[linear-gradient(90deg,#1fae74_0%,#2e865f_100%)] text-base font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] disabled:opacity-40"
          >
            {busy ? "Confirming…" : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  textarea,
  helpText,
  state = "default",
  className = "",
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: "text" | "email";
  textarea?: boolean;
  helpText?: string;
  state?: "default" | "error" | "error-soft";
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const base =
    "w-full rounded-md bg-transparent text-[15px] text-white placeholder:text-neutral-400 outline-none ring-1 ring-inset px-3 py-2";
  const stateRing =
    state === "error"
      ? "ring-rose-600"
      : state === "error-soft"
      ? "ring-rose-600/60"
      : "ring-neutral-600 focus:ring-primary-500";

  return (
    <div className={className}>
      <label className="mb-1 block text-[13px] text-neutral-300">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${base} ${stateRing} resize-none`}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${base} ${stateRing}`}
        />
      )}
      {helpText && (
        <p className="mt-1 text-[12px] font-medium text-rose-500">{helpText}</p>
      )}
    </div>
  );
}
