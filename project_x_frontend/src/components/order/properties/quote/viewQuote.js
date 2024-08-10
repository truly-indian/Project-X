import React, { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import ToastMessage from "../../../../components/common/toast";

const QuotePriceForm = ({ onClose, meta = {}}) => {

    const { triggerOnSubmit, quotedPrice } = meta;

    const [quotePrice, setQuotePrice] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const onPriceChange = (e) => {
        const val = e.target.value; 
        setQuotePrice(val);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const submitQuotePrice = () => {
        if (!quotedPrice) {
            const text = 'Please refresh the page'
            setToastMessage({ status: 'warning', text });
            setShowToast(true);
            return;
        }
        if (quotePrice >= quotedPrice || quotePrice == 0) {
            const text = 'your quote price can not be equal or greater than the current quoted price.'
            setToastMessage({ status: 'warning', text });
            setShowToast(true);
            setQuotePrice(0);
            return; 
        }
        triggerOnSubmit({quotePrice});
        onClose();
    };

    return (
       <div className="flex items-center justify-center">
         <Card color="transparent" shadow={false}>
            <Typography color="gray" className="mt-1 font-normal">
                Quote Your Price
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Price
                    </Typography>
                    <Input
                        onChange={onPriceChange}
                        size="md"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button onClick={submitQuotePrice} className="mt-6" fullWidth>
                    Submit
                </Button>
            </form>
            {showToast && (
                <ToastMessage onClose={handleCloseToast} text={toastMessage.text} status={toastMessage.status} />
            )}
        </Card>
       </div>
    );
}

export default QuotePriceForm;