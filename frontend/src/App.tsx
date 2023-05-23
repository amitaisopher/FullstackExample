import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import UsersTable from './componenets/ui/UsersTable'
import BasicModal from './componenets/ui/BasicModal';
import { apiUsers } from './types/apiUsers';

function App() {
  const [users, setUsers] = useState<apiUsers>([])

  async function fetchData() {
    const res = await fetch('http://localhost:3000/api/v1/allUsers')
    const data = await res.json()
    setUsers(data)
  }
  
  useEffect(() => {
    fetchData().catch(err => {console.error(err)}) 
  }, [])

  return (
    <>
    <UsersTable users={users} updateUsersCallback={fetchData}/>
    <BasicModal buttonText='Add new user' updateUsersCallback={fetchData}/>
    </>
  )
}

export default App
