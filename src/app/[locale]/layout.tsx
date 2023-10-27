import type { Metadata } from 'next';
import { Rajdhani, Vazirmatn } from 'next/font/google';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import {
  description,
  icons,
  JsonLd,
  keywords,
  ogImage,
  title,
} from '@/components/SEO';
import { Separator } from '@/components/Separator';
import { Socials } from '@/components/Socials';
import { serverConfig } from '@/config/serverConfig';
import { SupabaseProvider } from '@/data-layer/supabase/SupabaseProvider';
import { useDirection } from '@/hooks/useDirection';
import { JotaiProvider } from '@/store/JotaiProvider';
import { cn } from '@/utils/cn';

import { GoogleAnalytics } from './+components/GoogleAnalytics';
import { Header } from './+components/Header';

const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

const vazir = Vazirmatn({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-vazir',
});
export const metadata: Metadata = {
  title,
  description,
  manifest: '/manifest.json',
  metadataBase: new URL('https://fullstacksjs.com'),
  openGraph: {
    title,
    description,
    images: ogImage,
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

type Local = 'en' | 'fa';

interface Props {
  children: React.ReactNode;
  params: { locale: Local };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = useLocale();
  const direction = useDirection();
  const { containerId, trackingId } = serverConfig.analytics;
  const isAnalyticsActive = containerId && trackingId;

  if (params.locale !== locale) notFound();

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${rajdhani.variable} ${vazir.variable}`}
    >
      <head>
        <JsonLd />
        {isAnalyticsActive ? (
          <GoogleAnalytics containerId={containerId} trackingId={trackingId} />
        ) : null}
      </head>
      <body
        className={cn(
          'bg-dark-0 leading-normal text-light-0 transition-colors duration-1000',
          { 'font-fa': locale === 'fa' },
        )}
      >
        <JotaiProvider>
          <SupabaseProvider>
            <div className="container flex w-full flex-col gap-24 py-8 text-base mobile:gap-40 desktop:py-40">
              <Header />
              {children}
              <Separator />
              <Socials />
            </div>
          </SupabaseProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
