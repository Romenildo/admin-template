import { useRouter } from "next/router";
import firebase from "../../firebase/config";
import User from "../../model/user";
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

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

function cookieManager(logged: boolean){
    if(logged){
        Cookies.set('admin-template-auth', 'true',{
            expires: 7
        })
    }else{
        Cookies.remove('admin-template-auth')
    }
}



export function AuthProvider(props:any){
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    async function configSession(firebaseUser){
        if(firebaseUser?.email){
            const user = await normalizedUser(firebaseUser)
            setUser(user)
            cookieManager(true)
            setLoading(false)
            return user.email
        }else{
            setUser(null)
            cookieManager(false)
            setLoading(false)
            return false
        }
    }

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        configSession(resp.user)
        router.push('/')

    }

    useEffect(()=>{
        //observer no onIdtokenChanged então quando o token do usuario for modificado ele vai lancar um evento e executar a funcao
        //entao ele vai verificar a sessao se o usuario ainda estiver no cookie ele via continuar logado
        const cancel = firebase.auth().onIdTokenChanged(configSession)
        return () => cancel()
    })

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