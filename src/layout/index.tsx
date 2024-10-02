import React, { useState } from 'react'
import Sidebar from "./sidebar"
import Header from './header'

type LayoutProps = {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className=''>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='lg:w-[calc(100%-320px)] lg:ml-[320px] w-full ml-0'>
                <Header isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className='pt-[65px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout