import { useState, useEffect } from 'react';
import { fetchNews, categories } from './api';
import { ExternalLink, Calendar, User, Newspaper } from 'lucide-react';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNews(category);
        if (data.success) {
          setNews(data.data);
        } else {
          setError('Failed to fetch news');
        }
      } catch (_err) {
        setError('Error connecting to API. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Newspaper className="text-blue-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Inshorts <span className="text-blue-600">Clone</span></h1>
          </div>
          
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm text-red-700">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <p className="mt-2 text-sm italic">Run 'python Inshorts-News-API/app.py' to start the backend.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-transform hover:scale-[1.01]">
                <div className="md:w-1/3">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{item.date}, {item.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                      {item.content}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {category}
                    </span>
                    <a 
                      href={item.readMoreUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      read more at {item.sourceName} <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
