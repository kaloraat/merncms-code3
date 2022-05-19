import React, { useState, useEffect, useContext } from "react";
import { Menu, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import { AuthContext } from "../../context/auth";
import {
  SettingOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SubscriberNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && "active"}`;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        defaultOpenKeys={["2", "6", "10"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/subscriber">
            <a className={activeName("/subscriber")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* comments */}
        <Menu.Item key="9" icon={<CommentOutlined />}>
          <Link href="/subscriber/comments">
            <a className={activeName("/subscriber/comments")}>Comments</a>
          </Link>
        </Menu.Item>

        {/* profile */}
        <Menu.Item key="13" icon={<UserOutlined />}>
          <Link href={`/subscriber/${auth?.user?._id}`}>
            <a className={activeName(`/subscriber/${auth?.user?._id}`)}>
              Profile
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SubscriberNav;
