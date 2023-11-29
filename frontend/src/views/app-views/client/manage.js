// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Radio, Space, Form, Card, DatePicker, Button, Input, Select, Row, Col, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberService from 'services/NumberService';
import SearchBox from 'components/shared-components/SearchBox';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;

const UserList = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userId, setuserId] = useState();
  const [storeFormValue, setstoreFormValue] = useState();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 50 } });

  const onFinish = (values) => {
    setLoading(true);
    setSubmitLoading(true)
    if (values && values != 'undefined') {
      setLoading(false);
      setSubmitLoading(false)
    } else {
      setLoading(false);
      setSubmitLoading(false)
    }
  };

  const onFinishFailed = (errorInfo) => {

    message.success("Data has been saved successfully.")
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{}}
      >
        <Flex justifyContent="space-between" mobileFlex={false}>
          <h3>Client Registration</h3>
          <div>
            <Link to="/client/list" className="mr-md-3 mb-3">
              <Button type="primary">View Clients</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="mr-md-3 mb-3">
              Save
            </Button>
          </div>
        </Flex>
        <Row gutter={24}>
          <Col span="12">
            <Card title="Client Information">
              <Form.Item
                name="godown"
                label="Godown"
                rules={[
                  {
                    required: true,
                    message: 'Please select Godown!',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select Godown"
                  allowClear
                  showSearch
                >
                  <Option value="Ambawadi">Ambawadi</Option>
                  <Option value="Amraiwadi">Amraiwadi</Option>
                  <Option value="Asarwa">Asarwa</Option>
                  <Option value="Ashram Road">Ashram Road</Option>
                  <Option value="Aslali">Aslali</Option>
                  <Option value="Astodia">Astodia</Option>
                </Select>
              </Form.Item>
              <Form.Item name="hospitalName" label="Hospital Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Hospital Name!',
                  },
                ]}
              >
                <Input placeholder="Contact Person" />
              </Form.Item>
              <Form.Item name="contactPerson" label="Contact Person"
                rules={[
                  {
                    required: true,
                    message: 'Please input Contact Person!',
                  },
                ]}
              >
                <Input placeholder="Contact Person" />
              </Form.Item>
              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Contact Number!',
                  },
                ]}
              >
                <Input placeholder="Contact Number" />
              </Form.Item>

              <Form.Item name="referenceBy" label="Reference By">
                <Select
                  allowClear
                  options={[
                    {
                      value: 'boardmember',
                      label: `Board Member Name`,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item name="plan" label="Plan"
                rules={[
                  {
                    required: true,
                    message: 'Please select plan!',
                  },
                ]}
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: 'plan1',
                      label: `plan1 2500 Monthly Users (2) (plan ends at ${dayjs().add(1, 'month').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'plan2',
                      label: `plan2 3500 Quarterly Users (4) (plan ends at ${dayjs().add(3, 'month').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'plan3',
                      label: `plan3 4500 Half Yearly Users (5) (plan ends at ${dayjs().add(6, 'month').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'plan4',
                      label: `plan4 5500 Yearly Users (1) (plan ends at ${dayjs().add(12, 'month').format('DD-MMM-YYYY')})`,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="planDiscount"
                label="Plan Discount"
                rules={[
                  {
                    required: true,
                    message: 'Please input Plan Discount!',
                  },
                ]}
              >
                <Input placeholder="Plan Discount" />
              </Form.Item>

              <Form.Item
                name="filePrice"
                label="File Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input File Price!',
                  },
                ]}
              >
                <Input placeholder="File Price" />
              </Form.Item>

              <Form.Item
                name="fileRenewalPrice"
                label="File Renewal Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input File Renewal Price!',
                  },
                ]}
              >
                <Input placeholder="File Renewal Price" />
              </Form.Item>

              <Form.Item
                name="fileRetrivalPriceIn24Hours"
                label="File Retrival Price in 24 hours (Urgent)"
                rules={[
                  {
                    required: true,
                    message: 'Please input File Retrival Price in 24 hours!',
                  },
                ]}
              >
                <Input placeholder="File Retrival Price in 24 hours" />
              </Form.Item>

              <Form.Item
                name="fileRetrivalPriceIn72Hours"
                label="File Retrival Price in 72 hours (Regular)"
                rules={[
                  {
                    required: true,
                    message: 'Please input File Retrival Price in 72 hours!',
                  },
                ]}
              >
                <Input placeholder="File Retrival Price in 72 hours" />
              </Form.Item>

              <Form.Item name="fileExpire" label="File expiry"
                rules={[
                  {
                    required: true,
                    message: 'Please select File expiry!',
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: '1year',
                      label: `1 year (${dayjs().add(1, 'year').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: '2year',
                      label: `2 year (${dayjs().add(2, 'year').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: '3year',
                      label: `3 year (${dayjs().add(3, 'year').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: '4year',
                      label: `4 year (${dayjs().add(4, 'year').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: '5year',
                      label: `5 year (${dayjs().add(5, 'year').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'lifetime',
                      label: `Lifetime (~)`,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: 'Please input City!',
                  },
                ]}
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: 'Ahmedabad',
                      label: `Ahmedabad`,
                    },
                    {
                      value: 'Surat',
                      label: `Surat`,
                    },
                    {
                      value: 'Vadodara',
                      label: `Vadodara`,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true,
                    message: 'Please select State!',
                  },
                ]}
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: 'Gujarat',
                      label: `Gujarat`,
                    },
                    {
                      value: 'Maharashtra',
                      label: `Maharashtra`,
                    },
                    {
                      value: 'Uttar Pradesh',
                      label: `Uttar Pradesh`,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[
                  {
                    required: true,
                    message: 'Please select Pincode!',
                  },
                ]}
              >
                <Input placeholder="Pincode" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Address!',
                  },
                ]}
              >
                <Input.TextArea placeholder="Address" autosize={{ minRows: 1, maxRows: 1 }} />
              </Form.Item>

              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[
                  {
                    required: true,
                    message: 'Please choose payment method!',
                  },
                ]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value={1}>Online</Radio>
                    <Radio value={2}>
                      Cheque
                      <Input
                        placeholder="Paid Amount"
                        style={{
                          width: 150,
                          marginLeft: 10,
                        }}
                      />
                    </Radio>
                    <Radio value={3}>
                      Cash
                      <Input
                        placeholder="Paid Amount"
                        style={{
                          width: 150,
                          marginLeft: 10,
                        }}
                      />
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Col>
          <Col span="12">
            {/* <Card>
              <UserRights />
            </Card> */}
            <Card title="Email Configuration">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'Invalid email address!',
                  },
                  {
                    required: true,
                    message: 'Please input your email address!',
                  },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
              /* rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]} */
              >
                <Input.Password placeholder="Password" maxLength={100} />
              </Form.Item>

              <Form.Item
                name="smtpServer"
                label="SMTP Server"
                rules={[
                  {
                    required: true,
                    message: 'Please input the SMTP server address!',
                  },
                ]}
              >
                <Input placeholder="SMTP Server Address" />
              </Form.Item>

              <Form.Item
                name="portNumber"
                label="Port Number"
                rules={[
                  {
                    type: 'number',
                    message: 'Invalid port number!',
                  },
                  {
                    required: true,
                    message: 'Please input the port number!',
                  },
                ]}
              >
                <Input placeholder="Port Number" />
              </Form.Item>
            </Card>
            <Card title="File Upload">
              <Form.Item
                name="logoFile"
                label="Logo File"
                rules={[
                  {
                    required: true,
                    message: 'Please upload logo!',
                  },
                ]}
              >
                <Upload>
                  <Button>Click to Upload Logo</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="agreement"
                label="MOU / Agreement File"
                rules={[
                  {
                    required: true,
                    message: 'Please Upload MOU / Agreement File',
                  },
                ]}
              >
                <Upload>
                  <Button>Click to Upload MOU / Agreement</Button>
                </Upload>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form >
    </>
  );
};
export default UserList;