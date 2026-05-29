"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileInputProps {
  id: string;
  label: string;
  required?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  hint?: string;
  accept?: string;
  maxSizeMB?: number;
}

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function FileInput({
  id,
  label,
  required,
  value,
  onChange,
  error,
  hint,
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 10,
}: FileInputProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function validate(file: File): string | null {
    if (!ALLOWED_MIME.includes(file.type) && !ALLOWED_EXT.test(file.name)) {
      return "Format invalide. PDF, DOC ou DOCX uniquement.";
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `Le fichier est trop volumineux (max ${maxSizeMB} Mo).`;
    }
    return null;
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const err = validate(file);
    if (!err) onChange(file);
    // Validation errors bubble up through the parent's FormErrors
    // (the parent re-validates on submit; inline feedback comes via the error prop)
    else onChange(null); // reset if invalid
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }
  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        )}
      </label>

      {hint && <p className="text-xs text-ink-light">{hint}</p>}

      {value ? (
        /* ── Selected file display ────────────────────────────────── */
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <FileText className="h-5 w-5 shrink-0 text-primary" />
          <span className="flex-1 truncate text-sm font-medium text-ink">
            {value.name}
          </span>
          <span className="shrink-0 text-xs text-ink-light">
            {formatBytes(value.size)}
          </span>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="shrink-0 rounded-full p-1 text-ink-light transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Supprimer le fichier"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* ── Drop zone ────────────────────────────────────────────── */
        <div
          role="button"
          tabIndex={0}
          aria-label={`Déposer ou sélectionner ${label}`}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200",
            dragging
              ? "border-accent bg-accent/5"
              : error
              ? "border-red-400 bg-red-50"
              : "border-primary/15 bg-white hover:border-primary/40 hover:bg-neutral"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <Upload
            className={cn(
              "h-8 w-8 transition-colors",
              dragging ? "text-accent" : "text-primary/40"
            )}
          />
          <div>
            <p className="text-sm font-semibold text-primary">
              Déposez le fichier ici ou{" "}
              <span className="text-accent underline underline-offset-2">
                parcourez
              </span>
            </p>
            <p className="mt-1 text-xs text-ink-light">
              PDF, DOC, DOCX — max {maxSizeMB} Mo
            </p>
          </div>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
