'use client'

import { Button, Form, Input, Modal } from 'antd';
import React from 'react'

interface SignInModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface FormValues {
//   email: string;
//   password: string;
// }

const SignInModal = ({ isOpen, setIsOpen }: SignInModalProps) => {
  const [form] = Form.useForm();


  // const onFinish = async (values: FormValues) => {

  //   if (result.success) {
  //     console.log('Muvaffaqiyatli kirish:', result.data);
  //     form.resetFields();
  //     setIsOpen(false);
  //   } else {
  //     console.log('Xatolik:', result.error);
  //   }
  // };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        title="Kirish"
        centered
        open={isOpen}
        onCancel={handleCancel}
        width={400}
        closeIcon
        footer={null}
        maskClosable={false}
        keyboard={false}
      >
        <Form
          form={form}
          name="signIn"
          layout="vertical"
          // onFinish={onFinish}
          autoComplete="on"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Enter your email"
            name="email"
            rules={[
              { required: true, message: 'Email kiritish majburiy!' },
              { type: 'email', message: 'To\'g\'ri email formatini kiriting!' }
            ]}
          >
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label="Enter your password"
            name="password"
            rules={[
              { required: true, message: 'Parol kiritish majburiy!' },
              { min: 6, message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak!' }
            ]}
          >
            <Input.Password
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SignInModal;