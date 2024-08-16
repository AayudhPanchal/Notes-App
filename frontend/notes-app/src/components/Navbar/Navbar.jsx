import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate;

  const onLogOut = () => {
    return navigate("/login");
  }

  const onClearSearch = () => {setSearchQuery("")};

  const handleSearch = () => {

  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

        <SearchBar value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}} onClearSearch={onClearSearch} handleSearch={handleSearch}/>

        <ProfileInfo onLogOut={onLogOut}/>
    </div>
  )
}

export default Navbar