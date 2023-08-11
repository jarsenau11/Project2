import { useRef, useState } from "react";
import { getUser } from "../../slices/UserSlice";
import { Button, Modal, ModalRef } from "@trussworks/react-uswds";

interface Delete1099Props {
    indexOf1099ToDelete: any
    handleDelete1099: (event: any) => void
}

export default function Delete1099(props: Delete1099Props) {
    const [user, setUser] = useState(getUser())

    const modalRef = useRef<ModalRef>(null)

    const toggleModal = () => {
        modalRef.current?.toggleModal();
    };

    function handleDeleteButtonClick(event: any) {
        setUser((prev) => ({...prev, form1099s: user.form1099s.splice(props.indexOf1099ToDelete, 1)}))
        fetch('users/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(() => {
            props.handleDelete1099(event)
            toggleModal()
        })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <>
            <img
                src={"/Red_X_Icon_Small.png"}
                alt={"alt"}
                style={{ cursor: 'pointer', marginTop: "5px" }}
                onClick={toggleModal}
            />
            <Modal ref={modalRef} id={"delete"} title={"delete"} isInitiallyOpen={false} style={{ textAlign: "center", fontWeight: "bold" }}>
                <div>Are you sure you want to delete this 1099?<br></br> This action cannot be undone.</div>
                <Button type="button" onClick={toggleModal} style={{ marginTop: "50px", marginRight: "50px" }}>
                    Cancel
                </Button>
                <Button type="submit" style={{ backgroundColor: "descruction" }} onClick={handleDeleteButtonClick}>
                    Confirm
                </Button>
            </Modal>
        </>
    )
}