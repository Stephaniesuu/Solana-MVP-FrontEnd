import React from 'react';
import { Form, Input, InputNumber, Radio, Space, Alert, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Select } from '@web3uikit/core';

const cryptoOptions = [
  { label: 'BTC', value: 'btc', img: 'path_to_btc_icon' },
  { label: 'ETH', value: 'eth', img: 'path_to_eth_icon' },
];

// 加密货币选择组件
const CryptocurrencySelect = ({ fieldKey, index }: { fieldKey: string, index: number }) => {
  return (
    <Select
      description="Select cryptocurrency"
      height="40px"
      isSearch
      label={`Cryptocurrency #${index + 1}`}
      max={3}
      menuHeight="300px"
      name={`crypto_${fieldKey}`}
      onChange={(selectedOption) => {
        console.log(selectedOption); // 处理选中项
      }}
      options={cryptoOptions.map((option) => ({
        id: option.value,
        label: option.label,
        prefix: <img src={option.img} alt={option.label} style={{ marginRight: '5px', width: '20px', height: '20px' }} />,
      }))}
      placeholder="Select cryptocurrency"
      tryBeta
      width="16em"
    />
  );
};

// 动态字段表单组件
const DynamicFieldsForm = ({ form }: { form: any }) => {
  // 添加用于处理流动性警告的逻辑
  const onValuesChange = (_changedValues: any, allValues: { cryptos: any[]; }) => {
    const sumPercentage = allValues.cryptos?.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
    if (sumPercentage > 100) {
      form.setFields([
        { name: 'liquidityWarning', errors: ['Warning: The total percentage exceeds 100%'] },
      ]);
    } else {
      form.setFields([{ name: 'liquidityWarning', errors: [] }]);
    }
  };

  return (
    <Form
      form={form}
      name="crypto_form"
      onValuesChange={onValuesChange}
      autoComplete="off"
    >
      <Form.Item name="vaultType" label="Vault type">
        <Radio.Group options={[{ label: 'Private', value: 'private' }, { label: 'Public', value: 'public' }]} />
      </Form.Item>

      <Form.List name="cryptos">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'tokenTicker']}
                  rules={[{ required: true, message: '请输入代币名称' }]}
                >
                  <CryptocurrencySelect fieldKey={String(field.key)} index={index} />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'address']}
                  rules={[{ required: true, message: '请输入地址' }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'percentage']}
                  rules={[{ required: true, message: '请输入百分比' }]}
                >
                  <InputNumber min={0} max={100} placeholder="Percentage" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.cryptos !== currentValues.cryptos}>
        {({ getFieldValue }) => {
          const cryptos = getFieldValue('cryptos') || [];
          const totalPercentage = cryptos.reduce((sum: number, record: { percentage: number; }) => sum + (record.percentage || 0), 0);
          return totalPercentage > 100 ? (
            <Alert message="Warning: Token has Insufficient Liquidity, please change" type="error" />
          ) : null;
        }}
      </Form.Item>
    </Form>
  );
};

export default DynamicFieldsForm;
