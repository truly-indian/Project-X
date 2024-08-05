"use client";
import React from "react";
import QuoteList from "@/components/quote/list";
import RootLayout from "@/app/layout";

const QuoteListPage = () => {
    return (
        <RootLayout>
            <QuoteList></QuoteList>
        </RootLayout>
    );
};

export default QuoteListPage;