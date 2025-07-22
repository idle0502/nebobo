// 📁 pages/category/[category].tsx

import fs from 'fs/promises';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Card from '@/components/Card';

type Props = {
  category: string;
  cards: any[];
};

export default function CategoryPage({ category, cards }: Props) {
  return (
    <main>
      <h1>{category} 카테고리</h1>
      <div style={{ display: 'grid', gap: 20 }}>
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = path.join(process.cwd(), 'data');
  const files = await fs.readdir(dataDir);

  const paths = files
    .filter(file => file.startsWith('cards-'))
    .map(file => {
      const category = file.replace('cards-', '').replace('.json', '');
      return { params: { category } };
    });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const safeCategory = category.replace(/[^a-zA-Z0-9]/g, '_');
  const filePath = path.join(process.cwd(), 'data', `cards-${safeCategory}.json`);
  const fileData = await fs.readFile(filePath, 'utf-8');
  const cards = JSON.parse(fileData);

  return {
    props: {
      category,
      cards,
    },
  };
};
