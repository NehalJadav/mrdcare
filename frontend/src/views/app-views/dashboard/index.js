// /* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, message, Button } from 'antd';
import { CopyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import UserService from "services/UserService"

const Numbers = () => {
  const adminData = useSelector(state => state.auth)
  const [settingsData, setSettingsData] = useState();
  const [loading, setloading] = useState(false);
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    navigator.clipboard.writeText(adminData.userData.partnerReferralUrl);
    message.success("Referral link copied");
  };

  const getDashboardData = async () => {
    setloading(true)
    await UserService.getDashboardData().then(function (result) {
      if (result.success) {
        setSettingsData(result.data)
      }
      setloading(false);
    });
  };
  useEffect(() => {
    //getDashboardData();
  }, []);
  return (
    <div className="site-card-wrapper">
      <Row gutter={24}>
        <Col span={24}>
          <Card>
            <Row>
              <h2>Dashboard</h2>
              {adminData.userData.chAdminUserType === 4 && <p style={{ marginTop: -39, marginLeft: 910 }}>Referral link: <a href={adminData.userData.partnerReferralUrl} target="_blank">{adminData.userData.partnerReferralUrl}</a>   <CopyOutlined onClick={copyToClipboard} /></p>}
            </Row>
          </Card>
        </Col>
      </Row>
    </div >
  );
};
export default Numbers;