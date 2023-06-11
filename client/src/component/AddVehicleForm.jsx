import { Button, Form, Input, Space, Alert, Col, Row } from 'antd';
import { useState } from 'react';

const AddVehicleForm = () => {
  const [status, setStatus] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await fetch('/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        setStatus('success');
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      } else if (response.status === 500) {
        setStatus('error 500');
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = (changedValues) => {
    if (changedValues.layout) {
      setFormLayout(changedValues.layout);
    }
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 6,
          },
        }
      : null;

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{
              layout: formLayout,
            }}
            onValuesChange={onFormLayoutChange}
            onFinish={onFinish}
            style={{
              maxWidth: formLayout === 'inline' ? 'none' : 600,
            }}
          >
            <Form.Item
              label="Vehicle Number"
              name="vehicleNumber"
              rules={[
                { required: true, message: 'Please enter the vehicle number' },
              ]}
            >
              <Input placeholder="Ex: CAA-1234" />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="vehicleBrand"
              rules={[{ required: true, message: 'Please enter the brand' }]}
            >
              <Input placeholder="Ex: Honda" />
            </Form.Item>
            <Form.Item
              label="Model"
              name="vehicleModel"
              rules={[{ required: true, message: 'Please enter the model' }]}
            >
              <Input placeholder="Ex: Vezel" />
            </Form.Item>
            <Form.Item
              label="Chasis Number"
              name="vehicleChassisNumber"
              rules={[
                { required: true, message: 'Please enter the chassis number' },
              ]}
            >
              <Input placeholder="Ex: SV30-0169266" />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">
                Add Vehicle
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {status === 'error' && (
              <Alert
                message="Error"
                description="Something Went Wrong! Please try again!"
                type="error"
                showIcon
              />
            )}
            {status === 'success' && (
              <Alert
                message="Success"
                description="Successfully Added!"
                type="success"
                showIcon
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default AddVehicleForm;
