import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import { CardData } from '../types';
import Image from 'next/image';

type Props = {
  category: string;
  cards: CardData[];
};

export default function CategoryPage({ category, cards }: Props) {
  return (
    <div>
      <h1>{category}</h1>
      {cards.map((card, index) => (
        <Image
          key={index}
          src={`/api/card-image?data=${encodeURIComponent(JSON.stringify(card))}`}
          alt={card.alt}
          width={400}
          height={225}
        />
      ))}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'data'));
  const paths = files.map((file) => ({
    params: { category: file.replace('cards-', '').replace('.json', '') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const filePath = path.join(process.cwd(), 'data', `cards-${category}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const cards = JSON.parse(fileContent);

  return {
    props: {
      category,
      cards,
    },
  };
};
