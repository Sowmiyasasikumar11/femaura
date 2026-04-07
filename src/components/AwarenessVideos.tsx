import { useMemo, useState } from 'react';
import videoData from '../data/videos.json';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: 'Usage' | 'Disposal' | 'Awareness';
  videoId: string;
}

const categories: Array<'All' | 'Usage' | 'Disposal' | 'Awareness'> = [
  'All',
  'Usage',
  'Disposal',
  'Awareness',
];

const AwarenessVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Usage' | 'Disposal' | 'Awareness'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videos = videoData as VideoItem[];

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesSearch = searchQuery
        ? [video.title, video.description, video.category]
            .join(' ')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, videos]);

  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const openModal = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#faf5ff)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="space-y-4 lg:max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-lg border border-pink-100">
              <span className="text-2xl">🎥</span>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Awareness Videos</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Browse helpful videos about menstrual hygiene, product usage, disposal, and cycle awareness.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="rounded-3xl bg-white shadow-xl border border-pink-100/70 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-600 font-semibold">Category</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white shadow-xl border border-purple-100/80 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-600 font-semibold">Search videos</p>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, topic, or category"
                className="mt-4 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredVideos.map((video) => {
            const thumbnailUrl = getThumbnailUrl(video.videoId);
            return (
              <div
                key={video.id}
                className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-pink-100/80 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="relative cursor-pointer overflow-hidden bg-gray-100 aspect-video"
                  onClick={() => openModal(video)}
                >
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 p-4 shadow-lg">
                      <span className="text-3xl text-purple-600">▶</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-purple-700 w-fit">
                    {video.category}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{video.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{video.description}</p>
                  </div>
                  <button
                    onClick={() => openModal(video)}
                    className="mt-auto inline-flex items-center justify-center rounded-full bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-purple-700"
                  >
                    Play Video
                  </button>
                </div>
              </div>
            );
          })}

          {filteredVideos.length === 0 && (
            <div className="col-span-full rounded-[28px] border border-dashed border-purple-200 bg-white/90 p-10 text-center shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900">No videos found</h3>
              <p className="mt-3 text-sm text-gray-600">Try a different category or search phrase to discover more menstrual health videos.</p>
            </div>
          )}
        </div>

        {isModalOpen && selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={closeModal}>
            <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-colors duration-200 hover:bg-purple-100"
                aria-label="Close video modal"
              >
                ✕
              </button>
              <div className="bg-black">
                <div className="aspect-video">
                  <iframe
                    title={selectedVideo.title}
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-purple-700">
                    {selectedVideo.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                <p className="mt-3 text-gray-600">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwarenessVideos;
