import type { Metadata } from "next";

import "../styles/globals.css";
import ThemeRegistry from "@/components/UI/ThemeProvider";
import { DESCRIPTION, TITLE } from "@/constants/page";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
