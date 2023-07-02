import React from 'react'
import { Outlet } from 'react-router-dom';
import Modal from './Modal';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import ContactForm from './ContactForm';

const Layout = () => {
    const { openModal, title } = useSelector((state: any) => state.app);
    return (
        <div>
            <Modal title={title} isOpen={openModal} onChange={() => console.log('Form')}>
                <ContactForm />
            </Modal>
            <Sidebar>
                <Outlet />
            </Sidebar>
        </div>
    )
}

export default Layout;