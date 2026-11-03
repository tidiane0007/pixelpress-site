import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** Satori ne résout pas les URL relatives : le logo doit arriver en data URI.
    Renvoie null si l'asset n'est pas embarqué, et l'appelant retombe sur le mot-clé texte. */
export function logoDataUrl(): string | null {
  try {
    const file = fileURLToPath(new URL("../public/pixel-press-logo.png", import.meta.url));
    return "data:image/png;base64," + readFileSync(file).toString("base64");
  } catch {
    return null;
  }
}
