import Image from 'next/image'
import React from 'react'
import Authform from './components/Authform'

export default function Home() {
  return (
    <div className='text-sky-600 flex w-[100vw] h-[100vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>

      <div className='sm:mx-auto sm:w-full sm:max-w-md'>

        <Image
        alt='logo'
        src="/images/logo.png"
        height={45}
        width={45}
        className='mx-auto w-auto '
        ></Image>
        <h2 className='mt-6 text-center text-xl font-bold tracking-tight text-gray-900 mb-7'>
Sign in to your account
        </h2>
      </div>
      <Authform></Authform>
    </div>
  )
}
