import { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('cate');
  const id = searchParams.get('id');

  if (!category || !id) {
    return new Response('Missing category or id', { status: 400 });
  }

  const safeCategory = category.replace(/[^a-zA-Z0-9]/g, '_');
  const filePath = path.join(process.cwd(), 'data', `cards-${safeCategory}.json`);

  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(fileData);

    const card = json.find((c: any) => String(c.id) === id);

    if (!card || !card.thumbnail) {
      return new Response('No thumbnail found', { status: 404 });
    }

    const response = await fetch(card.thumbnail);
    const buffer = Buffer.from(await response.arrayBuffer());

    const resized = await sharp(buffer)
      .resize(300)
      .jpeg()
      .toBuffer();

    return new Response(resized, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error in card-image API:', error);
    return new Response('Not found', { status: 404 });
  }
}
