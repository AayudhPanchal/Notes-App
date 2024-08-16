import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

// Input Component for the Add Note Modal

const TagInput = ({ tags, setTags }) => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addNewTag = () => {
    if (inputValue.trim() !== ""){
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      addNewTag();
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div>

      <div>
        {tags?.length > 0 && <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
              <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                # {tag}
                <button onClick={() => {handleRemoveTag(tag)}}>
                  <MdClose />
                </button>
              </span>
          ))}
        </div>
        }
      </div>
      
      <div className="flex items-center gap-4 mt-3">
        <input type="text" className='text-sm bg-transparent border px-3 py-2 rounded outline-none' placeholder='Add Tags' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />

        <button className='w-8 h-8 flex items-center justify-center rounded border border-emerald-600 hover:bg-emerald-600 transition-colors' onClick={addNewTag}><MdAdd className='text-2xl text-emerald-600 hover:text-white transition-colors' /></button>
      </div>
    </div>
  )
}

export default TagInput