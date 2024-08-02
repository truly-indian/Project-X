import { Button } from "@material-tailwind/react";

const SimpleButton = ({buttonText, size, onClick}) => {
    return <Button onClick={onClick} size={size}>{buttonText}</Button>;
}

export default SimpleButton;

