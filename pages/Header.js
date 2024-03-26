import React, { useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'next/link';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FiHome, FiLogOut, FiMenu, FiUser, FiMapPin, FiSettings } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog, BiUser, BiBook, BiCalendar, BiMap, BiListCheck, BiClinic, BiUserPlus, BiBriefcase, BiCalendarPlus } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "" : ""}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              <FiMenu />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <Menu iconShape="square">
                <MenuItem icon={<FiHome />} title="Dashboard">
                  <Link href='/dashboard'><span>Dashboard</span></Link>
                </MenuItem>
                <MenuItem icon={<BiUser />} title="Admin">Admin</MenuItem>
                <MenuItem icon={<BiClinic />} title="Doctor">Doctor</MenuItem>
                <MenuItem icon={<BiUserPlus />} title="Patient">Patient</MenuItem>
                <MenuItem icon={<BiBriefcase />} title="Department">Department</MenuItem>
                <MenuItem icon={<BiCalendarPlus />} title="Appointment">Appointment</MenuItem>
                <SubMenu title="Locations" icon={<FiMapPin />} >
                  <MenuItem title="Country" icon={<BiMap />}>Country</MenuItem>
                  <MenuItem title="State" icon={<BiMap />}>State</MenuItem>
                  <MenuItem title="City" icon={<BiMap />}>City</MenuItem>
                </SubMenu>
              </Menu>
            </Scrollbars>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} title="Logout">
                <Link href='/login'><span>Logout</span></Link>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
