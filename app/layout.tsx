import { Fasthand, Google_Sans } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  verification: {
    google: 'HmJWkzB2kXCpmliwbU2X32Q9l3u7Xv98IBo4bPc-Kjc',
  },
  metadataBase: new URL('https://troeunratana.vercel.app/'),
  title: {
    default: 'Troeun Ratana - Full Stack Developer',
    template: '%s | Troeun Ratana - Full Stack Developer',
  },
  description:
    'Portfolio of Troeun Ratana. Full Stack Developer specializing in Next.js, React, TypeScript, Node.js and modern web applications.',
  keywords: [
    'Troeun Ratana',
    'Full Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Web Development',
    'Portfolio',
    'Cambodia',
  ],
  authors: [
    {
      name: 'Troeun Ratana',
    },
  ],
  openGraph: {
    title: 'Troeun Ratana - Full Stack Developer',
    description:
      'Portfolio of Troeun Ratana. Full Stack Developer specializing in Next.js, React, TypeScript, Node.js and modern web applications.',
    url: 'https://troeunratana.vercel.app/',
    siteName: 'Troeun Ratana Portfolio',
    images: [
      {
        url: 'https://res.cloudinary.com/dhuzoeca4/image/upload/v1773293139/TT-NA/eomiaans4cwukfqgvgvo.jpg',
        width: 1200,
        height: 630,
        alt: 'Troeun Ratana Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
