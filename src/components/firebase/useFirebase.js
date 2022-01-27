import { useState, useEffect } from "react"
import initializeAuthentication from "./firebase.init"
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, FacebookAuthProvider, getIdToken } from "firebase/auth";

initializeAuthentication()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const auth = getAuth()
    // google sign in
    const googleSignIn = (navigate, location) => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        let from = location?.state?.from?.pathname || "/";
        signInWithPopup(auth, provider)
            .then(result => {
                setUser(result.user)
                navigate(from)
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }
    // facebook log in
    const facebookSignIn = (navigate, location) => {
        setLoading(true)
        const facebookProvider = new FacebookAuthProvider()
        let from = location?.state?.from?.pathname || "/";
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                setUser(result.user)
                navigate(from)
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }
    const setToLocalStorage = () => {
        const loggedIn = 'loggedIn';
        localStorage.setItem('isLoggedIn', loggedIn)
    }
    const removeFromLocalStorage = () => {
        const loggedIn = 'loggedOut';
        localStorage.setItem('isLoggedIn', loggedIn)
    }
    // create user with email and password
    const createUser = (email, password, name, navigate, fail) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const newUser = { email, displayName: name }
                setUser(newUser)
                navigate('/')
            })
            .catch(error => {
                setError(error.message)
                fail()
            })
            .finally(() => setLoading(false))
    }

    //  sign in with email and password
    const emailSignIn = (email, password, navigate, fail) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                navigate('/')
            }).catch(error => {
                setError(error.message)
                fail()
            })
            .finally(() => setLoading(false))
    }
    // Get the currently signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                // get id token
                getIdToken()
                    .then((token) => localStorage.setItem('userToken', token))
                setToLocalStorage()
                setLoading(false)
            }
            else {
                setUser({})
            }
        })

        return () => unsubscribe;
    }, [auth])

    // sign out
    const logOut = () => {
        setLoading(true)
        signOut(auth)
            .then(() => {
                removeFromLocalStorage()
                // Sign-out successful.
            }).catch((error) => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }
    return {
        user,
        error,
        loading,
        googleSignIn,
        logOut,
        createUser,
        emailSignIn,
        facebookSignIn
    }
}
export default useFirebase;