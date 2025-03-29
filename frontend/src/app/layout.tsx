import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../app/globals.css"; // Add this line

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
