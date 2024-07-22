'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

  const {status, data: session} = useSession();

  return (
    <div className='flex bg-slate-200 p-5 space-x-10'>
        < Link className='mr-5' href="/">Next.js</Link>
        < Link href="/users">Users</Link>
        {status === 'loading' && <div>loading...</div>}
        {status === 'authenticated' && 
        <div>
          {session.user!.name}
          <Link href='/api/auth/signout' className='ml-3'>Sign out</Link>
        </div> }
        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
        
    </div>
  )
}

export default NavBar