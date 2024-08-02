import React, {useState} from "react";
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";

import  QuotePriceForm  from '../../order/properties/quote/viewQuote';

const BasicDialog = ({ dialogInfo = {} }) => {
    const [modalState, setModalState] = useState({ open: false, type: dialogInfo.type });
    if (modalState.type) modalState.open = true;
    let triggerCloseDialog;
    let meta = {};

    if (dialogInfo.triggerCloseDialog) {
        triggerCloseDialog = dialogInfo.triggerCloseDialog;
    }

    if (dialogInfo.meta) {
        meta = dialogInfo.meta;
    }

    const onModalClose = (e, reason) => {
        setModalState({ open: false, type: null });
        triggerCloseDialog(false);
    };


    return (
        <>
            <Dialog
                open={modalState.open}
                handler={onModalClose}
            >
                <DialogBody>
                    {modalState.type === 'quote_price_form' ? <QuotePriceForm onClose={onModalClose} meta={meta}></QuotePriceForm> : null};
                </DialogBody>
                
            </Dialog>
        </>
    );
}

export default BasicDialog;