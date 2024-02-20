import React from 'react'
import Image from 'next/image'
import Wallet from '../Assests/wallet.gif'
const loading = () => {
  return (
    <div className='w-[60%] mx-auto h-screen flex justify-center items-center'>
        <div className='h-20 w-20 relative flex justify-center items-center'>
            <Image src={Wallet} fill={true} alt="wallet"/>
        </div>
    </div>
  )
}

export default loading
