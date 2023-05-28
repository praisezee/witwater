import axios from '../api/register';
import { useState } from 'react';
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const Verify = ( { show, auth, hide } ) =>
{
  const [ code, setCode ] = useState( '' )
  const {setAuth} = useAuth()
  const handleSubmit = async () =>
  {
    try {
      await axios.post( '/verify-code', JSON.stringify( { email: auth.email, code } ), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      } )
      setAuth( { ...auth, isVerified: true } )
      hide()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Modal show={show} onHide={hide} centered scrollable>
      <ModalHeader>
        <div className='d-flex justify-content-between w-100'>
            <Button variant='outline-danger' onClick={hide}>
            Cancle
          </Button>
          <Button variant='outline-primary' onClick={handleSubmit} >
            Verify
          </Button>
          </div>
      </ModalHeader>
      <ModalBody>
        <p className="h6">A verification code has been sent to your email </p>
        <FormLabel>Verification Code</FormLabel>
        <FormControl value={code} onChange={(e)=> setCode(e.target.value)} placeholder='Enter verification code'/>
      </ModalBody>
    </Modal>
  )
}

export default Verify
