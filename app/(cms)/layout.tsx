import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Hotel Management App",
  description: "Discover the best hotel rooms in the world.",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
