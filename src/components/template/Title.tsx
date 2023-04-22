
interface TitleProps{
    title: string
    subTitle: string
}

export default function Title(props:TitleProps){
    return(
        <div>
            <h1 className={`font-black text-3xl text-gray-900`}>{props.title}</h1>
            <h2 className={`font-light text-sm txt-gray600`}>{props.subTitle}</h2>
        </div>
    )
}