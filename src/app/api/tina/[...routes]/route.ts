import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import client from "../../../../../tina/__generated__/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

// Create the backend (Node-style handler)
const backend = TinaNodeBackend({
  databaseClient: client,
  authProvider: LocalBackendAuthProvider(),
});

// Small adapter: turn Fetch Request → Node req/res
async function runBackend(req: NextRequest) {
  return new Promise<Response>((resolve) => {
    const headers: Record<string, string> = {};
    req.headers.forEach((v, k) => (headers[k] = v));

    const body = req.body ? Readable.from(req.body as any) : undefined;

    const resChunks: Uint8Array[] = [];
    const res = {
      write: (chunk: any) =>
        resChunks.push(
          typeof chunk === "string" ? Buffer.from(chunk) : chunk
        ),
      end: (chunk?: any) => {
        if (chunk) {
          resChunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
          );
        }
        const text = Buffer.concat(resChunks).toString("utf-8");
        resolve(
          new NextResponse(text, {
            status: 200,
            headers: { "content-type": "application/json" },
          })
        );
      },
      setHeader: () => {},
      getHeader: () => undefined,
      removeHeader: () => {},
      statusCode: 200,
    } as any;

    const nodeReq = {
      method: req.method,
      url: req.url,
      headers,
      socket: {},
    } as any;

    if (body) (nodeReq as any).body = body;

    backend(nodeReq, res);
  });
}

// Export Next.js handlers
export async function GET(req: NextRequest) {
  return runBackend(req);
}
export async function POST(req: NextRequest) {
  return runBackend(req);
}
export async function PUT(req: NextRequest) {
  return runBackend(req);
}
export async function DELETE(req: NextRequest) {
  return runBackend(req);
}
export async function PATCH(req: NextRequest) {
  return runBackend(req);
}
