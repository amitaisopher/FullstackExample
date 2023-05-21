import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { BaseSyntheticEvent, useState } from 'react';
import { FC } from 'react'
import TextField from '@mui/material/TextField';

interface BasicModalProps {
  buttonText: string,
  updateUsersCallback: () => void
}

const BasicModal: FC<BasicModalProps> = ({buttonText, updateUsersCallback}) => {
    const style = {
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [groups, setGroups] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const nameHandler = (event: BaseSyntheticEvent) => {setName(event.target.value)}
    const emailHandler = (event: BaseSyntheticEvent) => {setEmail(event.target.value)}
    const groupsHandler = (event: BaseSyntheticEvent) => {setGroups(event.target.value)}
    const handleCancel = () => {
        setOpen(false)
        setName('')
        setEmail('')
        setGroups('')
    }
    const handleCreateUser = async () => {
        const parsedGroups = groups.split(',').map(item => item.trim())
        const data = {
            name,
            email,
            distLists: parsedGroups
        }
        try {
            const res = await fetch('http://localhost:3000/api/v1/user', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)                
            })
            if (res.status === 200) {
                updateUsersCallback()
                handleClose()
            }
        } catch (error) {
            console.error(error)
        }
    }
  
  return <div>
  <Button onClick={handleOpen} variant="contained">{buttonText}</Button>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <div className='flex flex-col'>
        <TextField onChange={nameHandler} id="filled-basic" label="Name" variant="filled" />
        <TextField onChange={emailHandler} id="filled-basic" label="Email" variant="filled" />
        <TextField onChange={groupsHandler} id="filled-basic" label="Groups" variant="filled" />
    </div>
    <div className='flex place-content-between mt-2'>
        <Button onClick={handleCreateUser} variant="contained">Create</Button>
        <Button onClick={handleCancel} variant="contained">Cancel</Button>
    </div>
    </Box>
  </Modal>
</div>
}

export default BasicModal