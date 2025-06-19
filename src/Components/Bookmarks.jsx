import React from 'react';
import noImg from "../assets/images/no-img.png";
import "./Modal.css";
import "./Bookmark.css";
const Bookmarks = ({show,bookmarks,onClose,onSelectedArticle,onDeleteBookmark}) => {
  if(!show) return null;
    return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button"onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            <h2 className='bookmarks-heading'>Bookmarked News</h2>
            <div className="bookmark-list">
                {bookmarks.map((article,index) =>(
                    <div key={index} className="bookmark-item"onClick={()=>onSelectedArticle(article)}>
                        <img src={article.image || noImg} alt={article.title}/>
                        <h3>{article.title}</h3>
                        <span className="delete-button">
                            <i className="fa-regular fa-circle-xmark" onClick={(e)=>{
                                e.stopPropagation();
                                onDeleteBookmark(article);
                            }}></i>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Bookmarks