"use client";
import React from "react";
import HomePageView from "@/components/home/home_page";
import RootLayout from "@/app/layout";

const HomePage = () => {
    return (
            <RootLayout>
                <HomePageView></HomePageView>
            </RootLayout>
    );
};

export default HomePage;