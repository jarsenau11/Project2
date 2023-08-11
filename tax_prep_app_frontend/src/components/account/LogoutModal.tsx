import { useState } from "react";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
    const [modalOpen, setModalOpen] = useState(true);

    const navigate = useNavigate()

    const handleModalClose = () => {
        navigate('/home')
        setModalOpen(false);
        
    }

    const handleLogout = () => {
        // localStorage.setItem('user', '')
        navigate("/")
    }

    const containerStyle = {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        marginTop: "45px"
    }

    return (
        <>
        <div style={containerStyle as React.CSSProperties}>
        <div style={containerStyle as React.CSSProperties}>
            <CustomModal isOpen={modalOpen} onClose={handleModalClose} onConfirm={handleLogout} />
            </div></div>
        </>
    )
}
