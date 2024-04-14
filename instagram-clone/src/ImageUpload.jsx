import React, { useState } from 'react'
import Button from '@mui/material/Button';
import './ImageUpload.css';
import {storage,db} from './firebase';
import {collection,addDoc} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { v4 } from "uuid";

function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
  
    const imagesListRef = ref(storage, "images/");
const [progress, setProgress] = useState(0)

const handleChange = (e) => {
    if(e.target.files[0]){
        setImageUpload(e.target.files[0]);
    }
}
const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        // console.log(imageUrls);
        addDoc(collection(db,'posts'),{
            timestamp: new Date(),
            caption: caption,
            imageUrl: url,
            username: username
        });
        setImageUpload(null);
        setCaption('');
      });
    },
    (snapshot)=>{
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
    
    });
    
}
  return (
    <div className='imageuploader'>
        <progress className='progress_bar' value={progress} max="100"/>
        <input type="text" value={caption} placeholder='Enter a caption...'  onChange={(e)=>setCaption(e.target.value)}/>
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>
            Upload
        </Button>
    </div>
  )
}

export default ImageUpload