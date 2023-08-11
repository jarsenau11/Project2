import { useRef } from "react";
import { Modal, ModalRef } from "@trussworks/react-uswds";
import W2Form from "./W2Form";

interface DeleteW2Props {
    indexOfW2ToUpdate: any
    existingForm: any
    handleUpdateW2: (event: any) => void
}

export default function DeleteW2(props: DeleteW2Props) {
    const modalRef = useRef<ModalRef>(null)

    const toggleModal = () => {
        modalRef.current?.toggleModal()
    }

    function handleUpdateButtonClick(event: any) {
        // window.location.reload()
        

    }

    return (
        <>
            <img
                src={"/PencilIcon.png"}
                alt={"alt"}
                style={{ cursor: 'pointer', marginTop: "5px" }}
                onClick={toggleModal}
            />
            <Modal ref={modalRef} id={"delete"} title={""} isInitiallyOpen={false} style={{ textAlign: "center", fontWeight: "bold", minWidth: "600px"}}>
                <W2Form existingForm={props.existingForm} isNewForm={false} isTaxFiling={false} indexOfW2ToUpdate={props.indexOfW2ToUpdate} handleSubmit={handleUpdateButtonClick} handleCancel={toggleModal}></W2Form>
            </Modal>
        </>
    )
}