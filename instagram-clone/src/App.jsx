import { useState,useEffect} from 'react'
import './App.css'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile,onAuthStateChanged } from "firebase/auth";
import Post from './post'
import ImageUpload from './ImageUpload'
import insta_logo from './assets/insta_logo.png'
import { InstagramEmbed } from 'react-social-media-embed';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import {db} from './firebase'
import { initializeApp } from "firebase/app";
import { getFirestore , collection,onSnapshot,orderBy,query} from "firebase/firestore";
import { set } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyDhAK8VwMmuZ5p45Z0DnLJWxoVa3r_F4QU",
    authDomain: "instagram-clone-sandipan.firebaseapp.com",
    projectId: "instagram-clone-sandipan",
    storageBucket: "instagram-clone-sandipan.appspot.com",
    messagingSenderId: "147029116410",
    appId: "1:147029116410:web:d48f975f659700c452d043",
    measurementId: "G-CD30L0F11C"
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
// useEffect runs when a specific Cond. is met; cond. is written in the sq. brackets at the end. If nothing is mentioned , it runs each time the page reloads

useEffect(()=>{
    onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot)=>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post:doc.data()})));
        // console.log(snapshot.docs.map(doc=>{doc.data()}));
      }
  )
 
  }, []) ;
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setUsername(''); setEmail(''); setPassword('');}
  const handleLoginOpen = () => setLogin(true);
  const handleLoginClose = () => {setLogin(false); setEmail(''); setPassword('');}
  const signUp = (event) =>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((authUser) => {
    // user=authUser.user;
    
    return updateProfile(authUser.user,{
      displayName: username
    })  
  })
  .catch((error) => {
    alert(error.message);
  });
  handleClose();
  setUsername('');
  setEmail('');
  setPassword('');
  }
  const logIn = (event) =>{ 
    event.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .catch((error)=>{
      alert(error.message);
    });
    handleLoginClose();
    setEmail('');
    setPassword('');
  }
  useEffect(()=>{ 
    const unsubscribe= onAuthStateChanged(auth,(authUser)=>{ 
      if(authUser){
        setUser(authUser);
        console.log(authUser);
      }
      else{
        setUser(null);
      }
    })
    return ()=>{
      unsubscribe();
    }
  }, [user,username]) ;  
  // in this case user and username are mentioned in the square brackets as we are using them inside useEffect

  return (
    
    <div className='app'>
      
      
      <div>
      
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2>Hi I am a modal</h2>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <center>
          <img className='app_headerImage' src={insta_logo} alt="" />
          <form className='app_signup'>
          <input type="text"
          placeholder="Email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input type="text"
          placeholder="Username" 
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <input type="password"
          placeholder="Password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
          </center>
        </Box>
      </Modal>
      <Modal
        open={login}
        onClose={handleLoginClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2>Hi I am a modal</h2>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <center>
          <img className='app_headerImage' src={insta_logo} alt="" />
          <form className='app_signup'>
          <input type="text"
          placeholder="Email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input type="text"
          placeholder="Password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit" onClick={logIn}>Log In</Button>
          </form>
          </center>
        </Box>
      </Modal>
    </div>
      <div className="app_header">
        <img className='app_headerImage' src={insta_logo} alt="" />
        {user?(
        <Button onClick={()=>{auth.signOut()}}>Logout</Button>
      ):(
        <div className="app_logincomponent">
          <Button onClick={handleOpen}>Sign Up</Button>
          <Button onClick={handleLoginOpen}>Log In</Button>

        </div>
      
      )}
      </div>
      <div className="app_posts">
        <div className="app_postsLeft">
          {/* {console.log(posts)} */}
       {
    
        posts.map(({id,post})=>(
          // console.log(post),
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
        </div>
       
      
      </div>
     
      {/* key helps to rerender only those posts that are newly added rather than reredering all the posts */}
      {/* <Post username="Sandipan03" caption="Hey! I just started" imageUrl="https://miro.medium.com/v2/resize:fit:800/1*VFStJoxV3Wa8Ees7ZtnN7A.png"/>
      <Post username="Sandipan2018" caption="This is awesome" imageUrl="https://i.redd.it/learn-once-an-for-all-how-to-prompt-very-cool-cars-and-v0-i8vy5zw6y0ha1.png?width=1360&format=png&auto=webp&s=83239ed93b997fd65d075fa28887a587584b7842"/> */}
      {
        user?(
          <ImageUpload username={user.displayName}/>
        ):(
          <h3 className="notify_login">Please login to post</h3>
        )
      }
    </div>
  )
}

export default App;
