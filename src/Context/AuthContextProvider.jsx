import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContextProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const RegisterUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const LoginUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const LogoutUser = () => {
    return signOut(auth);
  };


useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setLoading(false);
      setUser(currentUser);
      const token = await currentUser.getIdToken();
      localStorage.setItem("token", token);
    } else {
      setLoading(false);
      setUser(null);
      localStorage.removeItem("token");
    }
  });

  return () => unSubscribe();
}, []);


  const authInfo = {
    user,
    RegisterUser,
    LoginUser,
    loading,
    updateUserProfile,
    loginWithGoogle,
    LogoutUser,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthContextProvider;
