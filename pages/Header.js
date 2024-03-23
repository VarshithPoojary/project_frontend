import React, { useState } from "react";
import Link from 'next/link'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiUser, FiArrowRightCircle, FiMapPin} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "Admin" : "Admin Name"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FiHome />}>
                <Link href='/dashboard'><span>Dashboard</span></Link>
              </MenuItem>
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
              <SubMenu   title="Locations" icon={<FiMapPin />}>
                <MenuItem>Country</MenuItem>
                <MenuItem>State</MenuItem>
                <MenuItem>City</MenuItem>
              </SubMenu>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}><Link href='/login'><span>Logout</span></Link></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
