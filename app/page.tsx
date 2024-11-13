import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createTranslation } from '../i18n/server';

export default async function Home() {
  const {t} = await createTranslation('common');
  return (
    <>
      <TypographyH2>Welcome to the T4SG starter project!</TypographyH2>
      <TypographyP>
        This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Feel free to add
        your own components!
      </TypographyP>
      <TypographyP>
        This page is an unprotected route accessible to anyone who visits the website. Log in to view authenticated
        routes!
      </TypographyP>
      <div>{t('greeting')}</div>
    </>
  );
}
