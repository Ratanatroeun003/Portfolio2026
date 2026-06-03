import { Fasthand, Google_Sans } from 'next/font/google';
import './globals.css';

export const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const fasthand = Fasthand({
  variable: '--font-fasthand',
  subsets: ['khmer'],
  weight: ['400'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fasthand.variable} ${googleSans.variable} h-full antialiased`}
    >
      <body>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
