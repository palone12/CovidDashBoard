import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
    icon: IconType
    label: string
    active?: boolean
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, active, href }) => {
    return (
        <Link to={href} className={`flex flex-row items-center w-full h-auto gap-x-4 text-md font-medium cursor-pointer hover:text-white transition ${active ? 'text-white' : 'text-neutral-400'}`}>
            <Icon size={22} />
            <p className='truncate w-100'>{label}</p>
        </Link>
    )
}

export default SidebarItem;