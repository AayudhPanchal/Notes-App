import React, { useState } from 'react'
import NoteCard from '../../components/Cards/NoteCard'
import AddEditNotes from './AddEditNotes'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  const onClose = () => {
    setOpenAddEditModal({
      isShown: false,
      type: 'add',
      data: null
    })
  }
  
  return (

    <>
      <div className='container mx-auto'>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard title="Hello World" date="16/08/2024" content="this is a test note to check the note component" tags="#Meeting" isPinned={true} />
        </div>
      </div>
      <button className='w-12 h-12 flex items-center justify-center rounded-2xl bg-primary hover:bg-emerald-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({
          isShown: true,
          type: 'add',
          data: null
        })
      }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal isOpen={openAddEditModal.isShown} onRequestClose={() => {}} style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }} contentLabel="" className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'>
        <AddEditNotes onClose={onClose} />
      </Modal>
    </>
  )
}

export default Home