// pages/index.tsx
import Link from 'next/link';
import { generateRoutes } from '../../utils/generateRoutes';
import folders from '../../mock/folders';
import { ReactElement } from 'react';
import Layout from '@/components/layout';
import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const dynamicRoutes = generateRoutes(folders as any);

  return (
    <div>
      <ul>
        {dynamicRoutes.map((route, index) => (
          <li key={index}>
           { // @ts-ignore
            <Link href="/[...slug]" as={`/dashboard/content/${route.params.slug.join('/')}`}>
              <div>{route.params.slug.join(' > ')}</div>
            </Link>
            }
            <div>
              {route.data.map((image: any, imageIndex: any) => (
                <img key={imageIndex} src={image} alt={`Image ${imageIndex}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


Page.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          {page}
      </Layout>
  )
}

export default Page;
