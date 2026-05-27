import { Mail, User } from "lucide-react";

interface ContactCardProps {
  name: string;
  email: string;
  org?: string;
}

export function ContactCard({ name, email, org }: ContactCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-neutral p-4 transition hover:border-accent/40 hover:bg-white sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm">
        <User className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-primary">{name}</p>
        {org && <p className="truncate text-xs uppercase tracking-kicker text-ink-light">{org}</p>}
        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent-dark"
          >
            <Mail className="h-3.5 w-3.5" />
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
