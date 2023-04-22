import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";

export default function Auth() {

  const [mode, setMode] = useState<'login'|'cadastro'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(){
    if(mode == 'login'){

    }else{

    }
  }
  return (
      <div className="flex h-screen items-center justify-center">

        <div className="hidden md:block md:w-1/2 lg:w-2/3">
          {/*Pegar imagem aleatoria toda vez que abrir a pagina */}
          <img src="https://source.unsplash.com/beach" 
               alt="Imagem da tela de autenticacao" 
               className="h-screen w-full object-cover"
               />
        </div>

        <div className="m-10 w-full md:w-1/2 lg:w-1/3">
          <h1 className={` text-3xl font-bold mb-5`}>
            {mode==='login'?'Entre com a Sua Conta': 'Cadastre-se na Plataforma'}
          </h1>
          <AuthInput label="Email" value={email} onChange={setEmail} type="email" required></AuthInput>
          <AuthInput label="Password" value={password} onChange={setPassword} type="password" required></AuthInput>

          <button onClick={onSubmit} className={` w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}>
            {mode==='login'?'Entrar': 'Cadastrar'}
          </button>

          <hr className="my-6 border-gray-300 w-full"></hr>

          <button onClick={onSubmit} className={` w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3`}>
            Entrar com Google
          </button>

          {mode === 'login'?(
            <p className="mt-8">
                Novo por aqui? <a onClick={()=>setMode('cadastro')} className={` text-blue-500  hover:text-blue-700 font-semibold cursor-pointer`}>
                  Crie uma conta gratuitamente
                </a>.
            </p>
          ):(
            <p className="mt-8">
                Já tem conta? então <a onClick={()=>setMode('login')} className={` text-blue-500  hover:text-blue-700 font-semibold cursor-pointer`}>
                   Faça o login
                </a>.
            </p>
          )}
      </div>
      </div>
  )
}
