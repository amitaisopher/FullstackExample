import { FC, useState } from 'react'
import {BsNutFill, BsTrash3} from 'react-icons/bs'
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { apiUsers, apiUser } from '../../types/apiUsers';

interface UsersTableProps {
    users: apiUsers
    updateUsersCallback: () => void
}

const UsersTable: FC<UsersTableProps> = ({users, updateUsersCallback}) => {
  const style = {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    color: "black",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [selectedUser, setSelectedUser] = useState<apiUser | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function deleteUserHandler(userId: string) {
    try {
      const res = await fetch('http://localhost:3000/api/v1/user', {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: userId})
      })
    if (res.status === 200) {
      updateUsersCallback()
    }
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
    }
  
  }
  async function confirmUserDelete(user: apiUser) {
    setSelectedUser(user)
    handleOpen()
  }

  return <div className='table'>{users.map(user => {
    return (<div className='row' key={user.id}>
      <div className='table-entry'>
        <div className='text-wrap-elipsis'>Name: {user.name}</div>
        <div onClick={() => {confirmUserDelete(user)}} className='delete-icon'><BsTrash3/></div>
      </div>
      <div className='table-entry'>
        <div className='text-wrap-elipsis'>
          Email: {user.email}</div>
        </div> 
    </div>)
  })}
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Reality Check!
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      You are about to delete the user: "{selectedUser?.name}"
    </Typography>
    <div className='flex place-content-between mt-2'>
        <Button onClick={handleClose} variant="contained">Cancel</Button>
        <Button onClick={() => {if (selectedUser) deleteUserHandler(selectedUser?.id)}} variant="outlined">Delete</Button>
    </div>
    </Box>
  </Modal>
  </div>
}

export default UsersTable