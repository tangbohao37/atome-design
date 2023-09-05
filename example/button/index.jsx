import { Space } from "@arco-design/web-react";
import { Button } from "@/components/button";
import * as pkg from "@arco-design/web-react";

const App = () => {
  console.log(pkg);

  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  );
};

render(<App />);
