import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ModalWindow({ show, setShow, setFormReset, message }) {
  const handleClose = () => {
    setFormReset(true);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
