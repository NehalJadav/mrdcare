// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Tooltip, Form, Card, DatePicker, Button, Input, Select, Row, Col, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberService from 'services/NumberService';
import SearchBox from 'components/shared-components/SearchBox';
import dayjs from 'dayjs';
import UserRights from './rights';
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
          <h3>User Registration</h3>
          <div>
            <Link to="/user/list" className="mr-md-3 mb-3">
              <Button type="primary">View Users</Button>
            </Link>
            <Button type="primary" className="mr-md-3 mb-3" htmlType="submit" loading={submitLoading}>
              Save
            </Button>
          </div>
        </Flex>
        <Row gutter={24}>
          <Col span="8">
            <Card title="User Information">
              <Row gutter={12}>
                <Col span="24"></Col>
                <Col span="24"></Col>
                <Col span="24"></Col>
                <Col span="24"></Col>
              </Row>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please select Hospital Name!',
                  },
                ]}
                name="userType"
                label="User Type"
                className="mr-md-3 mb-3"
              >
                <Select
                  placeholder="Select User Type"
                  style={{ minWidth: "150px" }}
                >
                  <OptGroup label="Client Side Users">
                    <Option value="Client Admin">Admin</Option>
                    <Option value="MRD Officer">MRD Officer</Option>
                  </OptGroup>
                  <OptGroup label="Vender Side Users">
                    <Option value="Super Admin">Super Admin</Option>
                    <Option value="Admin">Admin</Option>
                    <Option value="Board Member">Board Member</Option>
                    <Option value="Sales Officer">Sales Officer</Option>
                    <Option value="Scan Officer">Scan Officer</Option>
                    <Option value="Collection Officer">Collection Officer</Option>
                  </OptGroup>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.userType !== currentValues.userType}
              >
                {({ getFieldValue }) =>
                  ["Client Admin", "MRD Officer"].includes(getFieldValue('userType')) ? (
                    <Form.Item
                      name="hospitalName"
                      label="Client Hospital"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Hospital Name!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Hospital"
                        allowClear
                        showSearch
                      >
                        <Option value="Divine Hospital" disabled>Divine Hospital <br /> users remaining 0</Option>
                        <Option value="Aayat Children Hospital">Aayat Children Hospital <br /> users remaining 5</Option>
                        <Option value="Pragati Women's Hospital & Maternity HOME">Pragati Women's Hospital & Maternity HOME <br /> users remaining 5</Option>
                        <Option value="Dev Art Ivf And Shachi Womens Hospital">Dev Art Ivf And Shachi Womens Hospital <br /> users remaining 5</Option>
                        <Option value="Astha Hospital">Astha Hospital <br /> users remaining 5</Option>
                        <Option value="Cure Spects Eye Care Laser Pvt Ltd">Cure Spects Eye Care Laser Pvt Ltd <br /> users remaining 5</Option>
                      </Select>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item name="firstName" label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input First Name!',
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item name="lastName" label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Last Name!',
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="emailPassword"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your contact number!',
                  },
                ]}
              >
                <Input placeholder="Contact Number" />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.userType !== currentValues.userType}
              >
                {({ getFieldValue }) =>
                  ["Collection Officer"].includes(getFieldValue('userType')) ? (
                    <Form.Item
                      name="stampAndSignature"
                      label="Stamp and Signature"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Hospital Name!',
                        },
                      ]}
                    >
                      <Upload>
                        <Button>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.userType !== currentValues.userType}
              >
                {({ getFieldValue }) =>
                  ["Scan Officer"].includes(getFieldValue('userType')) ? (
                    <Form.Item
                      name="godown"
                      label="Select Godown"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Select Godown!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Godown"
                        allowClear
                        showSearch
                      >
                        <Option value="Ambawadi">Ambawadi</Option>
                        <Option value="Gota">Gota</Option>
                        <Option value="Ghodasar">Ghodasar</Option>
                      </Select>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </Card>
          </Col>
          <Col span="16">
            <Card>
              <UserRights showUserType={false} />
            </Card>
            {/*  <Card title="Email Configuration">
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
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
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
            </Card> */}
          </Col>
        </Row>
      </Form >
    </>
  );
};
export default UserList;