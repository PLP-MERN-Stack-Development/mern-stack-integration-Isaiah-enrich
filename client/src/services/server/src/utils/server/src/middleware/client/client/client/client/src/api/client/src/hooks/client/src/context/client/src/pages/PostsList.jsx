import React, { useEffect, useContext, useState } from 'react';
import api from '../api/apiClient';
import { AppContext } from '../context/AppContext';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

export default function PostsList() {
  const { posts, setPosts } = useContext(AppContext);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const load = async (p=1) => {
    setLoading(true);
    const res = await api.get(`/posts?page=${p}&limit=10`);
    setPosts(res.data.data);
    setMeta(res.data.meta);
    setLoading(false);
  };

  useEffect(() => { load(page); }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Posts</h1>
      {loading ? <p>Loading...</p> :
        posts.map(post => (
          <div key={post._id} className="p-4 border mb-3 rounded">
            <Link to={`/posts/${post._id}`}><h2 className="text-xl">{post.title}</h2></Link>
            <p>{post.excerpt}</p>
          </div>
        ))
      }
      <Pagination meta={meta} setPage={setPage} />
    </div>
  );
}
