import Link from "next/link"
import useAuth from "../../data/hook/useAuth"


export default function UserAvatar(){

    const { user } = useAuth()
    return(
        <Link href='/perfil'>
            <img 
                className="h-10 w-10 rounded-full cursor-pointer"
                src={user?.imageUrl ?? '/imgs/avatar.jpeg'} 
                alt="Avatar do usuario"/>
        </Link>
    )
}