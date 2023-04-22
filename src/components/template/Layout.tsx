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
        <div>
            <Aside/>
            <Header title={props.title} subTitle={props.subTitle}></Header>
            <Content> {props.children}</Content>
        </div>
        
    )
}