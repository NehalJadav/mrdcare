// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_DD_MM_HH_mm } from "constants/DateConstant";
import { Upload, Form, Card, DatePicker, Button, Input, Select, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import DocumentService from 'services/DocumentService';
import SearchBox from 'components/shared-components/SearchBox';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;

const UserList = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userId, setuserId] = useState();
  const [fileList, setFileList] = useState([]);
  const [storeFormValue, setstoreFormValue] = useState();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 50 } });
  const { role } = useSelector(state => state.auth.userData)
  const onFinish = () => {
    setLoading(true);
    setSubmitLoading(true)
    form.validateFields().then((values) => {
      let tempValues = { ...values }
      delete tempValues.documentFile
      const formData = new FormData();
      Object.entries(tempValues).forEach(([key, value]) => {
        formData.append(key, value)
      });
      fileList.forEach((file) => {
        formData.append('documentFile', file);
      });
      console.log(`🚀 ~ file: manage.js:39 ~ fileList.forEach ~ fileList:`, fileList)
      DocumentService.create(formData).then(result => {
        /* console.log(`🚀 ~ file: manage.js:47 ~ DocumentService.create ~ result:`, result)


        // Decode the Base64 string
        const byteCharacters = atob(result.data);

        // Convert the decoded string to a Uint8Array
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([byteArray], { type: result.contentType });

        // Create a download link and trigger a click to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = result.name;
        link.click(); */
        /* const file = new File([blob], result.name, { type: result.contentType });
        setFileList([file]); */
        message.success('Document Saved');
        //form.resetFields()
      }).catch(error => {
        console.log(`🚀 ~ file: manage.js:43 ~ dispatch ~ error:`, error)
      });
      setLoading(false);
      setSubmitLoading(false)
    }).catch(info => {
      console.log('Validate Failed:', info);
      setLoading(false);
      setSubmitLoading(false)
    });
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Some of field missed to fill")
    console.log('Failed:', errorInfo);
  };

  const fileProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      const isLt100M = file.size / 1024 / 1024 < 100;

      if (!isPDF) {
        message.error('You can only upload PDF files!');
        return Upload.LIST_IGNORE;
      } else if (!isLt100M) {
        message.error('File must be smaller than 100MB!');
        return Upload.LIST_IGNORE;
      } else {
        setFileList([file]);
      }
      return false;
    },
    fileList,
    maxCount: 1,
    accept: ".pdf"
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          hospitalName: "Divine Hospital",
          documentType: "Type 1",
          documentName: "Doc For Divine",
          documentBarcode: "1321223321212",
          hospitalIPDNumber: "854",
          patientName: "Tarang Oza",
          patientContactNumber: "Tarang Oza",
          patientDiagnosis: "knee replacement",
          patientHistory: "First time",
          patientSpeciality: "No speciality",
          patientDateOfAdmission: dayjs("23-09-2023", "DD-MM-YYYY"),
          patientDateOfDischarge: dayjs("28-09-2023", "DD-MM-YYYY"),
          patientAddress: "Prahladnagar",
          godownName: "Ambawadi",
          godownRackNumber: "AABBCC22",
          godownLocation: "No, Sarita Complex, 6, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009",
        }}
      >
        <Flex justifyContent="space-between" mobileFlex={false}>
          <h3>Document</h3>
          <div>
            <Link to="/document/list" className="mr-md-3 mb-3">
              <Button type="primary">View Documents</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="mr-md-3 mb-3">
              Save
            </Button>
          </div>
        </Flex>
        <Row gutter={24}>
          <Col span="12">
            <Card title="Document Information">
              <Form.Item
                name="hospitalName"
                label="Select Hospital"
                rules={[
                  {
                    required: true,
                    message: 'Please Select Hospital!',
                  },
                ]}
              >
                <Select
                  placeholder="Select Hospital"
                  allowClear
                  showSearch
                >
                  <Option value="Divine Hospital">Divine Hospital</Option>
                  <Option value="Aayat Children Hospital">Aayat Children Hospital</Option>
                  <Option value="Pragati Women's Hospital & Maternity HOME">Pragati Women's Hospital & Maternity HOME</Option>
                  <Option value="Dev Art Ivf And Shachi Womens Hospital">Dev Art Ivf And Shachi Womens Hospital</Option>
                  <Option value="Astha Hospital">Astha Hospital</Option>
                  <Option value="Cure Spects Eye Care Laser Pvt Ltd">Cure Spects Eye Care Laser Pvt Ltd</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="documentType"
                label="Document Type"
                rules={[
                  {
                    required: true,
                    message: 'Please select Document Type!',
                  },
                ]}
              >
                <Select
                  placeholder="Document Type"
                  allowClear
                  showSearch
                >
                  <Option value="Type 1">Type 1</Option>
                  <Option value="Type 2">Type 2</Option>
                  <Option value="Type 3">Type 3</Option>
                </Select>
              </Form.Item>
              <Form.Item name="documentName" label="Document Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Document Name!',
                  },
                ]}
              >
                <Input placeholder="Document Name" />
              </Form.Item>
              <Form.Item name="documentBarcode" label="Document Barcode"
                rules={[
                  {
                    required: true,
                    message: 'Please input Document Barcode!',
                  },
                ]}
              >
                <Input placeholder="Document Barcode" />
              </Form.Item>
              <Form.Item
                name="hospitalIPDNumber"
                label="IPD Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input IPD Number!',
                  },
                ]}
              >
                <Input placeholder="IPD Number" />
              </Form.Item>
            </Card>
          </Col>
          <Col span="12">
            <Card title="Patient Information">
              <Form.Item
                name="patientName"
                label="Patient Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Patient Name!',
                  },
                ]}
              >
                <Input placeholder="Patient Name" />
              </Form.Item>
              <Form.Item
                name="patientContactNumber"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input Contact Number!',
                  },
                ]}
              >
                <Input placeholder="Contact Number" />
              </Form.Item>
              <Form.Item
                name="patientDiagnosis"
                label="Diagnosis"
                rules={[
                  {
                    required: true,
                    message: 'Please input Diagnosis!',
                  },
                ]}
              >
                <Input placeholder="Diagnosis" />
              </Form.Item>
              <Form.Item
                name="patientHistory"
                label="Patient History"
                rules={[
                  {
                    required: true,
                    message: 'Please input Patient History!',
                  },
                ]}
              >
                <Input placeholder="Patient History" />
              </Form.Item>
              <Form.Item
                name="patientSpeciality"
                label="Speciality"
                rules={[
                  {
                    required: true,
                    message: 'Please input Speciality!',
                  },
                ]}
              >
                <Input placeholder="Speciality" />
              </Form.Item>
              <Form.Item
                name="patientDateOfAdmission"
                label="Date of Admission"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="patientDateOfDischarge"
                label="Date of Discharge"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="patientAddress"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input Address!',
                  },
                ]}
              >
                <Input.TextArea placeholder="Address" autosize={{ minRows: 1, maxRows: 1 }} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span="12">
            <Card title="Godown Configuration">
              <Form.Item
                name="godownName"
                label="Select Godown"
                rules={[
                  {
                    required: true,
                    message: 'Please select Godown!',
                  },
                ]}
              >
                <Select
                  placeholder="Select Godown"
                  allowClear
                  showSearch
                  disabled={!["Super Admin", "Admin"].includes(role)}
                >
                  <Option value="Ambawadi">Ambawadi</Option>
                  <Option value="Amraiwadi">Amraiwadi</Option>
                  <Option value="Asarwa">Asarwa</Option>
                  <Option value="Ashram Road">Ashram Road</Option>
                  <Option value="Aslali">Aslali</Option>
                  <Option value="Astodia">Astodia</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="godownRackNumber"
                label="Rack Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input Rack Number!',
                  },
                ]}
              >
                <Input placeholder="Rack Number" disabled={!["Super Admin", "Admin"].includes(role)} />
              </Form.Item>

              <Form.Item
                name="godownLocation"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: 'Please input Location!',
                  },
                ]}
              >
                <Input placeholder="Location" disabled={!["Super Admin", "Admin"].includes(role)} />
              </Form.Item>

              <Form.Item
                name="documentFile"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: 'Please upload a file',
                  },
                ]}>
                <Upload.Dragger {...fileProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag a PDF file to this area to upload (Max size: 100 MB)</p>
                  <p className="ant-upload-hint">Support for a single upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form >
    </>
  );
};
export default UserList;