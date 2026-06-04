import "@xyflow/react/dist/style.css";
import type { Metadata } from "next";
import { Manrope, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { TopNav } from "@/components/top-nav";
import { getCurrentViewer, isDemoMode } from "@/lib/data";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const displayFont = Noto_Serif_KR({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "사유의 연못",
    template: "%s | 사유의 연못",
  },
  description: "질문에서 사유가 퍼져 나가는 조용한 기록장",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [viewer, demoMode] = await Promise.all([getCurrentViewer(), isDemoMode()]);

  return (
    <html
      lang="ko"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteShell>
          <TopNav viewer={viewer} demoMode={demoMode} />
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
