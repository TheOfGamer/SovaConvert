import { Inter } from "next/font/google";
import "./globals.css";
import  {NextUIProvider} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Nav } from "../components/Navbar.js";
import {fontSans} from "@/components/fonts";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ Component, pageProps }) {
  const router = useRouter();
  return (
    <NextUIProvider>
      <title>SovaConvert</title>
      <meta property="og:title" content="SovaConvert" />
      <meta
          name="description"
          content="Конвертер файлов с искуственным интеллектом"
          key="desc"
      />
      <meta
          property="og:description"
          content="Конвертер файлов с искуственным интеллектом"
      />
      <div className="relative flex flex-col h-screen">
    <Nav />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      <Component {...pageProps} router={router} />
        </main>
        </div>
    </NextUIProvider>
  );
}
