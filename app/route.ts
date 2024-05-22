import { permanentRedirect } from "next/navigation";

export async function GET(request: Request) {
  permanentRedirect("/products");
}
