import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';

// This is Modal for when the user wants to make a new note

const AddEditNotes = ({noteData, type, onClose}) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  const addNewNote = async () => {};
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title){
      setError("Please add a Title.");
      return;
    }

    if (!content) {
      setError("Please add a brief Description");
      return;
    }

    setError("");

    if (type == 'edit'){
      editNote();
    }
    else{
      addNewNote();
    }

  }

  return (
    <div className='relative'>

      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className="flex flex-col gap-2">
          <label className='input-label'>TITLE</label>
          <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} className='text-2xl text-slate-950 outline-none' placeholder='Go to gym at 4' />
      </div>
      <div className="flex flex-col gap-2 mt-4">
          <label className='input-label'>CONTENT</label>
          <textarea type='text' value={content} onChange={(e) => {setContent(e.target.value)}} className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Content' rows={10}></textarea>
      </div>
      <div className="mt-3">
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>ADD</button>
    </div>
  )
}

export default AddEditNotes