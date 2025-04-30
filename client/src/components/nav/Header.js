import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  DesktopOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingTwoTone,
  ShoppingCartOutlined,
  ShopTwoTone,
  SafetyCertificateTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import "./header.css"; // Import the CSS file for custom styles
import MetaData from "../../layout/MetaData";
import { logout as logoutAction } from "../../functions/user"; // Import the logout action

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch(logoutAction()); // Dispatch the logout action
    history.push("/login");
  };

  return (
    <>
      <MetaData title="Subhekshya" />
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="header-menu"
      >
        <Item key="home" icon={<DesktopOutlined />} className="logo">
          <Link to="/">Subhekshya</Link>
        </Item>

        <Item key="shop" icon={<ShopTwoTone />} className="menu-item">
          <Link to="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />} className="menu-item">
          <Link to="/cart">
            Cart <Badge count={cart.length} offset={[9, 0]} />
          </Link>
        </Item>

        {!user && (
          <Item key="register" icon={<UserAddOutlined />} className="float-right menu-item">
            <Link to="/register">Register</Link>
          </Item>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-right menu-item">
            <Link to="/login">Login</Link>
          </Item>
        )}

        {user && (
          <SubMenu
            key="SubMenu"
            icon={<SafetyCertificateTwoTone />}
            title={user.email && user.email.split("@")[0]}
            className="float-right menu-item"
          >
            {user && user.role === "customer" && (
              <Item icon={<SettingTwoTone />} className="submenu-item">
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item icon={<SettingTwoTone />} className="submenu-item">
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={handleLogout} className="submenu-item">
              Log Out
            </Item>
          </SubMenu>
        )}

        <span className="search-container">
          <Search />
        </span>
      </Menu>
    </>
  );
};

export default Header;
