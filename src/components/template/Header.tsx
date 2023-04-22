import ButtonTheme from "./ButtonTheme"
import Title from "./Title"
import useAppData from "../../data/hook/useAppData"
import UserAvatar from "./userAvatar"

interface HeaderProps{
    title: string
    subTitle: string
}

export default function Header(props:HeaderProps){

    const {theme, changeTheme } = useAppData()
    return(
        <div className="flex ">
            <Title title={props.title} subTitle={props.subTitle} />
            <div className={`flex flex-grow justify-end items-center gap-3`}>
                <ButtonTheme theme={theme} changeTheme={changeTheme}></ButtonTheme>
                <UserAvatar/>
            </div>
        </div>
    )
}