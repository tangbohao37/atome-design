import { Button } from '@/es/button'
import { Space } from '@arco-design/web-react'

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled type="secondary">
          Secondary
        </Button>
        <Button disabled type="dashed">
          Dashed
        </Button>
        <Button disabled type="outline">
          Outline
        </Button>
        <Button disabled type="text">
          Text
        </Button>
      </Space>
      {/* <Divider></Divider> */}
      <Space size="large">
        <Button disabled type="primary" status="danger">
          Primary
        </Button>
        <Button disabled type="secondary" status="danger">
          Secondary
        </Button>
        <Button disabled type="dashed" status="danger">
          Dashed
        </Button>
        <Button disabled type="outline" status="danger">
          Outline
        </Button>
        <Button disabled type="text" status="danger">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="warning">
          Primary
        </Button>
        <Button disabled type="secondary" status="warning">
          Secondary
        </Button>
        <Button disabled type="dashed" status="warning">
          Dashed
        </Button>
        <Button disabled type="outline" status="warning">
          Outline
        </Button>
        <Button disabled type="text" status="warning">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="success">
          Primary
        </Button>
        <Button disabled type="secondary" status="success">
          Secondary
        </Button>
        <Button disabled type="dashed" status="success">
          Dashed
        </Button>
        <Button disabled type="outline" status="success">
          Outline
        </Button>
        <Button disabled type="text" status="success">
          Text
        </Button>
      </Space>
    </Space>
  )
}

render(<App />)
