// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Tooltip, Form, Table, DatePicker, Button, Radio, Select, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberService from 'services/NumberService';
import RackDrawer from './drawer';
import SearchBox from 'components/shared-components/SearchBox';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;
const UserList = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userId, setuserId] = useState();
  const [storeFormValue, setstoreFormValue] = useState();

  const [list, setList] = useState([
    {
      _id: 1,
      name: "Ambawadi",
      location: "No, Sarita Complex, 6, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009",
      capacity: "200 out of 500",
    },
    {
      _id: 2,
      name: "Gota",
      location: "No, Sarita Complex, 6, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009",
      capacity: "200 out of 500",
    },
    {
      _id: 3,
      name: "Ghodasar",
      location: "No, Sarita Complex, 6, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009",
      capacity: "200 out of 500",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 50 } });

  const onFinish = (values) => {
    setLoading(true);
    setSubmitLoading(true)
    if (values && values != 'undefined') {
      setstoreFormValue(values)
      const startDate = values.datePicker ? dayjs(values.datePicker[0]).format("DD-MMMM-YYYY 00:00:00") : dayjs(new Date()).format("DD-MMMM-YYYY 00:00:00");
      const endDate = values.datePicker ? dayjs(values.datePicker[1]).format("DD-MMMM-YYYY 23:59:59") : dayjs(new Date()).format("DD-MMMM-YYYY 23:59:59");
      let data = {
        startDate,
        endDate,
        search: userId || "undefined",
        deletedStatus: values.deletedStatus,
        search: userId,
        skip: tableParams.pagination.current - 1,
        limit: tableParams.pagination.pageSize
      }
      NumberService.getNumber(data).then(function (result) {
        if (result.success) {
          setList(result.data)
          setLoading(false);
          setSubmitLoading(false)
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: result.countData,
            },
          });
        }
      })
    } else {
      setLoading(false);
      setSubmitLoading(false)
    }
  };

  const searchData = (userId) => {
    if (userId) {
      setuserId(userId)
    } else {
      setuserId()
      setList([]);
    }
  };

  const dowloadNumberReport = async () => {
    const formData = await form.validateFields();
    const startDate = formData.datePicker ? dayjs(formData.datePicker[0]).format("DD-MMMM-YYYY 00:00:00") : dayjs(new Date()).format("DD-MMMM-YYYY 00:00:00");
    const endDate = formData.datePicker ? dayjs(formData.datePicker[1]).format("DD-MMMM-YYYY 23:59:59") : dayjs(new Date()).format("DD-MMMM-YYYY 23:59:59");
    let data = {
      startDate,
      endDate,
      search: userId || "undefined"
    }
    NumberService.generateNumberReport(data).then(function (result) {
      if (result.success) {
        window.open(window.env.REACT_APP_API_URL + '/' + result.data.fileName, "_blank");
      }
    })
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
      title: 'Godown Name',
      dataIndex: 'name',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      align: 'center',
      render: (capacity, result) => <>{capacity}<RackDrawer type="primary">View details</RackDrawer></>
    },
    {
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
    },
  ];

  const options = [
    { label: 'Option A', value: 'a10' },
    { label: 'Option B', value: 'b11' },
    { label: 'Option C', value: 'c12' },
  ];

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

  useEffect(() => {
    onFinish(storeFormValue);
  }, [JSON.stringify(tableParams)]);

  return (
    <>
      <Flex justifyContent="space-between" mobileFlex={false}>
        <h2 className="font-weight-semibold">Godowns</h2>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          initialValues={{ deletedStatus: "false", datePicker: [dayjs(), dayjs()] }}
        >
          <Flex className="mb-1" mobileFlex={false}>
            <Form.Item name="godownName" label="Godown Name" className="mr-md-3 mb-3">
              <Input placeholder={"Godown Name"} />
            </Form.Item>
            <div className="mr-md-3 mb-3">
              <Button type="primary" htmlType="submit" loading={submitLoading}>Search</Button>
            </div>
            <div className="mr-md-3 mb-3">
              <Link to="/godown/add">
                <Button type="primary">Add Godown</Button>
              </Link>
            </div>
          </Flex>

        </Form>
      </Flex>

      <div className="table-responsive">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={tableColumns}
          dataSource={list}
          loading={loading}
          pagination={tableParams.pagination}
          onChange={(pagination, filters, sorter) => setTableParams({ pagination, filters, ...sorter })}
          rowKey="_id"
          //scroll={{ x: "2500px", y: "58vh" }}
          size="small"
          bordered
        />
      </div>
    </>
  );
};
export default UserList;