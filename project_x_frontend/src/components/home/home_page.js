"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GenericAccordion from '@/components/common/Accordion';
import {
  Input,
  Typography,
  Button
} from "@material-tailwind/react";

const HomePageView = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const userInfo = Cookies.get('userInfo');
    const info = JSON.parse(userInfo);
    setUserName(info?.email || '');
  }, []);

  const accordionItems = [
    {
      heading: "Shipper Details",
      body: (
        <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full">
          <div className="mb-1 flex flex-col gap-6">
            {[
              { label: "Your Name", id: "name" },
              { label: "Your Phone Number", id: "phone" },
              { label: "Your Address", id: "address" },
              { label: "Your Adhaar", id: "adhaar" }
            ].map(({ label, id }) => (
              <div key={id} className="flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray">
                  {label}
                </Typography>
                <Input
                  size="lg"
                  className="border-gray-300 focus:border-gray-500 rounded-lg"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            ))}
          </div>
        </form>
      )
    },
    {
      heading: "Shipper Documents (Files and Uploads)",
      body: (
        <div className="p-4 max-w-lg mx-auto">
            <Typography variant="h4" className="mb-4">
                File Upload Form
            </Typography>
            <form className="space-y-4">
                <div>
                    <Input
                        size="lg"
                        label="Your Name"
                        className="border-gray-300 focus:border-gray-900 rounded-lg"
                    />
                </div>
                <div>
                    <Input
                        type="file"
                        className="border-gray-300 focus:border-gray-900 rounded-lg"
                    />
                </div>
                <Button type="submit" color="blue" className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    )
    }
  ];

  return (
    <div className="p-5 mt-2">
      <Typography variant="h4" className="mb-4">
        Welcome, {userName ? `Mr. ${userName}` : 'Guest'}
      </Typography>
      <GenericAccordion items={accordionItems}></GenericAccordion>
    </div>
  );
}

export default HomePageView;
