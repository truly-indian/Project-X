import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const SimpleCard = ({ cardText, cardHeading, imgSrc, price, buttons }) => {
    return (
        <Card className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
                <iframe
                    width="400"
                    height="300"
                    src={imgSrc}
                ></iframe>
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {cardHeading}
                </Typography>
                <Typography>
                    {cardText}
                </Typography>
                <Typography>
                    My Quote: ₹ {price}
                </Typography>
            </CardBody>
            <CardFooter className="flex gap-2 bg-blue-gray-50">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        color={button.color || "blue"}
                        onClick={button.onClick}
                    >
                        {button.label}
                    </Button>
                ))}
            </CardFooter>
        </Card>
    );
}

export default SimpleCard;  