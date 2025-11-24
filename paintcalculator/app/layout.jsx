import "./globals.css";

export const metadata = {
  title: "Calculateur de Peinture",
  description: "Calculez la quantité de peinture nécessaire pour votre pièce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
