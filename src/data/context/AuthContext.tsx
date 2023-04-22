import { useRouter } from "next/router";
import firebase from "../../firebase/config";
import User from "../../model/user";
import { createContext, useState } from "react";

interface AuthContextProps {
    user?: User
    loginGoogle?: ()=> Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizedUser(firebaseUser:firebase.User):Promise<User>{
    const token = await firebaseUser.getIdToken()
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0]?.providerId,
        imageUrl: firebaseUser.photoURL,
    }
}



export function AuthProvider(props:any){
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        if(resp.user?.email){
            const user= await normalizedUser(resp.user)
            setUser(user)
            router.push('/')
        }
        
        
    }
    return(
        //user e a funcao vai para o contexto e se tornara global para todos os componentes
        <AuthContext.Provider value={{
            user,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext