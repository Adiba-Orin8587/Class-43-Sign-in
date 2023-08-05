/* eslint-disable no-unused-vars */
import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css'
import app from './Firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);

      })
      .catch(error => {
        console.log(error);

      })
  }
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);

      })
      .catch(error => {
        console.log('error', error);

      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})

      }).catch((error) => {
        setUser({})
        console.log('error sign out', error);
      });

  }

  return (
    <div>
      {
        user.uid ? <button onClick={handleSignOut}>Sign out</button>
          : <>
            <button className='m-3 py-3' onClick={handleGoogleLogin}><img className='go m-2' src="data:image/png;base64,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" alt="" />Sign In With Google</button>
            <button className='m-3' onClick={handleGithubLogin}>
              <img className='go m-2' src="data:image/png;base64,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" alt="" />
              Sign In With Github</button>
          </>
      }



      {
        user.uid && <div>
          <div className="col py-5">
            <div className="card border-0 p-5 m-5">
              <div className="card-body">
                <h1 className='mb-2'>Name: {user?.displayName}</h1>
                <h4 className='my-3'>Email: {user?.email}</h4>
                <img className='my-3' src={user?.photoURL} alt="User image" />
              </div>
            </div>
          </div>

        </div>
      }
    </div>

  )
}

export default App
