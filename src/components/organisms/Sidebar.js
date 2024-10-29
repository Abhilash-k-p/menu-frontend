import React, { useState } from "react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-dark-blue text-white transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="p-4">
                    {/* Logo and Close Button for Mobile */}
                    <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold">
              CLO<span className="text-green-400">IT</span>
            </span>
                        <button
                            className="text-xl md:hidden focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            &times;
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav>
                        <ul>
                            <li className="mb-2">
                                <a
                                    className="flex items-center px-4 py-2 rounded-lg bg-dark-green text-white hover:bg-green-400"
                                >
                                    <span className="mr-3">📋</span>Menus
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="p-2 ml-0 md:ml-64">
                {/* Toggle Button for Mobile */}
                <button
                    className="p-2 bg-green-400 rounded text-white md:hidden"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
            </div>
        </div>
    );
}

export default Sidebar;