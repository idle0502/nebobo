// app/page.tsx (또는 pages/index.tsx)
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { key: 'Broadcast_Stage', label: 'Broadcast Stage', thumbnail: '/thumbs/broadcast_stage.jpg' },
  { key: 'Commercials', label: 'Commercials', thumbnail: '/thumbs/commercials.jpg' },
  { key: 'Etc', label: 'Etc', thumbnail: '/thumbs/etc.jpg' },
  { key: 'Festival_Stage', label: 'Festival Stage', thumbnail: '/thumbs/festival_stage.jpg' },
  { key: 'Interviews', label: 'Interviews', thumbnail: '/thumbs/interviews.jpg' },
  { key: 'Live_Streams', label: 'Live Streams', thumbnail: '/thumbs/live_streams.jpg' },
  { key: 'Media_Content', label: 'Media Content', thumbnail: '/thumbs/media_content.jpg' },
  { key: 'Media_Performance', label: 'Media Performance', thumbnail: '/thumbs/media_performance.jpg' },
  { key: 'Official_Channel', label: 'Official Channel', thumbnail: '/thumbs/official_channel.jpg' },
  { key: 'Original_Variety', label: 'Original Variety', thumbnail: '/thumbs/original_variety.jpg' },
  { key: 'Radio_Podcast', label: 'Radio Podcast', thumbnail: '/thumbs/radio_podcast.jpg' },
  { key: 'Recording_Behind', label: 'Recording Behind', thumbnail: '/thumbs/recording_behind.jpg' },
  { key: 'Releases', label: 'Releases', thumbnail: '/thumbs/Releases.jpg' },
  { key: 'Shorts', label: 'Shorts', thumbnail: '/thumbs/shorts.jpg' },
  { key: 'Special_Releases', label: 'Special Releases', thumbnail: '/thumbs/special_releases.jpg' },
];


export default function HomePage() {
  return (
    <main className="flex flex-wrap justify-center gap-6 p-8">
      {categories.map((category) => (
        <Link key={category.key} href={`/category/${category.key}`}>
          <div className="flex flex-col items-center hover:opacity-80 transition">
            <Image
              src={category.thumbnail}
              alt={category.label}
              width={240}
              height={135}
              className="rounded-xl shadow-md"
            />
            <div className="mt-2 text-center text-white font-semibold">{category.label}</div>
          </div>
        </Link>
      ))}
    </main>
  );
}
