import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import styles from '../styles/home.module.css';
import { CardData } from '../types';

export async function getStaticProps() {
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);
  let cards: CardData[] = [];

  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cards = cards.concat(fileData);
  });

  return {
    props: {
      cards,
    },
  };
}

export default function Home({ cards }: { cards: CardData[] }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>카테고리별 영상</h1>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <a key={index} href={`/category/${card.category}`} className={styles.card}>
            <Image
              src={`/api/card-image?title=${encodeURIComponent(card.title)}&member=${encodeURIComponent(card.member)}&date=${card.date}&thumbnail=${encodeURIComponent(card.thumbnail)}`}
              alt={card.alt}
              width={320}
              height={180}
              className={styles.thumbnail}
            />
            <div className={styles.meta}>
              <p className={styles.titleText}>{card.title}</p>
              <p className={styles.subText}>{card.member} ・ {card.date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}