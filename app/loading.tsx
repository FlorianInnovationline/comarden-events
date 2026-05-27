export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-neutral">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/15 border-t-primary" />
        <p className="text-sm font-semibold uppercase tracking-kicker text-primary/70">
          Chargement…
        </p>
      </div>
    </div>
  );
}
