import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GenericAccordion from '@/components/common/Accordion';
import SimpleButton from "@/components/common/Button";
import {
    Input,
    Typography,
    Button
} from "@material-tailwind/react";

const DocumentUpload = ({ label }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Typography variant="h6" color="blue-gray">
                {label}
            </Typography>
            <Input
                type="text"
                label={`${label} Number`}
                size="lg"
                className="border-gray-300 focus:border-gray-900 rounded-lg"
            />
            <Input
                type="file"
                size="lg"
                className="border-gray-300 focus:border-gray-900 rounded-lg"
            />
        </div>
    );
};

const EditUserProfile = () => {
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState();
    const [address, setAddress] = useState();

    const submitUserProfile = async () => {
        try {
            console.log('user submitted profile: ', {name, number, address});
        } catch (error) {
            console.log('error while submitting user profile details: ', error);
        }
    };

    const handleInputChange = (id, value) => {
        if (id === "name") {
            setName(value);
        } else if (id === "phone") {
            setNumber(value);
        } else if (id === "address") {
            setAddress(value);
        }
    }

    useEffect(() => {
        const userInfo = Cookies.get('userInfo');

        if (userInfo) {
            const info = JSON.parse(userInfo);
            setUserName(info?.email || '');
        }
    }, []);

    const accordionItems = [
        {
            heading: "Shipper Details",
            body: (
                <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full">
                    <div className="mb-1 flex flex-col gap-6">
                        {[
                            { label: "Your Name", id: "name" },
                            { label: "Your Phone Number", id: "phone" },
                            { label: "Your Address", id: "address" },
                        ].map(({ label, id }) => (
                            <div key={id} className="flex flex-col gap-2 w-full">
                                <Typography variant="h6" color="blue-gray">
                                    {label}
                                </Typography>
                                <Input
                                    size="lg"
                                    className="border-gray-300 focus:border-gray-500 rounded-lg"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={(e) => handleInputChange(id, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <SimpleButton buttonText={'Submit'} size={'md'} onClick={submitUserProfile}></SimpleButton>
                </form>
            )
        },
        {
            heading: "Shipper Documents (Files and Uploads)",
            body: (
                <div className="p-4 max-w-lg mx-auto">
                    <Typography variant="h4" className="mb-4 text-center">
                        File Upload Form
                    </Typography>
                    <div className="space-y-6 w-full max-h-96 overflow-y-auto">
                        <DocumentUpload label="Vehicle RC" />
                        <DocumentUpload label="Vehicle Insurance" />
                        <DocumentUpload label="Vehicle Pollution Certificate" />
                        <DocumentUpload label="Driver License" />
                        <DocumentUpload label="Driver Adhaar" />
                    </div>
                    <Button type="submit" color="blue" className="w-full mt-4">
                        Submit
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="p-5 mt-2">
            <Typography variant="h4" className="mb-4 text-center">
                Welcome, {userName ? `Mr. ${userName}` : 'Guest'}
            </Typography>
            <div className="max-w-screen-lg mx-auto">
                <GenericAccordion items={accordionItems}></GenericAccordion>
            </div>
        </div>
    );
};

export default EditUserProfile;
