import Link from 'next/link';

type CardProps = {
  card: {
    id: string;
    category: string;
    title: string;
    thumbnail: string;
    alt?: string;
  };
};

export default function Card({ card }: CardProps) {
  return (
    <Link href={`/category/${card.category}`}>
      <div style={{ border: '1px solid #ccc', padding: 10 }}>
        <img
          src={`/api/card-image?cate=${card.category}&id=${card.id}`}
          alt={card.alt || ''}
          style={{ width: '100%', height: 'auto' }}
        />
        <h2>{card.title}</h2>
      </div>
    </Link>
  );
}
