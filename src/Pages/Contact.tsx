import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState, setTitle, setUserDetails } from '../redux/action/appActions';
import { isEmpty } from 'lodash'
import ContactCard from '../Components/ContactCard';

const Contact = () => {
    const dispatch = useDispatch();
    const { contactList } = useSelector((state: any) => state.app);

    const handleAddContact = () => {
        dispatch(setTitle('Create New Contact'));
        dispatch(setUserDetails({}));
        dispatch(setModalState(true));
    };

    return (
        <div className='h-full'>
            <div className='w-full flex justify-between items-center mb-4 py-3'>
                <div>
                    <h1 className='text-lg md:text-2xl font-medium truncate'>List of Contacts</h1>
                </div>
                <div>
                    <button onClick={handleAddContact} className="w-full rounded-full py-1 px-3 bg-white hover:opacity-75 text-black font-bold uppercase">
                        Create
                    </button>
                </div>
            </div>
            <hr className='py-6' />
            <div className="flex flex-wrap">
                {
                    !isEmpty(contactList)
                        ? contactList?.map((item: any, id: number) => (
                            <ContactCard key={id} id={id} firstName={item.firstName} lastName={item.lastName} email={item.email} status={item.status} />
                        ))
                        : <p className='text-lg text-red-400'>No Contacts found! Please Create new contact.</p>
                }
            </div>
        </div>
    )
}

export default Contact;