import Head from 'next/head'
import ChampSelectPage from './ChampSelectPage'
import { Nav, ThemeToggle } from '../components/elements'

const Index: React.FC = () => (
  <>
    <Head>
      <title>LOL Dodge Tool Home</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <Nav />
    <ThemeToggle />
    <ChampSelectPage />
  </>
)
export default Index
