import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "../Pagination";

const Table = ({ meta, tableHeads, tableRows, totalCount, currentPage, triggerOnpageChange }) => {

    const {showPagination = true} = meta

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
                                    className="font-normal leading-none opacity-70 text-center"
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
                        const classes = isLast ? "p-4 text-center" : "p-4 border-b border-blue-gray-50 text-center";

                        return (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex} className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {Array.isArray(cell) ? (
                                                cell.map((item, index) => (
                                                    <span key={index} className={index < cell.length - 1 ? "mr-2" : ""}>
                                                        {item}
                                                    </span>
                                                ))
                                            ) : (
                                                cell
                                            )}
                                        </Typography>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showPagination ? <div className="flex justify-end">
                <Pagination meta={meta} totalCount={totalCount}></Pagination>
            </div> : null}
        </Card>
    );

};

export default Table;