import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"

import fs from "fs"
import { Gr4vy, getEmbedToken, withToken } from "@gr4vy/sdk";

const ALLOWED_ORIGINS = process.env.STORE_CORS?.split(",") || [];

type CheckoutBody = {
  amount: number
  currency: string
  buyerExternalIdentifier: string
}

export async function POST(req: MedusaRequest<CheckoutBody>, res: MedusaResponse) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");

  try {
    const { amount, currency, buyerExternalIdentifier } = req.body;

    const privateKey = fs.readFileSync("privateKey.pem", "utf8");

    const gr4vy = new Gr4vy({
      server: "sandbox",
      id: "smarteremr",
      bearerAuth: withToken({ privateKey }),
    });

    const checkoutSession = await gr4vy.checkoutSessions.create();
    const token = await getEmbedToken({
      privateKey,
      checkoutSessionId: checkoutSession.id,
      embedParams: { amount, currency, buyerExternalIdentifier },
    });

    res.json({ token });
  } catch (err: any) {
    console.error("❌ Failed:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
}

export async function OPTIONS(req: MedusaRequest, res: MedusaResponse) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
}
