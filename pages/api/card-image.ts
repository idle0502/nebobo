export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('cate');
  const id = searchParams.get('id');

  if (!category || !id) {
    return new Response('Missing category or id', { status: 400 });
  }

  const safeCategory = category.replace(/[^a-zA-Z0-9]/g, '_');
  const filePath = path.join(process.cwd(), 'data', `cards-${safeCategory}.json`);
  const fileData = await fs.readFile(filePath, 'utf-8');
  const json = JSON.parse(fileData);
  const card = json.find((c: any) => String(c.id) === id);

  if (!card || !card.thumbnail) {
    return new Response('No thumbnail found', { status: 404 });
  }

  const response = await fetch(card.thumbnail);
  const buffer = Buffer.from(await response.arrayBuffer());

  // ⛔️ 기존 sharp import 제거하고 여기서 동적 import
  const sharp = (await import('sharp')).default;

  const image = await sharp(buffer)
    .resize(800, 450)
    .jpeg()
    .toBuffer();

  return new Response(image, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
