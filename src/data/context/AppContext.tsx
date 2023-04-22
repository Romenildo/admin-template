import { createContext, useEffect, useState } from "react";


//O objeto que irá ser compartilhado por toda a aplicação
//COmo a forma de comunicação direta de pai para filho fica inviavel em componentes muitos distantes
//o react adicionou o Context que é compartilhado entra todos os compnentes da aplicação podendo acessar
//a função em qualquer lugar dentro da aplcação

//1- Criar o contexto utilizando o createCOntext do react
//2 - Adicionar o provider que é o cara que prover os dados
//------ 2.5 - Adicionar o consumer aquele que utiliza os dados
//3 - Então precisa colocar o provider dentro da aplicação, normalmente utilizado no APP no inicio da aplicação
//4 - lendo a irformação: Pode ser atraves do consumer
//4.1 Consumer exp0ort o APPCOnsumer daqui e no componente onde deseja usar o valor do provider
//export const AppConsumer = AppContext.Consumer
// basta utilizar o <Appconsumer>{dados => <h3> dados.nome</>}<AppCOnsumer>
//então esse dados sera o objeto passado no contexto
//4.2 Outra forma sem o consumer é utilizando um hook
//5-  criando o hook useAppData lá pega o useCOntexto e entãoe xporta o hook
// Então a partir dessa constante ela pode ser utilizada el qualquer componente bastando simplesmente
//Chama-la const dados = useAppData(), entãon a partir daquele momente dados vai ter todas as funooes e valores passados no context

//type Theme = 'dark'| ''

interface AppContextProps {
    theme?: string
    changeTheme?: ()=>void
}

const AppContext = createContext<AppContextProps>({ })


export function AppProvider(props:any){

    const [theme, setTheme] = useState<string>('')
    
    function changeTheme(){
        //alternar ao clicar
        const newTheme = theme ==='' ? 'dark':''
        setTheme(newTheme)
        localStorage.setItem('thema', newTheme)
    }

    useEffect(()=>{
        const salvedTheme = localStorage.getItem('thema')
        setTheme(salvedTheme)
    },[])

    return(
        //Cria o provedor que vai enviar o valor para todos os componentes abaixo dele
        //Então o componente que tiver englobado dentro do Provider vai poder acessaro o objeto que está dentro de value
        <AppContext.Provider value={{
            theme,
            changeTheme
            }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContext

//export const AppConsumer = AppContext.Consumer