import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  CarOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ViewVehicle from '../containers/ViewVehicleContainer';
import Dashbored from '../containers/Dashbored';
import AddVehicle from '../containers/AddVehicle';

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
    getItem('Add Vehicle', '2', <PlusOutlined />),
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

      case '2':
        return <AddVehicle />;

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
