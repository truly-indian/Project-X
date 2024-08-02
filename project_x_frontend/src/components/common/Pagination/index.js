import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ meta, totalCount, currentPage, triggerOnPageChange}) => {

    const { triggerMethod, limit } = meta;

    const [active, setActive] = React.useState(1);

    const next = () => {
        if (active === totalCount) {
            setActive(active-1);
            return;
        } 
        setActive(active + 1);
        triggerMethod({from: limit*active, limit });
    };

    const prev = () => {
        if (active === 1) {
            return;
        } 
        setActive(active - 1);
        triggerMethod({from: limit* (active-2), limit})
    };

    return (
        <div className="flex items-center gap-8">
            <IconButton
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
                Page <strong className="text-gray-900">{active}</strong> of{" "}
                <strong className="text-gray-900">{totalCount}</strong>
            </Typography>
            <IconButton
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={active === totalCount}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        </div>
    );
}

export default Pagination;