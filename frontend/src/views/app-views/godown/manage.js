// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Space, Form, Card, DatePicker, Button, Input, Select, Row, Col, message, Table } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberService from 'services/NumberService';
import SearchBox from 'components/shared-components/SearchBox';
import dayjs from 'dayjs';
import Rack from './rack';

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
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Gota',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const tableColumns = [
    {
      title: "No.",
      width: 60,
      align: 'center',
      fixed: 'left',
      render: (__, record, index) => (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
    },
    {
      title: 'Rack No',
      dataIndex: 'name',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      align: 'left',
      fixed: 'left',
    },
    /* {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (__, result) => <Switch defaultChecked={true} />
    },
    {
      title: 'Action',
      align: 'center',
      render: (__, result) => <>
        <Link to={`/godown/edit/1111111111111`}>Edit</Link>
        <Button danger onClick={() => dowloadNumberReport()} >Delete</Button>
      </>
    }, */
  ];
  return (
    <>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{}}
      >
        <Flex justifyContent="space-between" mobileFlex={false}>
          <h3>Godown</h3>
          <div>
            <Link to="/godown/list" className="mr-md-3 mb-3">
              <Button type="primary">View Godown</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="mr-md-3 mb-3">
              Save
            </Button>
          </div>
        </Flex>
        <Row gutter={24}>
          <Col span="12">
            <Card title="Godown Configuration">
              <Form.Item
                name="godownName"
                label="Godown Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Godown Name!',
                  },
                ]}
              >
                <Input placeholder="Godown Name" />
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: 'Please input Location!',
                  },
                ]}
              >
                <Input placeholder="Location" />
              </Form.Item>
              <Space.Compact>
                <Input addonBefore="Racks" />
                <Input addonBefore="Docks" />
                <Input addonBefore="Shelves" />
                <Input addonBefore="Bins" />
              </Space.Compact>
              <Space.Compact>
                <Input addonBefore="Pallets" />
                <Input addonBefore="Sections" />
                <Input addonBefore="Aisles" />
                <Button type="primary">Submit</Button>
              </Space.Compact>
              https://gocodes.com/warehouse-labeling-steps/
            </Card>
          </Col>
          <Col span="12">
            <Rack />
          </Col>
        </Row>
      </Form >
    </>
  );
};
export default UserList;