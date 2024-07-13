import React from 'react'
import UsersTable from './UsersTable';
import { sort } from 'fast-sort';


interface Props {
  searchParams: {
      sortOrder: string;
  }
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {

  

  return (
    <div >
    <h1>
      Users
    </h1>
    < UsersTable sortOrder={sortOrder} />
    
    </div>
  )
}

export default UsersPage