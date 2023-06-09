import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  CarOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import ViewVehicle from '../containers/ViewVehicleContainer';
import Dashbored from '../containers/Dashbored';

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashbored', null, <DashboardOutlined />),
  getItem('Vehicle', 'sub1', <CarOutlined />, [
    getItem('View Vehicles', '1', <UnorderedListOutlined />),
  ]),
];

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  // eslint-disable-next-line
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuItemClick = ({ key }) => {
    setSelectedItem(key);
  };

  const renderContainer = () => {
    switch (selectedItem) {
      case '1':
        return <ViewVehicle />;
      default:
        return <Dashbored />;
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }} />
        <Content>{renderContainer()}</Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
