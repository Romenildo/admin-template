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

    async function loginGoogle() {
        
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