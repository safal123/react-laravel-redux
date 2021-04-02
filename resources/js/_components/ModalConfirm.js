import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalConfirm = ({ deleteProduct, id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteItem = () =>{
        deleteProduct(id);
        handleClose();
    }

    return (
        <>
            <button className={'btn btn-danger btn-sm'} onClick={handleShow}>
                Delete
            </button>

            <Modal show={show} onHide={handleClose} className={'rounded-0'}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deleteItem()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
