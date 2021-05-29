import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";

export const SidebarData = [
  {
    title: "Customers",
    path: "/customers",
    icon: <BsIcons.BsPersonBoundingBox />,
    className: "nav-text",
  },
  {
    title: "Articles",
    path: "/articles",
    icon: <FaIcons.FaShoppingBasket />,
    className: "nav-text",
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <VscIcons.VscListUnordered />,
    className: "nav-text",
  },
];
