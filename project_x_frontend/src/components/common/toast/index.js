"use client";
import React, { useEffect, useState } from "react";
import { Toast } from "flowbite-react";
import DoneIcon from '@mui/icons-material/Done';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const ToastMessage = ({ text, status, onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Automatically hide the toast after the specified duration
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getToastStyle = () => {
        switch (status) {
            case 'success':
                return {
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-500',
                    icon: <DoneIcon className="h-5 w-5" />,
                };
            case 'error':
                return {
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-500',
                    icon: <SmsFailedIcon className="h-5 w-5" />,
                };
            case 'warning':
                return {
                    bgColor: 'bg-orange-100',
                    textColor: 'text-orange-500',
                    icon: <ReportGmailerrorredIcon className="h-5 w-5" />,
                };
            default:
                return {
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-500',
                    icon: null,
                };
        }
    };

    const { bgColor, textColor, icon } = getToastStyle();

    if (!isVisible) return null; // Do not render if not visible

    return (
        <div className="flex flex-col gap-4">
            <Toast>
                <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgColor} ${textColor}`}>
                    {icon}
                </div>
                <div className="ml-3 text-sm font-normal">{text}</div>
                <Toast.Toggle onClick={() => setIsVisible(false)} />
            </Toast>
        </div>
    );
}

export default ToastMessage;
