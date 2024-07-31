import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "../Pagination";

const Table = ({ tableHeads, tableRows, totalCount, currentPage, triggerOnpageChange }) => {
    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {tableHeads.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((row, rowIndex) => {
                        const isLast = rowIndex === tableRows.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex} className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {cell}
                                        </Typography>
                                    </td>
                                ))}
                                {/* <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        Edit
                                    </Typography>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-end">
                <Pagination></Pagination>
            </div>
        </Card>
    );

};

export default Table;