"use client";
import "./globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

export default function RootLayout({ children }) {

  const sepoliaChain = Sepolia;

  return (
    <html lang="en">
      <body>
        <ThirdwebProvider
          activeChain={sepoliaChain}
          supportedChains={[Sepolia]}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
