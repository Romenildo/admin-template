import Image from 'next/image'
import loadingImg from '../../../public/imgs/loading.gif'
import useAuth from '../../data/hook/useAuth'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function ForceAuth(props){


    const { user, loading } = useAuth()
    const router = useRouter()

    function renderContent(){
        return(
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html:`
                                if(!document.cookie?.includes("admin-template-auth")){
                                    window.location.href = "/auth"
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading(){
        return(
            <div className={`flex justify-center items-center h-screen`}>
                <Image src={loadingImg} alt='loading'/>
            </div>
        )
    }

    if(!loading && user?.email){
        return renderContent()
    }else if(loading){
        return renderLoading()
    }else{
        router.push('/auth')
        return null
    }
}