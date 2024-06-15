import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


function AuthSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.photoURL)

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch(err){
      console.error(err);
    }
    
  };

  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleProvider);
    } catch(err) {
      console.error(err);
    }
  };

  const signOutWithGoogle = async () => {
    try{
      await signOut(auth);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email.."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passowrd.."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={signOutWithGoogle}>Sign out with Google</button>
    </div>
  );
}

export default AuthSection;
