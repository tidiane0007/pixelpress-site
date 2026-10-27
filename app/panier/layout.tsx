import type { Metadata } from "next";

// La demande est une vue privée, vidée à chaque envoi : indexée, elle ne produirait
// qu'une page vide dans les résultats de recherche.
export const metadata: Metadata = {
  title: "Ma demande de devis",
  robots: { index: false, follow: false },
};

export default function PanierLayout({ children }: LayoutProps<"/panier">) {
  return children;
}
