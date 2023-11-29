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
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;
const UserList = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userId, setuserId] = useState();
  const [storeFormValue, setstoreFormValue] = useState();
  const { role } = useSelector(state => state.auth.userData)
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const [list, setList] = useState([
    {
      godownName: "Ambawadi",
      hospitalName: "Apollo Hospitals City Centre",
      contactPerson: "Prathap C Reddy",
      contactNumber: "9898599895",
      referenceBy: "Apollo Hospitals",
      paymentType: "Cash",
    },
    {
      godownName: "Ambawadi",
      hospitalName: "Apollo Hospitals City Centre",
      contactPerson: "Prathap C Reddy",
      contactNumber: "9898599895",
      referenceBy: "Apollo Hospitals",
      paymentType: "Cheque",
    },
    {
      godownName: "Ambawadi",
      hospitalName: "Apollo Hospitals City Centre",
      contactPerson: "Prathap C Reddy",
      contactNumber: "9898599895",
      referenceBy: "Apollo Hospitals",
      paymentType: "Online",
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
      title: 'REC ID',
      dataIndex: 'recId',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'IPD NO',
      dataIndex: 'ipdNo',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'DOC Type',
      dataIndex: 'docType',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Name of Patient',
      dataIndex: 'nameOfPatient',
      align: 'center'
    },
    {
      title: 'Date of Admission',
      dataIndex: 'dateOfAdmission',
      align: 'center'
    },
    {
      title: 'Date of Discharge',
      dataIndex: 'dateOfDischarge',
      align: 'center'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      align: 'center'
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      align: 'center'
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      align: 'center'
    },
    {
      title: 'History',
      dataIndex: 'history',
      align: 'center'
    },
    {
      title: 'Speciality',
      dataIndex: 'speciality',
      align: 'center'
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      align: 'center'
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
        {["Super Admin", "Admin"].includes(role) && ["Cash", "Cheque"].includes(result.paymentType) ? <>
          <Button>Accept</Button>
          <Button danger onClick={() => setOpen(true)} >Reject</Button>
        </>
          :
          "-"
        }
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
        <h2 className="font-weight-semibold">File Payments</h2>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          initialValues={{ deletedStatus: "false", datePicker: [dayjs(), dayjs()] }}
        >
          <Flex className="mb-1" justifyContent="end" mobileFlex={false}>
            <Button className="mr-md-3 mb-3">Payment</Button>
            <Button className="mr-md-3 mb-3">Delete</Button>
            <Button className="mr-md-3 mb-3">Print</Button>
            <Button className="mr-md-3 mb-3">Send Mail</Button>
            <Button className="mr-md-3 mb-3" disabled={list?.length == 0}>Download</Button>
          </Flex>
          <Flex className="mb-1" mobileFlex={false}>
            <Form.Item
              name="documentType"
              label="Document Type"
              className="mr-md-3 mb-3"
            >
              <Select
                placeholder="Select Document Type"
                allowClear
                showSearch
              >
                <Option value="Type1">Type1</Option>
                <Option value="Type2">Type2</Option>
                <Option value="Type3">Type3</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="godown"
              label="Godown"
              className="mr-md-3 mb-3"
            >
              <Select
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
            <Form.Item name="docName" label="Doc Name" className="mr-md-3 mb-3">
              <Input placeholder={"Doc Name"} />
            </Form.Item>
            <Form.Item name="patientName" label="Patient Name" className="mr-md-3 mb-3">
              <Input placeholder={"Patient Name"} />
            </Form.Item>
            <Form.Item name="contactNumber" label="Contact Number" className="mr-md-3 mb-3">
              <Input placeholder={"Contact Number"} />
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
      <RetrialRequest
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default UserList;

const RetrialRequest = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Request Data"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="reason"
          label="Reason (It will notify to client)"
          rules={[
            {
              required: true,
              message: 'Please input the reason!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};