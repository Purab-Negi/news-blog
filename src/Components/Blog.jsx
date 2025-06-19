import React, { useDebugValue, useEffect } from 'react';
import userImg from "../assets/images/user.jpg";
import { useState } from 'react';
import "./Blog.css";
import noImg from "../assets/images/no-img.png";

const Blog = ({ onBack, onCreateBlog, editPost, isEditing}) => {  
    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitted,setSubmitted] = useState(false);
    const[titlevalid,setTitleValid] = useState(true);
    const [contentvalid,setContentValid] = useState(true);

    useEffect(()=>{
        if(isEditing && editPost){
            setImage(editPost.image);
            setTitle(editPost.title);
            setContent(editPost.content);
            setShowForm(true);
        }
        else{
            setImage(null);
            setTitle('');
            setContent('');
            setShowForm(false);
        }
    },[isEditing,editPost])

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSize = 1*1024*1024;
            if(file.size > maxSize){
                alert("File size exceeds 1 MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const handleTitleChange = (e)=>{
        setTitle(e.target.value);
        if(e.target.value.length <= 60){
            setTitle(e.target.value);
            setTitleValid(true);
        }
    }
    const handleContentChange = (e)=>{
        setContent(e.target.value);
        setContentValid(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title || !content) {
            if(!title) setTitleValid(false);
            if(!content) setContentValid(false);
            return;
        }
        const newBlog = { image : image || noImg, title, content };  
        onCreateBlog(newBlog,isEditing);  
        setImage(null);
        setContent('');
        setTitle('');
        setShowForm(false);
        setSubmitted(true);
    };

    return (
        <div className="blogs">
            <div className="blogs-left">
                <img src={userImg} alt="User" />
            </div>
            <div className="blogs-right">
                {!showForm && !submitted && (
                    <button 
                        className="post-btn" 
                        onClick={() => setShowForm(true)}
                    >
                        Create New Post
                    </button>
                )}
                {submitted && <p className='submission-message'>Post Submitted!</p>}
                    <div className={`blogs-right-form ${showForm ? 'visible' : 'hidden'}`}>
                        <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="img-upload">
                                <label htmlFor="file-upload" className='file-upload'>
                                    <i className="bx bx-upload" aria-hidden="true"></i>
                                    Upload Image
                                </label>
                                <input 
                                    type="file" 
                                    id='file-upload' 
                                    onChange={handleImageChange} 
                                    accept="image/*"  // Restrict to images
                                />
                            </div>
                            <input 
                                type="text" 
                                placeholder='Add Title (Max 60 characters)' 
                                className={`title-input ${!titlevalid ? "invalid" : ""}`} 
                                value={title} 
                                onChange={handleTitleChange}
                                maxLength={60}  // Enforce max length
                            />
                            <textarea 
                                className={`text-input ${!contentvalid ? "invalid" : ""}`} 
                                placeholder='Add Text' 
                                value={content} 
                                onChange={handleContentChange}
                            ></textarea>
                            <button type='submit' className="submit-btn" >
                                {isEditing ? "Edit Post": "Publish Post"}
                            </button>
                        </form>
    
                    </div>

                <button className="blogs-close-btn" onClick={onBack}>
                    Back <i className="bx bx-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default Blog;