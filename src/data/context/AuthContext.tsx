import { useRouter } from "next/router";
import firebase from "../../firebase/config";
import User from "../../model/user";
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    loading?: boolean
    login?: (email:string, password:string)=> Promise<void>
    register?: (email:string, password:string)=> Promise<void>
    loginGoogle?: ()=> Promise<void>
    logout?: ()=> Promise<void>
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
        try{
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await configSession(resp.user)
            router.push('/')
        }finally{
            setLoading(false)
        }

    }

    async function login(email, password) {
        try{
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
            await configSession(resp.user)
            router.push('/')
        }finally{
            setLoading(false)
        }

    }
    async function register(email, password) {
        try{
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await configSession(resp.user)
            router.push('/')
        }finally{
            setLoading(false)
        }

    }

    async function logout(){
        try{
            setLoading(true)
            await firebase.auth().signOut()
            await configSession(null)
            router.push('/auth')
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(Cookies.get('admin-template-auth')){
            //observer no onIdtokenChanged então quando o token do usuario for modificado ele vai lancar um evento e executar a funcao
        //entao ele vai verificar a sessao se o usuario ainda estiver no cookie ele via continuar logado
        const cancel = firebase.auth().onIdTokenChanged(configSession)
        return () => cancel()
        }else{
            setLoading(false)
        }
    })

    return(
        //user e a funcao vai para o contexto e se tornara global para todos os componentes
        <AuthContext.Provider value={{
            user,
            loading,
            loginGoogle,
            logout,
            login,
            register
            
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext