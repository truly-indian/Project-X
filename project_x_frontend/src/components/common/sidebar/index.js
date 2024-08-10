"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  TruckIcon,
  CurrencyRupeeIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const onSignOut = () => {
    Cookies.remove('userToken');
    router.push('/');
  };

  const menuItems = [
    {
      label: "Profile",
      icon: UserCircleIcon,
      onClick: () => router.push('/home'),
    },
    {
      label: "Orders",
      icon: TruckIcon,
      onClick: () => router.push('/order/list'),
    },
    {
      label: 'Quotes',
      icon: CurrencyRupeeIcon,
      onClick: () => router.push('/quote/list')
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-blue-50"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "block" : "hidden"
          } md:flex md:flex-col md:w-64 flex-grow max-w-[20rem] p-4 shadow-xl`}
      >
        <Card className="flex-grow w-full h-full p-4 mt-auto mt-1 relative overflow-hidden">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Welcome
            </Typography>
          </div>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                onClick={item.onClick}
                className="rounded-lg hover:bg-blue-gray-50 transition-all duration-300"
              >
                <ListItemPrefix>
                  <item.icon className="h-5 w-5" />
                </ListItemPrefix>
                {item.label}
                {item.suffix && <ListItemSuffix>{item.suffix}</ListItemSuffix>}
              </ListItem>
            ))}
          </List>
        </Card>
        <Card className="w-full p-4 mt-auto mt-1 relative overflow-hidden">
          <ListItem onClick={onSignOut} className="rounded-lg hover:bg-blue-gray-50 transition-all duration-300">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Card>
      </div>
    </div>
  );
}

export default SideBar;
