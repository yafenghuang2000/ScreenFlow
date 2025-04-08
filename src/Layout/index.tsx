import React from 'react';
import { Input, Layout, Menu, theme, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import './index.scss';

const { Content, Sider } = Layout;

const LayoutComponent: React.FC = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <div className='layout'>
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider trigger={null} collapsible collapsedWidth='0' theme='light'>
          {/*<div className='layout-header slider'>*/}
          {/*  <div className='layout-logo'>*/}
          {/*    <img src='https://cdn.cnbj1.fds.api.mi-img.com/workbench/front/res/mi.svg' alt='' />*/}
          {/*    <div className='layout-logo-title'>售后管理系统</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className='layout-slider'></div>
          <div className='layout-search'>
            <Input />
          </div>
        </Sider>
        <Layout>
          {/*<div className='layout-header'></div>*/}
          <Content>
            <div className='layout-content' style={{ background: colorBgLayout }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
