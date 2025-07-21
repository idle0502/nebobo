import { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  if (!category) {
    return new Response('Missing category', { status: 400 });
  }

  const safeCategory = category.replace(/[^a-zA-Z0-9]/g, '_');
  const filePath = path.join(process.cwd(), 'data', `cards-${safeCategory}.json`);

  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(fileData);

    // 필요한 정보만 추출
    const safeData = json.map((card: any) => ({
      id: card.id,
      title: card.title,
      date: card.date,
    }));

    return new Response(JSON.stringify(safeData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response('Error loading data', { status: 500 });
  }
}
