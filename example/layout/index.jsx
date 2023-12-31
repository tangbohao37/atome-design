import { Layout } from '@/es/layout'
import '@/example/layout/index.css'

const Sider = Layout.Sider
const Header = Layout.Header
const Footer = Layout.Footer
const Content = Layout.Content

const App = () => {
  return (
    <div className="layout-basic-demo">
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Sider style={{ width: '64px' }}>Sider</Sider>
          <Sider style={{ width: '206px', marginLeft: '1px' }}>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  )
}

render(<App />)
