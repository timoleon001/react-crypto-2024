import { useState } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context";

const validateMessages = {
  required: "${label} is required",
  types: {
    number: "${label} in no valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();

  function handleSelect(value) {
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(v) {
    console.log("finish ", v);
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}>
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="data">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
