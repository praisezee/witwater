import Avatar from 'react-avatar-edit';
import { Modal, ModalBody,Button, ModalHeader } from 'react-bootstrap'

const ProfileEdit = ({modal, handleClose,upload,url, onImgChange}) => {
  const src = null
  return (
    <Modal show={ modal } onHide={ handleClose } centered >
        <ModalHeader>
          <div className='d-flex justify-content-between w-100'>
            <Button onClick={handleClose} variant='outline-danger'>
            Cancle
          </Button>
          <Button variant='outline-primary' onClick={upload}>
            Save
          </Button>
          </div>
        </ModalHeader>
        <ModalBody>
        <Avatar
          width={ 450 }
          height={ 450 }
          src={ src }
          onClose={ handleClose }
          onCrop={onImgChange}
        />
        </ModalBody>
      </Modal>
  )
}

export default ProfileEdit
