import { Button, Card, Grid } from "@trussworks/react-uswds";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // localStorage.setItem('user', '')
        onConfirm();
        navigate("/");
    };

    const handleCancel = () => {
        onClose();
        navigate("/home");
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const containerStyle = {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        marginTop: "15px"
    }

    return isOpen ? (
        <div style={containerStyle as React.CSSProperties}>
            <div className="bg-base-lightest">
                <Card style={{ width: "700px", listStyleType: "none" }}>
                <h1>Are you sure you want to log out?</h1>
                
                <div style={containerStyle as React.CSSProperties}>
                <Grid row>
                    <Grid col>
                <Button type="button" onClick={handleCancel} style={{marginRight: "30px"}}>
                    Cancel
                </Button>
                </Grid>
                <Grid col>
                <Button type="button" onClick={handleLogout} style={{marginLeft: "30px"}}>
                    Logout
                </Button>
                </Grid></Grid>
                </div>
                </Card>
                
            </div>
        </div>
    ) : null;
};

export default CustomModal;