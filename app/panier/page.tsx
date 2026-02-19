"use client"

import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { catalogById } from "@/lib/product-catalog"
import { ArrowLeft, ChevronDown, Lock, Trash2, X } from "lucide-react"
import StripeProvider from "@/components/checkout/StripeProvider"
import CheckoutForm from "@/components/checkout/CheckoutForm"
import PackshotImage, { PACKSHOT_PREMIUM_STYLE } from "@/components/PackshotImage"

type Account = {
  title: "M" | "Mme"
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

type CustomerOrder = {
  id: string
  date: string
  total: number
  status: "Payée" | "Expédiée" | "Livrée"
}

type CustomerShipment = {
  id: string
  carrier: string
  eta: string
  status: "En préparation" | "En transit" | "En livraison"
}

type CheckoutStep = "auth" | "payment"
type AuthMode = "login" | "register"

export default function PanierPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  const [modalOpen, setModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("auth")
  const [authError, setAuthError] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [stripeLoading, setStripeLoading] = useState(false)
  const [stripeError, setStripeError] = useState("")
  const [authSuccess, setAuthSuccess] = useState("")
  const [stripeClientSecret, setStripeClientSecret] = useState("")
  const [stripePublishableKey, setStripePublishableKey] = useState("")
  const [sessionEmail, setSessionEmail] = useState("")
  const [sessionName, setSessionName] = useState("")
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([])
  const [customerShipments, setCustomerShipments] = useState<CustomerShipment[]>([])

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [registerTitle, setRegisterTitle] = useState<"M" | "Mme">("M")
  const [registerFirstName, setRegisterFirstName] = useState("")
  const [registerLastName, setRegisterLastName] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const storageUsersKey = "yori-users-v1"
  const storageSessionKey = "yori-session-v1"
  const storageOrdersKey = "yori-orders-v1"
  const storageShipmentsKey = "yori-shipments-v1"
  const demoAccount: Account = {
    title: "M",
    firstName: "Client",
    lastName: "Demo",
    phone: "0612345678",
    email: "demo@yori-matcha.fr",
    password: "DemoYori2026!",
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingThreshold = 45
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal)
  const progress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100))

  const canOpenCheckout = useMemo(() => items.length > 0, [items.length])

  useEffect(() => {
    if (!modalOpen) return
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onEsc)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onEsc)
    }
  }, [modalOpen])

  useEffect(() => {
    if (typeof window === "undefined") return

    const rawUsers = window.localStorage.getItem(storageUsersKey)
    let parsedUsers: Account[] = []

    if (rawUsers) {
      try {
        parsedUsers = JSON.parse(rawUsers) as Account[]
      } catch {
        parsedUsers = []
      }
    }

    const hasDemo = parsedUsers.some(
      (user) => user.email.toLowerCase() === demoAccount.email.toLowerCase()
    )

    if (!hasDemo) {
      window.localStorage.setItem(storageUsersKey, JSON.stringify([...parsedUsers, demoAccount]))
    }

    const rawOrders = window.localStorage.getItem(storageOrdersKey)
    let parsedOrders: Record<string, CustomerOrder[]> = {}
    if (rawOrders) {
      try {
        parsedOrders = JSON.parse(rawOrders) as Record<string, CustomerOrder[]>
      } catch {
        parsedOrders = {}
      }
    }

    if (!parsedOrders[demoAccount.email]) {
      parsedOrders[demoAccount.email] = [
        { id: "CMD-240118", date: "18/01/2026", total: 64.8, status: "Livrée" },
        { id: "CMD-240129", date: "29/01/2026", total: 42.9, status: "Expédiée" },
      ]
      window.localStorage.setItem(storageOrdersKey, JSON.stringify(parsedOrders))
    }

    const rawShipments = window.localStorage.getItem(storageShipmentsKey)
    let parsedShipments: Record<string, CustomerShipment[]> = {}
    if (rawShipments) {
      try {
        parsedShipments = JSON.parse(rawShipments) as Record<string, CustomerShipment[]>
      } catch {
        parsedShipments = {}
      }
    }

    if (!parsedShipments[demoAccount.email]) {
      parsedShipments[demoAccount.email] = [
        { id: "TRK-992114", carrier: "Colissimo", eta: "Livraison estimée: demain", status: "En transit" },
      ]
      window.localStorage.setItem(storageShipmentsKey, JSON.stringify(parsedShipments))
    }

    const rawSession = window.localStorage.getItem(storageSessionKey)
    if (rawSession) {
      try {
        const parsedSession = JSON.parse(rawSession) as { email?: string }
        if (parsedSession.email) {
          setSessionEmail(parsedSession.email)
        }
      } catch {
      }
    }
  }, [])

  const getStoredUsers = (): Account[] => {
    if (typeof window === "undefined") return []
    const raw = window.localStorage.getItem(storageUsersKey)
    if (!raw) return []
    try {
      return JSON.parse(raw) as Account[]
    } catch {
      return []
    }
  }

  const persistUsers = (users: Account[]) => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(storageUsersKey, JSON.stringify(users))
  }

  const loadCustomerSpace = (email: string) => {
    if (typeof window === "undefined") return

    const users = getStoredUsers()
    const account = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    setSessionName(account ? `${account.firstName} ${account.lastName}`.trim() : email)

    const rawOrders = window.localStorage.getItem(storageOrdersKey)
    let parsedOrders: Record<string, CustomerOrder[]> = {}
    if (rawOrders) {
      try {
        parsedOrders = JSON.parse(rawOrders) as Record<string, CustomerOrder[]>
      } catch {
        parsedOrders = {}
      }
    }
    setCustomerOrders(parsedOrders[email] ?? [])

    const rawShipments = window.localStorage.getItem(storageShipmentsKey)
    let parsedShipments: Record<string, CustomerShipment[]> = {}
    if (rawShipments) {
      try {
        parsedShipments = JSON.parse(rawShipments) as Record<string, CustomerShipment[]>
      } catch {
        parsedShipments = {}
      }
    }
    setCustomerShipments(parsedShipments[email] ?? [])
  }

  const startStripeCheckout = async () => {
    setStripeLoading(true)
    setStripeError("")

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingMethod: "standard",
        }),
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        throw new Error(errorPayload?.error ?? "Impossible d'initialiser le paiement.")
      }

      const data = await response.json()
      if (!data?.clientSecret || !data?.publishableKey) {
        throw new Error("Configuration Stripe incomplète.")
      }

      setStripeClientSecret(data.clientSecret)
      setStripePublishableKey(data.publishableKey)
      setCheckoutStep("payment")
    } catch (error) {
      setStripeError(error instanceof Error ? error.message : "Erreur Stripe")
    } finally {
      setStripeLoading(false)
    }
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthLoading(true)
    setAuthError("")
    setAuthSuccess("")

    const users = getStoredUsers()
    const account = users.find(
      (user) => user.email.toLowerCase() === loginEmail.trim().toLowerCase() && user.password === loginPassword
    )

    if (!account) {
      setAuthError("Identifiants invalides. Vérifie ton email/mot de passe.")
      setAuthLoading(false)
      return
    }

    window.localStorage.setItem(storageSessionKey, JSON.stringify({ email: account.email }))
    setSessionEmail(account.email)
    loadCustomerSpace(account.email)
    setAuthSuccess("Connexion réussie. Redirection vers le paiement...")
    await startStripeCheckout()
    setAuthLoading(false)
  }

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthLoading(true)
    setAuthError("")
    setAuthSuccess("")

    if (!registerFirstName || !registerLastName || !registerEmail || !registerPassword) {
      setAuthError("Merci de remplir tous les champs obligatoires.")
      setAuthLoading(false)
      return
    }

    if (registerPassword.length < 8) {
      setAuthError("Le mot de passe doit contenir au minimum 8 caractères.")
      setAuthLoading(false)
      return
    }

    const users = getStoredUsers()
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === registerEmail.trim().toLowerCase()
    )

    if (alreadyExists) {
      setAuthError("Un compte existe déjà avec cet email.")
      setAuthLoading(false)
      return
    }

    const newAccount: Account = {
      title: registerTitle,
      firstName: registerFirstName.trim(),
      lastName: registerLastName.trim(),
      phone: registerPhone.trim(),
      email: registerEmail.trim().toLowerCase(),
      password: registerPassword,
    }

    persistUsers([...users, newAccount])
    window.localStorage.setItem(storageSessionKey, JSON.stringify({ email: newAccount.email }))
    setSessionEmail(newAccount.email)
    loadCustomerSpace(newAccount.email)
    setAuthSuccess("Compte créé avec succès. Redirection vers le paiement...")
    await startStripeCheckout()
    setAuthLoading(false)
  }

  const openCheckoutModal = () => {
    if (!canOpenCheckout) return
    setModalOpen(true)
    setCheckoutStep("auth")
    setStripeError("")
    setAuthError("")
    setAuthSuccess("")
    if (sessionEmail) {
      loadCustomerSpace(sessionEmail)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/15 px-4 py-2 text-base font-semibold hover:bg-primary-foreground/25 transition-colors shadow-sm"
              aria-label="Retour à l'accueil"
            >
              <ArrowLeft className="h-5 w-5" />
              Retour
            </Link>
            <Link href="/" className="text-xl font-semibold tracking-wide">
              YORI MATCHA
            </Link>
          </div>
          <span className="text-sm opacity-90">Panier</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-10">
        <div className="mb-8">
          <p className="text-center text-lg md:text-xl mb-3">
            {remainingForFreeShipping > 0
              ? `Plus que ${remainingForFreeShipping.toFixed(2)}€ pour profiter de la livraison offerte* !`
              : "Livraison offerte débloquée !"}
          </p>
          <div className="h-4 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">Livraison offerte en France métropolitaine</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <section className="space-y-6">
            <div className="grid grid-cols-[1.5fr_0.6fr_0.5fr_0.7fr] text-sm font-medium text-primary border-b border-border pb-3">
              <span>VOS PRODUITS</span>
              <span className="text-right">PRIX</span>
              <span className="text-center">QTÉ</span>
              <span className="text-right">SOUS-TOTAL</span>
            </div>

            {items.length === 0 ? (
              <div className="rounded-md border border-border p-8 text-center text-muted-foreground">
                Votre panier est vide.
              </div>
            ) : (
              items.map((item) => {
                const product = catalogById[item.id]
                const lineTotal = item.price * item.quantity

                return (
                  <article key={item.id} className="grid grid-cols-[1.5fr_0.6fr_0.5fr_0.7fr] gap-4 items-center border-b border-border/70 pb-6">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="product-visual-shell relative h-20 w-20 rounded-sm overflow-hidden shrink-0">
                        <PackshotImage
                          src={product?.image ?? "/images/logo-y.png"}
                          alt={item.name}
                          style={PACKSHOT_PREMIUM_STYLE}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-lg truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{product?.subtitle.fr ?? "Produit YORI"}</p>
                        <p className="text-xs text-muted-foreground mt-1">Ref. {item.id}</p>
                      </div>
                    </div>

                    <p className="text-right text-xl font-medium text-primary">{item.price.toFixed(2)} €</p>

                    <div className="flex items-center justify-center gap-2">
                      <select
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        className="h-10 rounded-sm border border-border bg-background px-3"
                        aria-label={`Quantité pour ${item.name}`}
                      >
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-primary hover:text-primary/70"
                        aria-label={`Supprimer ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-right text-xl font-medium text-primary">{lineTotal.toFixed(2)} €</p>
                  </article>
                )
              })
            )}
          </section>

          <aside className="space-y-4 lg:sticky lg:top-6">
            <div className="border border-border rounded-sm p-5 bg-card">
              <div className="flex justify-between text-xl">
                <span>SOUS-TOTAL</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-2xl font-semibold mt-2">
                <span>TOTAL TTC</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={openCheckoutModal}
                className="btn-client w-full mt-5 bg-primary text-primary-foreground py-3 rounded-sm font-medium uppercase tracking-wide disabled:opacity-50"
              >
                COMMANDER
              </button>
            </div>

            <div className="border border-border rounded-sm p-4 bg-card flex items-center justify-between">
              <span className="font-medium">FRAIS DE LIVRAISON EN FRANCE</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="border border-border rounded-sm p-4 bg-card flex items-center justify-between">
              <span className="font-medium">FRAIS DE LIVRAISON À L'INTERNATIONAL</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            <div className="border border-border rounded-sm p-4 bg-card">
              <p className="flex items-center gap-2 font-semibold text-primary mb-3">
                <Lock className="h-4 w-4" />
                PAIEMENT 100% SÉCURISÉ
              </p>
              <p className="text-sm text-muted-foreground">Visa • Mastercard • Amex • PayPal</p>
            </div>
          </aside>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[130] bg-background/80 backdrop-blur-sm p-3 md:p-6 overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="mx-auto w-full max-w-3xl bg-card border border-border rounded-md shadow-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-xl md:text-2xl font-semibold">
                {checkoutStep === "auth" ? "Connexion / Création de compte" : "Paiement sécurisé"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-border"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {checkoutStep === "auth" ? (
              <div className="p-5 md:p-7">
                {stripeError && (
                  <p className="mb-4 rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                    {stripeError}
                  </p>
                )}
                {stripeLoading && (
                  <div className="mb-4 rounded-sm border border-primary/30 bg-primary/10 px-3 py-2">
                    <p className="text-sm text-primary animate-pulse">
                      Initialisation du paiement sécurisé en cours...
                    </p>
                  </div>
                )}
                {!sessionEmail ? (
                  <>
                    <div className="grid grid-cols-2 mb-6 border border-border rounded-sm overflow-hidden">
                      <button
                        onClick={() => setAuthMode("login")}
                        className={`btn-client btn-client--soft py-3 text-sm md:text-base font-medium ${authMode === "login" ? "bg-secondary" : "bg-background"}`}
                      >
                        ME CONNECTER
                      </button>
                      <button
                        onClick={() => setAuthMode("register")}
                        className={`btn-client btn-client--soft py-3 text-sm md:text-base font-medium ${authMode === "register" ? "bg-secondary" : "bg-background"}`}
                      >
                        CRÉER MON COMPTE
                      </button>
                    </div>

                    {authMode === "login" ? (
                  <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mot de passe</label>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                        className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                      />
                    </div>

                    {authError && <p className="text-sm text-red-500">{authError}</p>}

                    <button
                      type="submit"
                      disabled={authLoading || stripeLoading}
                      className="btn-client w-full bg-primary text-primary-foreground py-3 rounded-sm font-medium disabled:opacity-50"
                    >
                      {authLoading || stripeLoading ? "Chargement..." : "Se connecter et payer"}
                    </button>
                  </form>
                ) : (
                  <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="title"
                          checked={registerTitle === "M"}
                          onChange={() => setRegisterTitle("M")}
                        />
                        M
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="title"
                          checked={registerTitle === "Mme"}
                          onChange={() => setRegisterTitle("Mme")}
                        />
                        Mme
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Prénom *</label>
                        <input
                          required
                          value={registerFirstName}
                          onChange={(event) => setRegisterFirstName(event.target.value)}
                          className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Nom *</label>
                        <input
                          required
                          value={registerLastName}
                          onChange={(event) => setRegisterLastName(event.target.value)}
                          className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Numéro de téléphone</label>
                      <input
                        value={registerPhone}
                        onChange={(event) => setRegisterPhone(event.target.value)}
                        className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Email *</label>
                      <input
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(event) => setRegisterEmail(event.target.value)}
                        className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Mot de passe *</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={registerPassword}
                        onChange={(event) => setRegisterPassword(event.target.value)}
                        className="mt-1 w-full border border-border bg-background rounded-sm px-3 py-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Minimum 8 caractères</p>
                    </div>

                    {authError && <p className="text-sm text-red-500">{authError}</p>}

                    <button
                      type="submit"
                      disabled={authLoading || stripeLoading}
                      className="btn-client w-full bg-primary text-primary-foreground py-3 rounded-sm font-medium disabled:opacity-50"
                    >
                      {authLoading || stripeLoading ? "Chargement..." : "Créer mon compte et payer"}
                    </button>
                  </form>
                )}
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-sm border border-primary/40 bg-primary/10 p-4">
                      <p className="text-sm md:text-base font-medium">
                        Bonjour {sessionName || sessionEmail}, vous êtes connecté.
                      </p>
                      {authSuccess && <p className="text-sm text-muted-foreground mt-1">{authSuccess}</p>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-sm border border-border bg-background p-4">
                        <h3 className="text-lg font-semibold mb-3">Mes commandes passées</h3>
                        {customerOrders.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Aucune commande passée pour le moment.</p>
                        ) : (
                          <ul className="space-y-3">
                            {customerOrders.map((order) => (
                              <li key={order.id} className="border border-border/70 rounded-sm p-3">
                                <p className="text-sm font-medium">{order.id}</p>
                                <p className="text-xs text-muted-foreground">{order.date} • {order.status}</p>
                                <p className="text-sm text-primary mt-1">{order.total.toFixed(2)} €</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="rounded-sm border border-border bg-background p-4">
                        <h3 className="text-lg font-semibold mb-3">Livraisons en cours</h3>
                        {customerShipments.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Aucune livraison en cours.</p>
                        ) : (
                          <ul className="space-y-3">
                            {customerShipments.map((shipment) => (
                              <li key={shipment.id} className="border border-border/70 rounded-sm p-3">
                                <p className="text-sm font-medium">{shipment.id} • {shipment.carrier}</p>
                                <p className="text-xs text-muted-foreground">{shipment.status}</p>
                                <p className="text-sm text-primary mt-1">{shipment.eta}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          window.localStorage.removeItem(storageSessionKey)
                          setSessionEmail("")
                          setSessionName("")
                          setCustomerOrders([])
                          setCustomerShipments([])
                        }}
                        className="btn-client btn-client--brand flex-1 border border-primary text-primary py-3 rounded-sm font-medium"
                      >
                        Changer de compte
                      </button>
                      <button
                        type="button"
                        disabled={stripeLoading}
                        onClick={startStripeCheckout}
                        className="btn-client flex-1 bg-primary text-primary-foreground py-3 rounded-sm font-medium disabled:opacity-50"
                      >
                        {stripeLoading ? "Chargement..." : "Continuer vers le paiement"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 md:p-7 space-y-4">
                {stripeError && <p className="text-sm text-red-500">{stripeError}</p>}
                {stripeClientSecret && stripePublishableKey ? (
                  <StripeProvider publishableKey={stripePublishableKey} clientSecret={stripeClientSecret}>
                    <CheckoutForm />
                  </StripeProvider>
                ) : (
                  <p className="text-sm text-muted-foreground">Initialisation du paiement...</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
