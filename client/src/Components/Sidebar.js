import React from "react";
import "../App.css";

import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const Sidebar = ({
  currentPathname,
  handleItemClick,
  handleSettingsClick,
  handleItemClickSetting,
}) => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li
          key="Home"
          id={currentPathname === "/Home" ? "active" : ""}
          onClick={() => handleItemClick("/Home")}
          className="row"
        >
          <HomeIcon /> <span className="sidebar-text">Home</span>
        </li>
        <li
          key="Trending"
          id={currentPathname === "/Trending" ? "active" : ""}
          onClick={() => handleItemClick("/Trending")}
          className="row"
        >
          <TrendingUpIcon /> <span className="sidebar-text">Trending</span>
        </li>
        <li
          key="MostLiked"
          id={currentPathname === "/MostLiked" ? "active" : ""}
          onClick={() => handleItemClick("/MostLiked")}
          className="row"
        >
          <ThumbUpIcon /> <span className="sidebar-text">Most Liked</span>
        </li>
        <li
          key="Latest"
          id={currentPathname === "/Latest" ? "active" : ""}
          onClick={() => handleItemClick("/Latest")}
          className="row"
        >
          <FiberNewRoundedIcon /> <span className="sidebar-text">Latest</span>
        </li>
      </ul>
      <ul className="SidebarList">
        <li
          key="Settings"
          id={currentPathname === "/Settings" ? "active" : ""}
          onClick={() => handleItemClickSetting("/Latest")}
          className="row"
        >
          <SettingsRoundedIcon /> <span className="sidebar-text">Settings</span>
          <li onClick={handleSettingsClick}></li>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
