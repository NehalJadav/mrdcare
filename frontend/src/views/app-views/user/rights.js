import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Flex from "components/shared-components/Flex";
import { Table, Checkbox, Tag, Switch, Row, Input, Form, message, Radio, Button, Tooltip, List, Modal, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Search } = Input;
const { OptGroup, Option } = Select;
function CountryBaseCallingProvider({ showUserType = true }) {
  const adminData = useSelector(state => state.auth) // admin data
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [userRightsList, setUserRightsList] = useState([])
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 100, showSizeChanger: false } });

  const columns = [
    {
      title: 'User Rights Name',
      dataIndex: 'rightsName',
      key: 'rightsName',
      width: 250,
    },
    {
      title: 'Add',
      dataIndex: 'add',
      key: 'add',
      align: 'center',
      render: (value, row) => <Checkbox defaultChecked={value}></Checkbox>
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      align: 'center',
      render: (value, row) => <Checkbox defaultChecked={value}></Checkbox>
    },
    {
      title: 'Update',
      dataIndex: 'update',
      key: 'update',
      align: 'center',
      render: (value, row) => <Checkbox defaultChecked={value}></Checkbox>
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      align: 'center',
      render: (value, row) => <Checkbox defaultChecked={value}></Checkbox>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (value, row) => <Switch defaultChecked={value}></Switch>
    }
  ];

  const getCountryBaseData = (value) => {
    //setLoading(true)
    setUserRightsList([
      {
        rightsName: "Manage Document",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Correction Request",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Retrival Request",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Collection Payment",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Manage Client",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Manage Users",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Manage Plan",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Manage Reminders",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Manage Reports",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
      {
        rightsName: "Manage Godown",
        add: true,
        view: true,
        update: true,
        delete: true,
        status: true,
      },
    ]);
    /* CallingProviderService.getAllCallingProvider("country", value).then(function (result) {
  if (result.success) {
    setLoading(false);
  }
}); */
  }

  useEffect(() => {
    getCountryBaseData();
  }, []);
  return (
    <>
      <Flex justifyContent="space-between" mobileFlex={false}>
        <h2 className="font-weight-semibold">User Rights</h2>
        {showUserType && <Form.Item
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
            defaultValue="Super Admin"
          >
            <OptGroup label="Client Side Users">
              <Option value="Admin">Admin</Option>
              <Option value="MRD Officer">MRD Officer</Option>
            </OptGroup>
            <OptGroup label="Vender Side Users">
              <Option value="Super Admin">Super Admin</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Board Member">Board Member</Option>
              <Option value="Sales Officer">Sales Officer</Option>
              <Option value="Collection Officer">Collection Officer</Option>
              <Option value="Scan Officer">Scan Officer</Option>
            </OptGroup>
          </Select>
        </Form.Item>}
      </Flex>


      <div className="table-responsive">
        <Table
          columns={columns}
          loading={loading}
          dataSource={userRightsList}
          //pagination={tableParams.pagination}
          pagination={false}
          onChange={(pagination, filters, sorter) => setTableParams({ pagination, filters, ...sorter })}
          size="small"
          bordered
          rowKey={({ _id }) => _id}
        />
      </div>
    </>
  )
}

export default CountryBaseCallingProvider