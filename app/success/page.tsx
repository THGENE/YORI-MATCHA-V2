import Link from "next/link"

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-24">
      <div className="mx-auto max-w-2xl text-center border border-border rounded-md bg-card p-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Paiement confirmé ✅</h1>
        <p className="text-muted-foreground mb-8">
          Merci pour votre commande. Votre paiement a bien été enregistré.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  )
}
