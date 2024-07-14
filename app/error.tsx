'use client'
import React from 'react'

interface Props {
    error: Error;
}

const ErrorPage = ({error}: Props) => {
    console.log(error);
  return (
    <div>An unexpected error has occured.
        {/* <button className='btn btn-error' onClick={() => reset()}>Retry</button> */}
    </div>
  )
}

export default ErrorPage