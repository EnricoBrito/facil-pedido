import { UserRole } from "@/contexts/AuthContext";

let webhookBaseUrl = "https://n8n-webhook-facilpedido.local";

export function getWebhookUrl() {
  return webhookBaseUrl;
}

export function setWebhookUrl(url: string) {
  webhookBaseUrl = url;
}

interface WebhookPayload {
  [key: string]: unknown;
}

async function postWebhook(path: string, body: WebhookPayload): Promise<unknown> {
  const url = `${webhookBaseUrl}${path}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Webhook error: ${res.status}`);
    return await res.json();
  } catch {
    // Simulated fallback
    return null;
  }
}

export async function sendChatMessage(
  message: string,
  userType: UserRole | "visitante"
): Promise<string> {
  const result = await postWebhook("/chat", { userType, message });
  if (result && typeof result === "object" && "reply" in (result as Record<string, unknown>)) {
    return (result as { reply: string }).reply;
  }
  return "Obrigado pela sua mensagem! Em breve terei acesso à inteligência artificial para responder de forma personalizada. Por enquanto, posso ajudá-lo a navegar pelo nosso catálogo.";
}

export async function sendPurchaseWebhook(data: {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  userEmail: string;
  paymentMethod: string;
  simulated?: boolean;
}): Promise<boolean> {
  const result = await postWebhook("/simular-compra", data);
  return result !== null;
}

export async function sendSimulatedPurchase(data: {
  productId: string;
  productName: string;
  quantity: number;
  email: string;
}): Promise<boolean> {
  const result = await postWebhook("/simular-compra", {
    ...data,
    simulated: true,
    timestamp: new Date().toISOString(),
  });
  return result !== null;
}
