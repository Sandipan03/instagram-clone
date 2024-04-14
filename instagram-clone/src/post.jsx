import React from 'react'
import './post.css'
import { useEffect,useState } from 'react';
import {db} from './firebase';
import { getFirestore ,addDoc, doc,collection,onSnapshot,orderBy,query} from "firebase/firestore";
import Avatar from '@mui/material/Avatar';
function post({postId,user,username,caption,imageUrl}) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  useEffect(()=>{
    if (postId){

    onSnapshot(query(collection(db,'posts',postId,'comments')),(snapshot)=>{
      setComments(snapshot.docs.map(doc=>(doc.data())));
      // console.log(snapshot.docs.map(doc=>{doc.data()}));
    })}
  }, [postId]) ;
  const addComment = (event) => {
    event.preventDefault();
    addDoc(collection(doc(collection(db,'posts'),postId),'comments'),{  
      text: comment,
      username: user.displayName,
      timestamp: new Date()
    });
    setComment('');
  }
  return (
    <div className='post'>
        <div className="post_header">
        <Avatar className='post_avatar' alt="Sandipan" src="/static/images/avatar/1.jpg" />
        <h3>{username}</h3>
        </div>
        <img className='post_image' src={imageUrl} alt="" />
        <h4 className='post_text'><strong>{username}</strong> {caption}</h4>

<div className="comments">
  {
    comments.map((comment)=>(
      // console.log({comment}),
      <p>
        <strong>{comment.username}</strong> {comment.text}
      </p>
      
      
      
    ))
  
  }
</div>
        {user && (
        <form className='post_comment'>
          <input className='comment_text' type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment..."></input>
          <button className='comment_button' disabled={!comment} type="submit" onClick={addComment}>Post</button>
        </form>
        )}
    </div>
  )
}

export default post