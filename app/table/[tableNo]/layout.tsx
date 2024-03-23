import Navbar from "../../components/Navbar";
import {CartProvider} from "../../context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    tableNo: string;
  }
}>) {
  return (
    <CartProvider>
        <Navbar tableNo={params.tableNo}/>
        <div>{children}</div>
    </CartProvider>
  );
}