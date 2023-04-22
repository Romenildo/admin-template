import Content from "./Content"
import Header from "./Header"
import Aside from "./aside"


interface LayoutProps{
    title: string
    subTitle: string
    children?: any
}


export default function Layout(props:LayoutProps){
    return(
        //para configurar o black e light modo e so colocar o dark na classe principal e todos dentro deve ter ter os components com 
        //nome dark: bg-color-white e então quando aparecer o dark na div acima todos esses itens com dark irao ativar
        <div className={`dark flex h-screen w-screen`}>
            <Aside/>
            <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
                <Header title={props.title} subTitle={props.subTitle}></Header>
                <Content> {props.children}</Content>
            </div>
            
        </div>
        
    )
}