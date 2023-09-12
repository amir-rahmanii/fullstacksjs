import { useTranslations } from 'next-intl';

import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Separator } from '@/components/Separator';

import { Banner } from './+components/Banner';
import { JoinButton } from './+components/JoinButton';

export default function Home() {
  const t = useTranslations('main');

  return (
    <>
      <Banner sub={t('vision')} cta={<JoinButton />} title="FullstacksJS" />
      <Separator />
      <Articles>
        <Article title={t('about.title')}>
          <Paragraph>
            {t.rich('about.content', {
              mark: (chunk) => <Highlight>{chunk}</Highlight>,
            })}
          </Paragraph>
        </Article>

        <Article title={t('motivation.title')}>
          <Paragraph>
            {t.rich('motivation.content', {
              b: (chunk) => <b>{chunk}</b>,
            })}
          </Paragraph>
        </Article>

        <Article title={t('values.title')}>
          <Paragraph>{t('values.content')}</Paragraph>
          <Paragraph>
            {t.rich('values.ethics', {
              b: (chunk) => <b>{chunk}</b>,
            })}
          </Paragraph>
          <Paragraph>
            {t.rich('values.validity', {
              b: (chunk) => <b>{chunk}</b>,
            })}
          </Paragraph>
        </Article>
      </Articles>
    </>
  );
}
