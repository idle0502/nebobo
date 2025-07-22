import fs from 'fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cate, id } = req.query;

  if (!cate || !id || typeof cate !== 'string' || typeof id !== 'string') {
    return res.status(400).send('Missing category or id');
  }

  const safeCategory = cate.replace(/[^a-zA-Z0-9]/g, '_');
  const filePath = path.join(process.cwd(), 'data', `cards-${safeCategory}.json`);
  const fileData = await fs.readFile(filePath, 'utf-8');
  const json = JSON.parse(fileData);
  const card = json.find((c: any) => String(c.id) === id);

  if (!card || !card.thumbnail) {
    return res.status(404).send('No thumbnail found');
  }

  const response = await fetch(card.thumbnail);
  const buffer = Buffer.from(await response.arrayBuffer());

  const sharp = (await import('sharp')).default;
  const image = await sharp(buffer).resize(800, 450).jpeg().toBuffer();

  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.status(200).send(image);
}
