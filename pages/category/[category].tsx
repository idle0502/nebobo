'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Card {
  id: number;
  title: string;
  date: string;
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (!category) return;

    fetch(`/api/card-list?category=${category}`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, [category]);

  if (!category) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{category} 페이지</h1>
      {cards.length === 0 ? (
        <p className="text-gray-500">등록된 카드가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {cards.map((card) => (
            <div key={card.id} className="w-[300px]">
              <Image
                src={`/api/card-image?cate=${category}&id=${card.id}`}
                alt={card.title}
                width={300}
                height={200}
                onError={(e) => {
                  e.currentTarget.src = '/thumbs/fallback.jpg';
                }}
              />
              <div className="mt-2">
                <p className="font-semibold">{card.title}</p>
                <p className="text-sm text-gray-600">{card.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
