import React, { Suspense } from 'react'
import UsersTable from './UsersTable';
import { sort } from 'fast-sort';
import Link from 'next/link';


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
      <Link href='/users/new' className='btn'>New User</Link>
      <Suspense fallback={<p>Loading...</p>}>
        < UsersTable sortOrder={sortOrder} />
      </Suspense>

    </div>
  )
}

export default UsersPage