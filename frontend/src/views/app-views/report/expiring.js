// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Modal, Form, Table, DatePicker, Button, Radio, Select, Input, Switch } from 'antd';
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
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const [list, setList] = useState([
    {
      key: 1,
      expiringDate: "01-Sep-2023",
      registrationDate: "01-Sep-2023",
      clientName: "Sahil Vyas",
      salesOfficer: "Jignesh Purohit",
      referenceBy: "abcd",
      amount: "1230",
    },
    {
      key: 2,
      expiringDate: "06-Sep-2023",
      registrationDate: "06-Sep-2023",
      clientName: "Sahil Vyas",
      salesOfficer: "Jignesh Purohit",
      referenceBy: "abcd",
      amount: "1230",
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
      title: 'Expiring',
      dataIndex: 'expiringDate',
      align: 'left',
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      align: 'center',
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      align: 'center'
    },
    {
      title: 'Sales Officer',
      dataIndex: 'salesOfficer',
      align: 'center'
    },
    {
      title: 'Ref By',
      dataIndex: 'referenceBy',
      align: 'center'
    },
    {
      title: 'Renewal Amount',
      dataIndex: 'amount',
      align: 'center'
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
        <h2 className="font-weight-semibold">Expiration Report</h2>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          initialValues={{ deletedStatus: "false", datePicker: [dayjs(), dayjs()] }}
        >
          <Flex className="mb-1" justifyContent="end" mobileFlex={false}>
            <Button className="mr-md-3 mb-3">Print</Button>
            <Button className="mr-md-3 mb-3">Send Mail</Button>
            <Button className="mr-md-3 mb-3" disabled={list?.length == 0}>Download</Button>
          </Flex>
          <Flex className="mb-1" mobileFlex={false}>
            <Form.Item name="datePicker" label="Date" className="mr-md-3 mb-3">
              <RangePicker format="DD-MMMM-YYYY" disabledDate={(current) => current && current > dayjs().endOf('day')} />
            </Form.Item>
            <Form.Item name="clientName" label="Client Name" className="mr-md-3 mb-3">
              <Input placeholder={"Client Name"} />
            </Form.Item>
            <Form.Item name="collectionOfficer" label="Collection Officer" className="mr-md-3 mb-3">
              <Input placeholder={"Collection Officer"} />
            </Form.Item>
            <Form.Item name="referenceBy" label="Reference By" className="mr-md-3 mb-3">
              <Input placeholder={"Reference By"} />
            </Form.Item>
            <div className="mr-md-3 mb-3">
              <Button type="primary" htmlType="submit" loading={submitLoading}>Search</Button>
            </div>
            {/* <div className="mr-md-3 mb-3">
              <Link to="/document/add">
                <Button type="primary">Add Document</Button>
              </Link>
            </div> */}
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