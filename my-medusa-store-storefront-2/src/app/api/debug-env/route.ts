export async function GET() {
  return Response.json({
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
    MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL,
    NODE_ENV: process.env.NODE_ENV
  })
}
