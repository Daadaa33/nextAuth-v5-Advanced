
import { auth, signOut } from '@/auth'
import React from 'react'

const SettingPage = async() => {
    const session = await auth()
  return (
    <div>Setting Page
        <h2 className='font-bold text-xl text-blue-900'>welcome {session?.user?.name}</h2>

        <form action={async() => {
            "use server";
            await signOut()
        }}>
            <button type="submit">sign out</button>
        </form>
    </div>
  )
}

export default SettingPage