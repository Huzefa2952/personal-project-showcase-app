import { useState } from "react";
import "./AIAssistant.css";

/**
 * A simple local AI-style assistant that answers product questions
 * using the current catalog data.
 */
export function AIAssistant({ products = [] }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(
    "Ask me about the best coffee, pricing, or origins."
  );
  const [isLoading, setIsLoading] = useState(false);

  const getAssistantReply = (question) => {
    const normalizedQuestion = question.toLowerCase();

    if (normalizedQuestion.includes("best") || normalizedQuestion.includes("recommend")) {
      const bestMatch = [...products].sort((a, b) => b.price - a.price)[0];
      return bestMatch
        ? `I recommend ${bestMatch.name} (${bestMatch.origin}) because it offers a rich flavor profile at $${bestMatch.price.toFixed(2)}.`
        : "There are no products available right now.";
    }

    if (normalizedQuestion.includes("cheap") || normalizedQuestion.includes("budget") || normalizedQuestion.includes("low price")) {
      const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
      return cheapest
        ? `The most affordable option is ${cheapest.name} at $${cheapest.price.toFixed(2)}.`
        : "There are no products available right now.";
    }

    if (normalizedQuestion.includes("origin") || normalizedQuestion.includes("where")) {
      const details = products
        .map((product) => `${product.name} comes from ${product.origin}`)
        .join("; ");
      return details || "I don't have origin details yet.";
    }

    if (normalizedQuestion.includes("price") || normalizedQuestion.includes("cost")) {
      const priceList = products
        .map((product) => `${product.name}: $${product.price.toFixed(2)}`)
        .join(", ");
      return priceList || "No prices are available right now.";
    }

    return `Here are the current options: ${products
      .map((product) => product.name)
      .join(", ") || "no products"}.`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setResponse("Thinking...");

    window.setTimeout(() => {
      setResponse(getAssistantReply(query));
      setIsLoading(false);
    }, 400);
  };

  return (
    <section className="ai-assistant">
      <h3>Assistant</h3>
      <p className="ai-helper-text">Ask about products, prices, or recommendations.</p>
      <form onSubmit={handleSubmit} className="ai-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. What is the best coffee?"
          aria-label="Ask the assistant"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Ask"}
        </button>
      </form>
      <div className="ai-response">{response}</div>
    </section>
  );
}
