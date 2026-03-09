import { NextResponse } from "next/server"
import { catalogProducts } from "@/lib/product-catalog"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

function buildKnowledgeBase(locale: "fr" | "en") {
  const header =
    locale === "fr"
      ? "Catalogue YORI (mis a jour automatiquement depuis le code):"
      : "YORI catalog (auto-updated from code):"

  const products = catalogProducts
    .map((product) => {
      const subtitle = product.subtitle[locale]
      const description = product.description[locale]
      return `- ${product.name} | categorie: ${product.category} | prix: ${product.price.toFixed(
        2
      )} EUR | ${subtitle} | ${description}`
    })
    .join("\n")

  const businessRules =
    locale === "fr"
      ? [
          "Regles de support client:",
          "- Ne jamais inventer un prix, une offre ou une disponibilite.",
          "- Si une info manque, dire clairement que tu n'as pas l'information et proposer de contacter le support.",
          "- Recommander des produits en fonction du besoin (ceremonial, grand cru, latte, accessoires).",
          "- Toujours repondre en francais.",
        ].join("\n")
      : [
          "Support rules:",
          "- Never invent price, offer or stock information.",
          "- If information is missing, say so clearly and suggest contacting support.",
          "- Recommend products based on intent (ceremonial, grand cru, latte, accessories).",
          "- Always answer in English.",
        ].join("\n")

  return [header, products, businessRules].join("\n\n")
}

function localFallbackReply(question: string, locale: "fr" | "en") {
  const q = question.toLowerCase()
  const isFrench = locale === "fr"

  const matched = catalogProducts.filter((product) => {
    const text = `${product.name} ${product.subtitle.fr} ${product.subtitle.en} ${product.description.fr} ${product.description.en}`.toLowerCase()
    return q.split(/\s+/).some((token) => token.length > 2 && text.includes(token))
  })

  const picks = matched.length > 0 ? matched.slice(0, 3) : catalogProducts.slice(0, 3)
  const productLines = picks
    .map((product) => `- ${product.name}: ${product.price.toFixed(2)} EUR`)
    .join("\n")

  if (isFrench) {
    return [
      "Je peux deja vous orienter avec notre catalogue actuel.",
      "Suggestions: ",
      productLines,
      "\nPour activer les reponses IA avancees, ajoutez OPENAI_API_KEY dans les variables d'environnement.",
    ].join("\n")
  }

  return [
    "I can already guide you using the current catalog.",
    "Suggestions:",
    productLines,
    "\nTo enable advanced AI replies, add OPENAI_API_KEY in environment variables.",
  ].join("\n")
}

export async function POST(req: Request) {
  try {
    const { messages, locale } = (await req.json()) as {
      messages?: ChatMessage[]
      locale?: "fr" | "en"
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Le format des messages est invalide." },
        { status: 400 }
      )
    }

    const normalizedLocale: "fr" | "en" = locale === "en" ? "en" : "fr"
    const userMessages = messages.filter((m) => m.role === "user")
    const latestQuestion = userMessages[userMessages.length - 1]?.content ?? ""

    if (!latestQuestion.trim()) {
      return NextResponse.json(
        { error: "La question utilisateur est vide." },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        answer: localFallbackReply(latestQuestion, normalizedLocale),
        source: "fallback",
      })
    }

    const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini"
    const knowledge = buildKnowledgeBase(normalizedLocale)
    const systemPrompt =
      normalizedLocale === "fr"
        ? "Tu es l'assistant client de YORI Matcha. Tu aides les visiteurs a choisir les produits et a comprendre les usages du matcha. Sois clair, utile et concis."
        : "You are YORI Matcha's customer assistant. Help visitors choose products and understand matcha usage. Be clear, helpful and concise."

    const recentMessages = messages.slice(-12).map((message) => ({
      role: message.role,
      content: message.content,
    }))

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `${systemPrompt}\n\n${knowledge}`,
          },
          ...recentMessages,
        ],
      }),
    })

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text()
      return NextResponse.json(
        {
          error:
            normalizedLocale === "fr"
              ? `Erreur API IA: ${errorText}`
              : `AI API error: ${errorText}`,
        },
        { status: 502 }
      )
    }

    const data = (await openAIResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const answer = data.choices?.[0]?.message?.content?.trim()

    if (!answer) {
      return NextResponse.json(
        {
          error:
            normalizedLocale === "fr"
              ? "Reponse IA vide."
              : "AI returned an empty response.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json({ answer, source: "openai" })
  } catch {
    return NextResponse.json(
      {
        error:
          "Erreur interne du chatbot. Verifiez la configuration et reessayez.",
      },
      { status: 500 }
    )
  }
}