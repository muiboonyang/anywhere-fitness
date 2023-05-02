import React, {useEffect} from 'react';
import Alert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

interface CustomAlertProps {
    alertMessage: string;
    setAlertMessage: (x: string) => void;
}

const CustomAlert = (
    {
        alertMessage,
        setAlertMessage,
    }: CustomAlertProps
) => {

    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setOpen(true)
        const timeId = setTimeout(() => {
            setAlertMessage("");
            setOpen(false)
        }, 3000);

        return () => {
            clearTimeout(timeId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertMessage]);

    return (
        <>
            {alertMessage &&
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <Alert
                        icon={false}
                        color="info"
                        onClose={() => {
                            setAlertMessage("");
                        }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            }
        </>
    )
};

export default CustomAlert;