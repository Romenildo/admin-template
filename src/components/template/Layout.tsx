import Aside from "./Aside"
import Content from "./Content"
import Header from "./Header"
import useAppData from "../../data/hook/useAppData"
import ForceAuth from "../auth/ForceAuth"


interface LayoutProps{
    title: string
    subTitle: string
    children?: any
}


export default function Layout(props:LayoutProps){

    //utilizando o context
    const {theme} = useAppData()

    return(
        <ForceAuth>
            <div className={`${theme} flex h-screen w-screen`}>
                <Aside/>
                <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
                    <Header title={props.title} subTitle={props.subTitle}></Header>
                    <Content> {props.children}</Content>
                </div>
                
            </div>
        </ForceAuth>
        
        
    )
}