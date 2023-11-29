import React, { useState, useEffect } from "react";
import { Form, Table, Button, Radio, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import _debounce from 'lodash/debounce';
import Flex from "components/shared-components/Flex";
import InvoiceService from "services/InvoiceService";
import SearchInputBox from 'components/shared-components/SearchInputBox';
const AddressVerification = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtterData, setfiltterData] = useState();
  const [searchdata, setsearchValue] = useState();
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 50 } });

  const filterCustomer = e => {
    let values = e.target.value
    setLoading(true);
    var filterBy = {};
    setfiltterData(values && values)
    filterBy.filterBy = values ? values : '';
    values = filterBy;
    values.userId = searchdata;
    InvoiceService.getInvoiceList(values).then(function (result) {
      if (result.success) {
        setList(result.data);
      }
      setLoading(false);
    });
  };

  const searchData = (invoiceList, userId) => {
    setsearchValue(userId)
    setList(invoiceList)
  };

  function pdfDownload(email, invoiceId) {
    setLoading(true);
    var downloadData = {};
    downloadData.email = email;
    downloadData.invoiceId = invoiceId;
    InvoiceService.invoiceDownload(downloadData).then(function (result) {
      if (result.success) {
        window.open(result.data);
      }
      setLoading(false);
    });
  };

  const tableColumns = [
    {
      title: "No",
      dataIndex: "no",
      width: 50,
      align: 'center',
      render: (__, record, index) => (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
      align: 'center',
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceId",
      width: 200,
      align: 'center',
    },
    {
      title: "Invoice Status",
      dataIndex: "status",
      width: 150,
      render: (__, record) => record.status === "not_paid" || record.status === "payment_due" ? 'Pending' : 'Paid'
    },
    {
      title: "Invoice Amount",
      dataIndex: "sub_total",
      width: 200,
      align: 'center',
      render: (__, record) => record.status === "paid" ? record.sub_total : record.amountDue
    },
    {
      title: 'Invoice Date',
      dataIndex: 'date',
      width: 200,
      align: 'center',
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 200,
      align: 'center',
      render(__, record, index) {
        let content = "-";
        return content = <Space size="middle">
          <Button type="primary" icon={<DownloadOutlined />} onClick={() => { pdfDownload(record.email, record.invoiceId) }} />
        </Space>
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    var filterBy = {};
    setfiltterData('pending')
    filterBy.filterBy = 'pending';
    let values = filterBy;
    InvoiceService.getInvoiceList(values).then(function (result) {
      if (result.success) {
        setLoading(false);
        setList(result.data);
      }
    });
  }, []);

  return (
    <>
      <Flex justifyContent="space-between" mobileFlex={false}>
        <h2 className="font-weight-semibold">Invoice List</h2>
        <Form.Item name="parentId" className="mr-md-3 mb-3">
          <SearchInputBox func={searchData} filtterValue={filtterData} />
        </Form.Item>
        <Form.Item
          label="Filter Documents By"
          className="mb-3"
        >
          <Radio.Group onChange={filterCustomer} defaultValue="pending" buttonStyle="solid">
            <Radio.Button value="pending" >Pending</Radio.Button>
            <Radio.Button value="paid">Paid</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          loading={loading}
          pagination={tableParams.pagination}
          onChange={(pagination, filters, sorter) => setTableParams({ pagination, filters, ...sorter })}
          rowKey="_id"
          scroll={{ x: "100%" }}
          size="middle"
          bordered
        />
      </div>
    </>
  );
};

export default AddressVerification;