import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setModalState } from '../redux/action/appActions';

interface AddContactModalProps {
    isOpen: boolean
    onChange: (open: boolean) => void
    title: string
    children: React.ReactNode
}

const AddContact: React.FC<AddContactModalProps> = ({ isOpen, title, children, onChange }) => {
    const dispatch = useDispatch();

    const handleAddContact = () => {
        dispatch(setModalState(false));
    };

    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-neutral-900/50 backdrop-blur-sm fixed inset-0' />
                <Dialog.Content className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none max-h-full h-full md:h-auto md:max-h-[80vh]">
                    <Dialog.Title className='text-lg font-bold mb-4 text-center'>
                        {title}
                    </Dialog.Title>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button onClick={handleAddContact} className='text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex w-[25px] h-[25px] appearance-none justify-center items-center rounded-full focus:outline-none'>
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default AddContact;