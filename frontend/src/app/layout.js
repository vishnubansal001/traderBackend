import "./globals.css";
import LayoutProvider from "./LayoutProvider";

export const metadata = {
  title: "Trading Portal CN_CUIET",
  description: "Created By CN_CUIET",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
