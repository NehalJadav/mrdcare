// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Modal, Form, Table, DatePicker, Button, message, Select, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import DocumentService from 'services/DocumentService';
import SearchBox from 'components/shared-components/SearchBox';
import { useSelector } from 'react-redux';
import Drawer from './drawer';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;

const UserList = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userId, setuserId] = useState();
  const [storeFormValue, setstoreFormValue] = useState();
  const [open, setOpen] = useState(false);

  const { role } = useSelector(state => state.auth.userData)
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 10 } });

  const onFinish = (values) => {
    setLoading(true);
    setSubmitLoading(true)
    let params = {
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize
    }
    DocumentService.fetch(params).then(function (result) {
      console.log(`🚀 ~ file: index.js:33 ~ result:`, result)
      setList(result.data)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.pagination.totalItems,
        },
      });
      setLoading(false);
      setSubmitLoading(false)
    }).catch(error => {
      console.log(`🚀 ~ file: manage.js:43 ~ dispatch ~ error:`, error)
    });
    /* if (values && values != 'undefined') {
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
      DocumentService.fetch(data).then(function (result) {
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
    } */
  };

  const dowloadDocument = (_id) => {
    DocumentService.show(_id).then(result => {
      console.log(`🚀 ~ file: manage.js:47 ~ DocumentService.create ~ result:`, result)

      const documentFile = result.documentFile[0]
      console.log(`🚀 ~ file: index.js:93 ~ DocumentService.show ~ documentFile:`, documentFile)
      // Decode the Base64 string
      const byteCharacters = atob(documentFile.content);

      // Convert the decoded string to a Uint8Array
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      // Create a Blob from the Uint8Array
      const blob = new Blob([byteArray], { type: documentFile.contentType });

      // Create a download link and trigger a click to download the file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = documentFile.name;
      link.click();
      message.success('Document Download Successfully');
    }).catch(error => {
      console.log(`🚀 ~ file: manage.js:43 ~ dispatch ~ error:`, error)
    });
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
    /* NumberService.generateNumberReport(data).then(function (result) {
      if (result.success) {
        window.open(window.env.REACT_APP_API_URL + '/' + result.data.fileName, "_blank");
      }
    }) */
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
      dataIndex: 'hospitalIPDNumber',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'DOC Type',
      dataIndex: 'documentType',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Name of Patient',
      dataIndex: 'patientName',
      align: 'center'
    },
    {
      title: 'Date of Admission',
      dataIndex: 'patientDateOfAdmission',
      align: 'center'
    },
    {
      title: 'Date of Discharge',
      dataIndex: 'patientDateOfDischarge',
      align: 'center'
    },
    {
      title: 'Address',
      dataIndex: 'patientAddress',
      align: 'center'
    },
    {
      title: 'Contact Number',
      dataIndex: 'patientContactNumber',
      align: 'center'
    },
    {
      title: 'Diagnosis',
      dataIndex: 'patientDiagnosis',
      align: 'center'
    },
    {
      title: 'History',
      dataIndex: 'patientHistory',
      align: 'center'
    },
    {
      title: 'Speciality',
      dataIndex: 'patientSpeciality',
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
        {["Super Admin", "Admin", "Scan Officer"].includes(role) ?
          <>
            <Button onClick={() => dowloadDocument(result._id)}>Download</Button>
            <Link to={`/document/edit/1111111111111`}>Edit</Link>
            <Button>Renew</Button>
            <Button danger onClick={() => dowloadNumberReport()} >Delete</Button>
          </>
          :
          ["MRD Officer"].includes(role) ?
            <Button onClick={() => dowloadDocument(result._id)}>Download</Button>
            :
            <span></span>
        }
      </>
    },
    {
      title: 'Correction History',
      align: 'center',
      render: (__, result) => <Drawer />
    },
  ];

  const options = [
    { label: 'Option A', value: 'a10' },
    { label: 'Option B', value: 'b11' },
    { label: 'Option C', value: 'c12' },
  ];

  useEffect(() => {
    onFinish(storeFormValue);
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  return (
    <>
      <Flex justifyContent="space-between" mobileFlex={false}>
        <h2 className="font-weight-semibold">Documents</h2>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          initialValues={{ deletedStatus: "false", datePicker: [dayjs(), dayjs()] }}
        >
          <Flex className="mb-1" justifyContent="end" mobileFlex={false}>
            <Button className="mr-md-3 mb-3">Correction Request</Button>
            <Button className="mr-md-3 mb-3">Payment</Button>
            <Button className="mr-md-3 mb-3">Delete</Button>
            <Button className="mr-md-3 mb-3">Print</Button>
            <Button className="mr-md-3 mb-3">Send Mail</Button>
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
            <div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="mr-md-3 mb-3">Filter
              </Button>
              <AdvanceFilterForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </div>
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
            {["Super Admin", "Admin", "Scan Officer"].includes(role) &&
              <div className="mr-md-3 mb-3">
                <Link to="/document/add">
                  <Button type="primary">Add Document</Button>
                </Link>
              </div>
            }
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

const AdvanceFilterForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Advance Filter"
      okText="Search"
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
          name="docBarcode"
          label="Doc Barcode"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ipdNo"
          label="IPD No"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="patientAddress"
          label="Patient Address"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="patientContact"
          label="Patient Contact"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="diagnosis"
          label="Diagnosis"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="patientHistory"
          label="Patient History"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="speciality"
          label="Speciality"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
        /* rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]} */
        >
          <Input />
        </Form.Item>
        <Form.Item name="datePicker" label="Date of Admission" className="mr-md-3 mb-3">
          <RangePicker format="DD-MMMM-YYYY" disabledDate={(current) => current && current > dayjs().endOf('day')} />
        </Form.Item>
        <Form.Item name="datePicker" label="Date of Discharge" className="mr-md-3 mb-3">
          <RangePicker format="DD-MMMM-YYYY" disabledDate={(current) => current && current > dayjs().endOf('day')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};