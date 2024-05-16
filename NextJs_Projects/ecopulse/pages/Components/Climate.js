import React from 'react';
import { format } from 'date-fns';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/climate`);
  const data = await res.json();

  if (!data.success) {
    return {
      props: {
        error: 'Failed to fetch climate news',
      },
    };
  }

  return {
    props: {
      articles: data.result.articles,
    },
  };
}

const Climate = ({ articles, error, darkMode }) => {
  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-green-50 text-black'}`}>
      <h1 className="text-5xl underline italic text-center my-4 font-bold mb-6" style={{ fontFamily: 'Bree Serif, serif' }}>Climate News</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="p-4 border rounded shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="mb-4 w-full h-48 object-cover" />}
            <p className="text-sm text-gray-500 mb-4">{format(new Date(article.published), 'dd/MM/yyyy')}</p>
            <p className="text-base">{article.source}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 inline-block">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Climate;
