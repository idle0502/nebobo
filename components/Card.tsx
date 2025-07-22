import Link from 'next/link';

type Props = {
  card: {
    id: string;
    category: string;
    title: string;
    thumbnail: string;
    alt: string;
  };
};

export default function Card({ card }: Props) {
  return (
    <Link href={`/category/${card.category}`}>
      <div>
        <img
          src={`/api/card-image?cate=${card.category}&id=${card.id}`}
          alt={card.alt}
          width={400}
          height={225}
        />
        <h3>{card.title}</h3>
      </div>
    </Link>
  );
}
