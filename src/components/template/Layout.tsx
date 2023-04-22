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
        <div className={`flex h-screen w-screen`}>
            <Aside/>
            <div className={`flex flex-col w-full p-7 bg-gray-300`}>
                <Header title={props.title} subTitle={props.subTitle}></Header>
                <Content> {props.children}</Content>
            </div>
            
        </div>
        
    )
}