import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Layout, theme, Input, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import XMSIcon from '@/assets/xmsImg.svg';
import { IMenuItem, convertToMenuItems, routerList } from './data';
import './index.scss';

const { Content, Sider } = Layout;

const LayoutComponent: React.FC = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [searchText, setSearchText] = useState<string>('');

  const formatMenuItems = (items: IMenuItem[]): MenuProps['items'] => {
    if (!items || items.length === 0) return [];
    return items.map((item) => {
      return {
        key: item.id,
        label: item.children ? (
          item.title
        ) : item.path ? (
          <Link to={item.path}>{item.title}</Link>
        ) : (
          item.title
        ),
        title: item.title,
        icon: item.icon,
        children: item.children ? formatMenuItems(item.children) : undefined,
      };
    });
  };

  // 根据搜索文本过滤菜单
  const filterMenu = (items: IMenuItem[]): IMenuItem[] => {
    if (items.length === 0 || !items) return [];
    return items.filter((item) => {
      const match = item.label.toLowerCase().includes(searchText.toLowerCase());
      if (item.children) {
        const childMatch = filterMenu(item.children);
        return childMatch.length > 0 || match;
      }
      return match;
    });
  };

  const getSelectedKeys = () => {
    return routerList
      .flatMap((item) => getAllPaths(item as unknown as IMenuItem))
      .filter((p) => p.path === location.pathname)
      .map((p) => p.id);
  };

  // 递归获取所有路径
  const getAllPaths = (item: IMenuItem): Array<{ id: string; path: string }> => {
    if (item.path) return [{ id: item.id, path: item.path }];
    return item.children?.flatMap(getAllPaths) || [];
  };

  return (
    <div className='layout'>
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsedWidth='0'
          theme='light'
          style={{ borderRight: '1px solid rgb(233, 235, 237)' }}
        >
          <div className='layout-logo'>
            <div className='layout-logo-content'>
              <img src={XMSIcon} alt='' />
              <div className='layout-logo-content-title'>售后管理系统</div>
            </div>
          </div>
          <div className='layout-search'>
            <Input
              placeholder='菜单搜索'
              prefix={<SearchOutlined />}
              variant='filled'
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Menu
            theme='light'
            mode='inline'
            selectedKeys={getSelectedKeys()}
            items={formatMenuItems(
              filterMenu(convertToMenuItems(routerList as unknown as IMenuItem[])),
            )}
            defaultOpenKeys={routerList.map((item) => item.id)}
          />
        </Sider>
        <Layout>
          <div className='layout-header'></div>
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
