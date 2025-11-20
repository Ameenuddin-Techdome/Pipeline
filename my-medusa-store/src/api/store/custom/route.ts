import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  res.sendStatus(200);
}

interface TransactionBody {
  transactionId: string;
  orderId?: string;
  amount?: number;
  status?: string;
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const body = req.body as TransactionBody;

    const { transactionId, orderId, amount, status } = body;

    // You can save this to a custom table, or update order metadata
    // Example: logging for now
    console.log("Received transaction:", {
      transactionId,
      orderId,
      amount,
      status,
    });

    // TODO: If you have the order ID, you can update order metadata using Medusa services
    // const orderService = req.scope.resolve("orderService");
    // await orderService.update(orderId, { metadata: { transactionId } });

    res.status(200).json({ success: true, transactionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record transaction" });
  }
}
