import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setContactData, setModalState, setTitle, setUserDetails } from '../redux/action/appActions';

interface ConatctCardProps {
  id: number
  firstName: string
  lastName: string
  status: string
  email: string
}

const ContactCard: React.FC<ConatctCardProps> = ({ id, firstName, lastName, email, status }) => {
  const dispatch = useDispatch();
  const { contactList } = useSelector((state: any) => state.app)


  const handleAddContact = () => {
    const selectedUserData = contactList?.[id];
    dispatch(setUserDetails({
      id,
      ...selectedUserData
    }));
    dispatch(setTitle('Edit Contact Details'));
    dispatch(setModalState(true));
  };

  const handleDeleteContact = () => {
    const newData = [...contactList];
    newData.splice(id, 1);
    dispatch(setContactData(newData));
  };

  return (
    <div className="xl:w-1/3 md:w-1/2 w-full p-2 md:p-4">
      <div className={`relative bg-neutral-800 border p-6 rounded-lg ${status === 'Active' ? 'border-gray-200' : 'border-red-300'}`}>
        <div className="absolute top-[12px] right-[12px]">
          <div className="flex gap-3">
            <button onClick={handleAddContact} className='text-green-300 hover:scale-110 hover:text-green-500'>
              <MdModeEdit size={20} />
            </button>
            <button onClick={handleDeleteContact} className='text-red-300 hover:scale-110 hover:text-red-500'>
              <IoCloseSharp size={22} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-200 text-blue-500">
            <BsPerson size={24} />
          </div>
          <div className='w-full'>
            <h2 className="md:text-lg font-medium title-font truncate w-full">{firstName} &nbsp; {lastName}</h2>
            <p className="leading-relaxed text-base">Status : {status}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactCard;