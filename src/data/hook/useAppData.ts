import { useContext } from "react";
import AppContext from "../context/AppContext";

//pega o contexto criado
const useAppData = () => useContext(AppContext)

//Então so com isso a partir do retorno do useAppData pode ser acessado os valores
//que estão dentro do contexto no provider

export default useAppData

//Então Pode ser utilizado em qualquer componente dentro do componente provider colocado no inicial do APP
//então so entrar no componente e instanciar uma nova contante
//const dadsos = useAppData(), que a partir de agora dados contem todas as informacoes de dentro do contexto