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
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
          sdkOptions={{
            chainId: Sepolia.chainId,
            rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
          }}
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
