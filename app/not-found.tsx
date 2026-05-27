import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-primary py-24 text-white">
      <div className="container text-center">
        <p className="kicker">404</p>
        <h1 className="heading-lg mt-4">Cette page s&apos;est envolée.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/80">
          Le contenu que vous cherchez n&apos;existe pas (ou plus). Revenons à l&apos;essentiel.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="secondary" size="lg">
            Retour à l&apos;accueil
          </Button>
          <Link
            href="/#evenements"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-primary"
          >
            Voir les événements
          </Link>
        </div>
      </div>
    </section>
  );
}
