"use client";
import React from "react";
import HomePageView from "@/components/home/home_page";
import RootLayout from "@/app/layout";
import EditUserProfile from "@/components/userProfile/edit";

const HomePage = () => {
    return (
        <RootLayout>
            <EditUserProfile></EditUserProfile>
        </RootLayout>
    );
};

export default HomePage;