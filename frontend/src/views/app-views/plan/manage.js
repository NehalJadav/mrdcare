// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import dayjs from "dayjs";
import { Tooltip, Form, Card, DatePicker, Button, Input, Select, Row, Col, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberService from 'services/NumberService';
import SearchBox from 'components/shared-components/SearchBox';

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
          <h3>Create Plan</h3>
          <div>
            <Link to="/plan/list" className="mr-md-3 mb-3">
              <Button type="primary">View Plans</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="mr-md-3 mb-3">
              Save
            </Button>
          </div>
        </Flex>
        <Row gutter={24}>
          <Col span="12">
            <Card title="Plan Data">
              <Form.Item name="planName" label="Plan Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Plan Name!',
                  },
                ]}
              >
                <Input placeholder="Contact Person" />
              </Form.Item>
              <Form.Item name="days" label="Days"
                rules={[
                  {
                    required: true,
                    message: 'Please input Days!',
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: 'monthly',
                      label: `Monthly (plan ends at ${dayjs().add(1, 'month').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'quarterly',
                      label: `Quarterly (plan ends at ${dayjs().add(3, 'month').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'halfYearly',
                      label: `Half Yearly (plan ends at ${dayjs().add(6, 'month').format('DD-MMM-YYYY')})`,
                    },
                    {
                      value: 'yearly',
                      label: `Yearly (plan ends at ${dayjs().add(12, 'month').format('DD-MMM-YYYY')})`,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="users" label="No. of Users"
                rules={[
                  {
                    required: true,
                    message: 'Please input No. of Users!',
                  },
                ]}
              >
                <Input placeholder="No. of Users" />
              </Form.Item>
              <Form.Item
                name="remark"
                label="Remark"
              >
                <Input.TextArea placeholder="Remark" autosize={{ minRows: 1, maxRows: 1 }} />
              </Form.Item>
            </Card>
          </Col>
          <Col span="12">
            {/* <Card>
              <UserRights />
            </Card> */}
            <Card title="Plan Pricing">
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Contact Number!',
                  },
                ]}
              >
                <Input placeholder="Contact Number" />
              </Form.Item>
              <Form.Item
                name="discount"
                label="Discount"
              >
                <Input placeholder="Contact Number" />
              </Form.Item>
              <Form.Item
                name="sgst"
                label="SGST Amount"
              >
                <Input placeholder="SGST Amount" />
              </Form.Item>
              <Form.Item
                name="cgst"
                label="CGST Amount"
              >
                <Input placeholder="CGST Amount" />
              </Form.Item>
              <Form.Item
                name="igst"
                label="IGST Amount"
              >
                <Input placeholder="IGST Amount" />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form >
    </>
  );
};
export default UserList;