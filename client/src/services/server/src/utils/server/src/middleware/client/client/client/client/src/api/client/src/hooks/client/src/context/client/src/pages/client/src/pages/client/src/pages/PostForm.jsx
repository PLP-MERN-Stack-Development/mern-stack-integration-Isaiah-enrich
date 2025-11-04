import React, { useState, useContext } from 'react';
import api from '../api/apiClient';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ existing }) {
  const { auth, setPosts } = useContext(AppContext);
  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');
  const [categories, setCategories] = useState(existing?.categories?.map(c=>c._id).join(',') || '');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('categories', categories);
    if (file) fd.append('featuredImage', file);

    try {
      // optimistic UI: create a temporary post on the client
      const tempPost = { _id: 'temp-'+Date.now(), title, excerpt: content.slice(0,100) };
      setPosts(prev => [tempPost, ...prev]);

      const res = existing
        ? await api.put(`/posts/${existing._id}`, fd)
        : await api.post('/posts', fd);

      // replace temp with real
      setPosts(prev => [res.data, ...prev.filter(p => p._id !== tempPost._id)]);
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      // rollback optimistic update
      setPosts(prev => prev.filter(p => !p._id.startsWith('temp-')));
      alert('Error saving post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={categories} onChange={e => setCategories(e.target.value)} placeholder="category ids comma separated" />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Save</button>
    </form>
  );
}
