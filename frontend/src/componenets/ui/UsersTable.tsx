import { FC } from 'react'

interface UsersTableProps {
    users: {name: string, id: string, email: string}[]
}

const UsersTable: FC<UsersTableProps> = ({users}) => {
  return <div className='table'>{users.map(user => {
    return (<div className='row' key={user.id}>
      <div className='table-entry'>Name: {user.name}</div>
      <div className='table-entry'>Email: {user.email}</div>
    </div>)
  })}</div>
}

export default UsersTable