"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  TruckIcon,
  CurrencyRupeeIcon
} from "@heroicons/react/24/solid";

const SideBar = () => {
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
    <div className="flex flex-col h-screen">
      <Card className="flex-grow w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Welcome
          </Typography>
        </div>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} onClick={item.onClick}>
              <ListItemPrefix>
                <item.icon className="h-5 w-5" />
              </ListItemPrefix>
              {item.label}
              {item.suffix && <ListItemSuffix>{item.suffix}</ListItemSuffix>}
            </ListItem>
          ))}
        </List>
      </Card>
      <Card className="w-full max-w-[20rem] p-4 mt-auto shadow-xl shadow-blue-gray-900/5">
        <ListItem onClick={onSignOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </Card>
    </div>
  );
}

export default SideBar;
