import React, { useEffect, useState, useContext } from 'react';
import api from '../api/apiClient';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => { setPost(res.data); setLoading(false); });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl">{post.title}</h1>
      {post.featuredImage && <img src={post.featuredImage} alt="" className="max-h-96 my-4" />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
