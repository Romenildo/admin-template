import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { AppProvider } from '../data/context/AppContext'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../data/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    //App provider para prover todas as funcoes que estão dentro do contexto
    //Então o provider está provendo para todos os componentes dentro da aplicação
    //O objeto passado no Contexto
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
    
  )
}
