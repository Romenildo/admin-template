import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Home() {

  //utilizando os valores do context
  const ctx = useAppData()
  return (
      <Layout title="Inicial" subTitle="Teste">
        {ctx.name}
      </Layout>
  )
}
