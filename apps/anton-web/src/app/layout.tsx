import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header/Header";
import { CommandMenu } from "@/components/CommandMenu/CommandMenu";
import { ConversationPane } from "@/components/ConversationPane/ConversationPane";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const poppins = Poppins({ subsets: ["latin-ext"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "prime.mrck.dev",
  description: "prime.mrck.dev description",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  let isAuth = false;
  const sessionCookie = cookies().get("session");
  if (sessionCookie) {
    try {
      verify(sessionCookie.value, process.env.SESSION_SECRET!);
      isAuth = true;
    } catch {
      isAuth = false;
    }
  }

  return (
      <html lang="en" suppressHydrationWarning>
      <head />
      <body className={poppins.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {isAuth ? (
            <>
              <Header />
              <div className={"pt-16"}>{children}</div>
              <ConversationPane />
              <CommandMenu />
            </>
        ) : (
            <div>{children}</div>
        )}
      </ThemeProvider>
      </body>
      </html>
  );
}
