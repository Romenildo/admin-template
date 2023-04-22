import useAuth from "../../data/hook/useAuth";
import { BellIcon, ConfigIcon, HomeIcon, LogOutIcon } from "../icons";
import AsideItem from "./AsideItem";
import Logo from "./Logo";


interface AsideProps{

}

export default function Aside(props:AsideProps){

    const { logout } = useAuth()

    return(
        <aside className={`flex flex-col
                         bg-gray-200
                         dark:bg-gray-900
        `}>
            <div className={`
                h-20 w-20 
                bg-gradient-to-r from-indigo-500 to-purple-800
                flex flex-col items-center justify-center
                `}>
                    <Logo/>
            </div>
            <ul className="flex-grow">
                <AsideItem url="/" text="Início"  icon={HomeIcon}/>
                <AsideItem url="/config" text="Ajustes"  icon={ConfigIcon}/>
                <AsideItem url="/notifications" text="Notificações"  icon={BellIcon}/>
            </ul>
            <ul >
                <AsideItem url="/" text="Sair"  icon={LogOutIcon} onClick={()=>logout} 
                className={` text-red-600 dark:text-red-400
                             hover:bg-red-400 hover:text-white
                              dark:hover:text-white
                             `}
                />
            </ul>
        </aside>
    )
}