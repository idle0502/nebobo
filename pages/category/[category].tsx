import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);

  // cards-카테고리이름.json → 카테고리 추출
  const categories = files
    .filter((file) => file.startsWith('cards-') && file.endsWith('.json'))
    .map((file) => file.replace('cards-', '').replace('.json', ''));

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
};
