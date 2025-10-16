import React from 'react'
import { useAuhtStore } from '../store/userAuthstore'

function Navbar() {

  const {authUser} = useAuhtStore()

  return (
    <div>Navbar</div>
  )
}

export default Navbar