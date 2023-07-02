import React, { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { AiOutlineDotChart } from 'react-icons/ai';
import { RiContactsFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';

interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const { pathname } = useLocation();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname === '/',
            href: '/',
        },
        {
            icon: RiContactsFill,
            label: 'Contact',
            active: pathname === '/contacts',
            href: '/contacts',
        },
        {
            icon: AiOutlineDotChart,
            label: 'Charts & Maps',
            active: pathname === '/charts',
            href: '/charts',
        },
    ], [pathname]);

    return (
        <div className="flex h-full flex-col md:flex-row">
            <div
                className="flex flex-col gap-y-2 bg-black h-full w-full md:w-[300px] p-2"
            >
                <div className='bg-neutral-900 rounded-lg w-full overflow-y-auto h-full'>
                    <div className="flex flex-col gap-y-6 py-5 px-4 ">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </div>
            </div>
            <main className='h-full overflow-y-auto p-2 flex-1'>
                <div className='bg-neutral-900 h-[98vh] w-full rounded-lg overflow-hidden overflow-y-auto py-4 px-4 md:px-8'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Sidebar;