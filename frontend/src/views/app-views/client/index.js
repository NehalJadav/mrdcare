// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Tooltip, Form, Table, DatePicker, Button, Radio, Select, Input } from 'antd';
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

  const [list, setList] = useState([{
    godownName: "Ambawadi",
    hospitalName: "Apollo Hospitals City Centre",
    contactPerson: "Prathap C Reddy",
    contactNumber: "9898599895",
    referenceBy: "Apollo Hospitals",
  }]);
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
      dataIndex: 'godownName',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Hospital Name',
      dataIndex: 'hospitalName',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      align: 'center'
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      align: 'center'
    },
    {
      title: 'Reference By',
      dataIndex: 'referenceBy',
      align: 'center'
    },
    {
      title: 'Action',
      align: 'center',
      render: (__, result) => <>
        <Link to={`/client/edit/1111111111111`}>Edit</Link>
        <Button danger onClick={() => dowloadNumberReport()} >Delete</Button>
      </>
    },
  ];

  const options = [
    { label: 'Option A', value: 'a10' },
    { label: 'Option B', value: 'b11' },
    { label: 'Option C', value: 'c12' },
  ];

  useEffect(() => {
    onFinish(storeFormValue);
  }, [JSON.stringify(tableParams)]);

  return (
    <>
      <Flex justifyContent="space-between" mobileFlex={false}>
        <h2 className="font-weight-semibold">Clients</h2>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          initialValues={{ deletedStatus: "false", datePicker: [dayjs(), dayjs()] }}
        >
          <Flex className="mb-1" justifyContent="end" mobileFlex={false}>
            <Button className="mr-md-3 mb-3" disabled={list?.length == 0}>Delete</Button>
            <Button className="mr-md-3 mb-3" disabled={list?.length == 0}>Print</Button>
            <Button className="mr-md-3 mb-3" disabled={list?.length == 0}>Send Mail</Button>
            <Form.Item name="selectItem" label="Select Column" className="mr-md-3 mb-3">
              <Select
                mode="multiple"
                placeholder="Select Column"
                style={{
                  minWidth: '150px',
                }}
              >
                {options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Button className="mr-md-3 mb-3" disabled={list?.length == 0}>Download</Button>
          </Flex>
          <Flex className="mb-1" mobileFlex={false}>
            <Form.Item name="Name" label="Name" className="mr-md-3 mb-3">
              <Input placeholder={"Name"} />
            </Form.Item>
            <Form.Item name="datePicker" className="mr-md-3 mb-3">
              <RangePicker format="DD-MMMM-YYYY" disabledDate={(current) => current && current > dayjs().endOf('day')} />
            </Form.Item>
            <Form.Item
              name="referenceBy"
              label="Reference By"
              className="mr-md-3 mb-3"
            >
              <Select
                placeholder="Select Reference By"
                allowClear
                showSearch
              >
                <Option value="Devang Patel">Devang Patel</Option>
                <Option value="Raj Purohit">Raj Purohit</Option>
                <Option value="Rahul Patel">Rahul Patel</Option>
                <Option value="Jay Prajapati">Jay Prajapati</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="salesOfficer"
              label="Sales Office"
              className="mr-md-3 mb-3"
            >
              <Select
                placeholder="Select User Type"
                allowClear
                showSearch
              >
                <Option value="Devang Patel">Devang Patel</Option>
                <Option value="Raj Purohit">Raj Purohit</Option>
                <Option value="Rahul Patel">Rahul Patel</Option>
                <Option value="Jay Prajapati">Jay Prajapati</Option>
              </Select>
            </Form.Item>
            <div className="mr-md-3 mb-3">
              <Button type="primary" htmlType="submit" loading={submitLoading}>Search</Button>
            </div>
            <div className="mr-md-3 mb-3">
              <Link to="/client/add">
                <Button type="primary">Add Client</Button>
              </Link>
            </div>
          </Flex>

        </Form>
      </Flex>

      <div className="table-responsive">
        <Table
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