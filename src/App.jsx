import './App.css';
import News from './Components/News';
import Blog from './Components/Blog';
import { useEffect, useState } from 'react';

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost,setSelectedPost] = useState(null);
  const[isEditing,setIsEditing] = useState(false);
  
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    setBlogs(savedBlogs);
  }, []);
  
  const handleCreateBlog = (newBlog,isEdit) => {
    setBlogs((prevBlogs )=>{ 
      const updatedBlogs = isEdit ? prevBlogs.map((blog)=>(blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog]
      localStorage.setItem('blogs',JSON.stringify(updatedBlogs))
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) =>{
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);

  }
  
  const handleDeleteBlog = (blogToDelete) =>{
    setBlogs((prevBlogs)=>{
      const updatedBlogs = prevBlogs.filter((blog)=>blog !== blogToDelete)
      localStorage.setItem('blogs',JSON.stringify(updatedBlogs))
      return updatedBlogs;
    })
  }

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className='container'>
      <div className='news-blogs-app'>
        {showNews && <News onShowBlogs={handleShowBlogs} onCreateBlog={handleCreateBlog} newBlog={blogs} onEditBlog={handleEditBlog} onDeleteBlog={handleDeleteBlog} />}
        {showBlogs && <Blog onBack={handleBackToNews} onCreateBlog={handleCreateBlog} newBlog={blogs} editPost={selectedPost} isEditing={isEditing} />}
      </div>
    </div>
  );
}

export default App;