import Head from 'next/head'
import ChampSelectPage from './ChampSelectPage'
import { ThemeToggle } from '../components/elements'

const Index: React.FC = () => (
  <>
    <Head>
      <title>LOL Dodge Tool Home</title>
    </Head>

    <ThemeToggle />
    <ChampSelectPage />
  </>
)
export default Index
