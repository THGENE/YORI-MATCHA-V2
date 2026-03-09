"use client"

import { FormEvent, useMemo, useState } from "react"
import { Loader2, MessageCircle, Send, X } from "lucide-react"
import { useI18n } from "@/lib/i18n"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export default function GlobalChatWidget() {
  const { locale } = useI18n()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const labels = useMemo(
    () =>
      locale === "fr"
        ? {
            title: "Conseiller YORI",
            subtitle: "Posez vos questions sur le matcha",
            placeholder: "Ex: Quel matcha choisir pour un latte ?",
            send: "Envoyer",
            open: "Ouvrir le chat",
            close: "Fermer le chat",
            loading: "Le conseiller ecrit...",
            error:
              "Je n'ai pas pu repondre pour le moment. Reessayez dans un instant.",
            welcome:
              "Bonjour, je peux vous aider a choisir votre matcha et vos accessoires YORI.",
          }
        : {
            title: "YORI Assistant",
            subtitle: "Ask your matcha questions",
            placeholder: "Ex: Which matcha is best for latte?",
            send: "Send",
            open: "Open chat",
            close: "Close chat",
            loading: "Assistant is typing...",
            error: "I cannot answer right now. Please try again shortly.",
            welcome:
              "Hi, I can help you choose your YORI matcha and accessories.",
          },
    [locale]
  )

  const chatMessages =
    messages.length > 0
      ? messages
      : [{ role: "assistant" as const, content: labels.welcome }]

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }]
    setMessages(nextMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
          locale,
        }),
      })

      const data = (await response.json()) as { answer?: string; error?: string }
      const answer = data.answer?.trim()

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: answer || data.error || labels.error,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: labels.error,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? labels.close : labels.open}
        className="fixed bottom-5 right-4 z-[140] h-12 min-w-12 px-3 rounded-full border border-primary/35 bg-card/95 backdrop-blur-md text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.28)] hover:border-primary/60 transition-colors inline-flex items-center justify-center gap-2"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="text-sm font-semibold hidden sm:inline">Chat</span>
      </button>

      {open && (
        <section className="fixed bottom-20 right-4 z-[140] w-[min(92vw,420px)] h-[min(72vh,560px)] rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col">
          <header className="px-4 py-3 border-b border-border/70 bg-background/35">
            <p className="text-sm font-semibold">{labels.title}</p>
            <p className="text-xs text-muted-foreground">{labels.subtitle}</p>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {chatMessages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl bg-secondary text-secondary-foreground px-3 py-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                {labels.loading}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-border/70 p-3 flex items-center gap-2 bg-background/35">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={labels.placeholder}
              className="flex-1 h-11 rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-11 min-w-11 rounded-xl bg-primary text-primary-foreground px-3 inline-flex items-center justify-center disabled:opacity-50"
              aria-label={labels.send}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}
    </>
  )
}