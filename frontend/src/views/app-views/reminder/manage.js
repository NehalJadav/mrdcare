// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Upload, Form, Card, DatePicker, Button, Input, Select, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberService from 'services/NumberService';
import SearchBox from 'components/shared-components/SearchBox';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;

const ReminderManage = () => {
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
          <h3>Reminder</h3>
          <div>
            <Link to="/reminder/list" className="mr-md-3 mb-3">
              <Button type="primary">View Reminders</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="mr-md-3 mb-3">
              Save
            </Button>
          </div>
        </Flex>
        <Row gutter={24}>
          <Col span="12">
            <Card title="Super Admin Notification">
              <Form.Item
                name="reminderName"
                label="Reminder Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Reminder Name!',
                  },
                ]}
              >
                <Input placeholder="Reminder Name" />
              </Form.Item>
              <Form.Item
                name="startDate"
                label="Start Date"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="End Date"
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="file"
                label="File"
                rules={[
                  {
                    required: true,
                    message: 'Please upload file!',
                  },
                ]}
              >
                <Upload>
                  <Button>Click to Upload File</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="remark"
                label="Remark"
                rules={[
                  {
                    required: true,
                    message: 'Please input Remark!',
                  },
                ]}
              >
                <Input.TextArea placeholder="Remark" autosize={{ minRows: 1, maxRows: 1 }} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form >
    </>
  );
};
export default ReminderManage;