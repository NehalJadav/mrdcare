// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Modal, Input, Form, Table, DatePicker, Button, Tabs, Select } from 'antd';
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
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('1');
  const { role } = useSelector(state => state.auth.userData)
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const [list, setList] = useState([{
    recId: "8521",
    docType: "Hospital Name",
    nameOfPatient: "Ajay Adani",
    dateOfAdmission: "01-Oct-2023",
    dateOfDischarge: "01-Oct-2023",
    speciality: "asdddasd",
    assignOfficer: "Vivek Patel",
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

  const tableColumnsPendingRequest = [
    {
      title: "No.",
      width: 60,
      align: 'center',
      fixed: 'left',
      render: (__, record, index) => (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
    },
    {
      title: 'Rec ID',
      dataIndex: 'recId',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Doc Type',
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
      title: 'Speciality',
      dataIndex: 'speciality',
      align: 'center'
    },
    {
      title: 'Assign Officer',
      dataIndex: 'assignOfficer',
      align: 'center'
    },
    {
      title: 'Action',
      align: 'center',
      render: (__, result) => <>
        <Button type="primary" onClick={() => { setOpen(true); }} >Accept</Button>
      </>
    },
  ];
  const tableColumnsAcceptedRequest = [
    {
      title: "No.",
      width: 60,
      align: 'center',
      fixed: 'left',
      render: (__, record, index) => (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
    },
    {
      title: 'Rec ID',
      dataIndex: 'recId',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Doc Type',
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
      title: 'Speciality',
      dataIndex: 'speciality',
      align: 'center'
    },
    {
      title: 'Assign Officer',
      dataIndex: 'assignOfficer',
      align: 'center'
    },
    {
      title: 'Action',
      align: 'center',
      render: (__, result) => <>
        <Button type="primary" onClick={() => { setOpen(true); }} >Change to Pending</Button>
        {["Scan Officer"].includes(role) ?
          <Button type="primary" onClick={() => { setOpen(true); }} >Notify to Collection Officer</Button>
          :
          <Button type="primary" onClick={() => { setOpen(true); }} >Resolve & Send Invoice</Button>
        }
      </>
    },
  ];
  const tableColumnsCollectedRequest = [
    {
      title: "No.",
      width: 60,
      align: 'center',
      fixed: 'left',
      render: (__, record, index) => (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
    },
    {
      title: 'Rec ID',
      dataIndex: 'recId',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Doc Type',
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
      title: 'Speciality',
      dataIndex: 'speciality',
      align: 'center'
    },
    {
      title: 'Assign Officer',
      dataIndex: 'assignOfficer',
      align: 'center'
    },
  ];
  const tableColumnsDeliveredRequest = [
    {
      title: "No.",
      width: 60,
      align: 'center',
      fixed: 'left',
      render: (__, record, index) => (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
    },
    {
      title: 'Rec ID',
      dataIndex: 'recId',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Doc Type',
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
      title: 'Speciality',
      dataIndex: 'speciality',
      align: 'center'
    },
    {
      title: 'Assign Officer',
      dataIndex: 'assignOfficer',
      align: 'center'
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


  const tabIteamsScanOfficer = [
    {
      key: 'pending',
      label: 'Pending Request or Expired File',
      children:
        <>
          <div className="table-responsive">
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={tableColumnsPendingRequest}
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
        </>,
    },
    {
      key: 'accepted',
      label: 'Accepted Request',
      children:
        <>
          <div className="table-responsive">
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={tableColumnsAcceptedRequest}
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
        </>,
    },
    {
      key: 'collected',
      label: 'Collected Request',
      children:
        <>
          <div className="table-responsive">
            <Table
              columns={["Scan Officer"].includes(role) ? tableColumnsCollectedRequest : tableColumnsDeliveredRequest}
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
        </>,
    },
  ]

  const tabIteamsCollectionOfficer = [
    {
      key: 'pending',
      label: 'Pending Request',
      children:
        <>
          <div className="table-responsive">
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={tableColumnsPendingRequest}
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
        </>,
    },
    {
      key: 'accepted',
      label: 'Accepted Request',
      children:
        <>
          <div className="table-responsive">
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={tableColumnsAcceptedRequest}
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
        </>,
    },
    {
      key: 'delivered',
      label: 'Delivered Request',
      children:
        <>
          <div className="table-responsive">
            <Table
              columns={["Scan Officer"].includes(role) ? tableColumnsCollectedRequest : tableColumnsDeliveredRequest}
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
        </>,
    },
  ]

  const onChangeTab = tab => {
    setTab(tab)
  }

  useEffect(() => {
    onFinish(storeFormValue);
  }, [JSON.stringify(tableParams)]);

  return (
    <>
      <Flex justifyContent="space-between" mobileFlex={false}>
        <h2 className="font-weight-semibold">Retrival</h2>
        {["Collection Officer"].includes(role) &&
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
            initialValues={{ deletedStatus: "false", datePicker: [dayjs(), dayjs()] }}
          >
            <Flex className="mb-1" mobileFlex={false}>
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
            </Flex>
          </Form>
        }
      </Flex>

      <Tabs onChange={onChangeTab} tabBarExtraContent={<>
        {["Scan Officer"].includes(role) && <>
          {tab == "pending" ?
            <Button className="mr-md-3 mb-3" onClick={() => { setOpen(true); }}>Accept</Button>
            :
            tab == "accepted" &&
            <>
              <Button className="mr-md-3 mb-3" onClick={() => { setOpen(true); }}>Change to Pending</Button>
              <Button className="mr-md-3 mb-3" onClick={() => { setOpen(true); }}>Notify to Collection Officer</Button>
            </>
          }
        </>}
        {["Collection Officer"].includes(role) && <>
          {tab == "pending" ?
            <Button className="mr-md-3 mb-3" onClick={() => { setOpen(true); }}>Accept</Button>
            :
            tab == "accepted" &&
            <>
              <Button className="mr-md-3 mb-3" onClick={() => { setOpen(true); }}>Change to Pending</Button>
              <Button className="mr-md-3 mb-3" onClick={() => { setOpen(true); }}>Resolve & Send Invoice</Button>
            </>
          }
        </>}
      </>} items={["Scan Officer"].includes(role) ? tabIteamsScanOfficer : tabIteamsCollectionOfficer} />
    </>
  );
};
export default UserList;

const RetrialRequest = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Are you sure?"
      okText="Yes"
      cancelText="No"
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
      {/* <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="collectionOfficer"
          label="Collection Officer"
          rules={[
            {
              required: true,
              message: 'Please input Collection Officer!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="remark"
          label="Remark"
          rules={[
            {
              required: true,
              message: 'Please input the remark!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form> */}
    </Modal>
  );
};