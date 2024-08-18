import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

const GenericAccordion = ({ items, alwaysOpen = false }) => {
    const [open, setOpen] = React.useState(alwaysOpen ? 0 : null);

    const handleOpen = (index) => {
        if (alwaysOpen) {
            setOpen(index);
        } else {
            setOpen(open === index ? null : index);
        }
    };

    return (
        <div>
            {items.map((item, index) => (
                <Accordion key={index} open={open === index || alwaysOpen}>
                    <AccordionHeader onClick={() => handleOpen(index)}>
                        {item.heading}
                    </AccordionHeader>
                    <AccordionBody>
                        {item.body}
                    </AccordionBody>
                </Accordion>
            ))}
        </div>
    );
}

export default GenericAccordion;