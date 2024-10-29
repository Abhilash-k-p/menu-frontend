import React, { useState } from 'react';
import Sidebar from '../organisms/Sidebar';
import DropdownMenu from '../atoms/DropdownMenu';
import MenuDetails from '../organisms/MenuDetails';
import MenuTreeWrapper from "../organisms/MenuTreeWrapper";
import { useMenus } from "../../hooks/useMenus";
import {useRecoilState, useRecoilValue} from "recoil";
import {isChildFormState, selectedMenuState} from "../../recoil/menu";

const MenuPage = () => {

    const { menus, error, getMenus } = useMenus();
    const [selectedDropdownMenu, setSelectedDropdownMenu] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());
    const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
    const isChildForm = useRecoilValue(isChildFormState);
    
    const handleMenuSelection = (dropDownMenu) => {
        setSelectedDropdownMenu(dropDownMenu);
        setSelectedMenu(null);
        setExpandedNodes(new Set());
    }
    
    const onFormSubmit = (updatedMenuAndPathData) => {
        getMenus().then((data) => {
            const pathToNode = updatedMenuAndPathData?.pathToNode ?? [];
            !selectedDropdownMenu && setSelectedDropdownMenu(updatedMenuAndPathData?.menu);
            if (isChildForm || selectedMenu) {
                setSelectedDropdownMenu(data.find(menu => menu.id === selectedDropdownMenu.id));
                expandPathToNode(pathToNode);
            }
            setSelectedMenu(null);
        });
    }

    const expandPathToNode = (pathToNode) => {
        setExpandedNodes((prevExpanded) => {
            const newExpanded = new Set(prevExpanded);
            pathToNode.forEach((nodeId) => newExpanded.add(nodeId));
            return newExpanded;
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-3/4 p-6">
                {/* Title and Icon */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z"/>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold text-gray-900">Menus</h1>
                    </div>
                </div>
                
                <div className="mt-4 flex flex-col space-y-4">
                    {/* Dropdown Menu */}
                    <div className="md:w-1/2 w-full">
                        <DropdownMenu value={selectedDropdownMenu?.id} menus={menus} onSelect={handleMenuSelection} />
                        {error && (<span className="ml-4 text-red-500">{error}</span>)}
                    </div>
                    
                    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-10">
                        {/* Menu Tree */}
                        {selectedDropdownMenu && <MenuTreeWrapper
                            key={selectedDropdownMenu?.updated_at}
                            selectedMenu={selectedDropdownMenu}
                            expandedNodes={expandedNodes}
                            setExpandedNodes={setExpandedNodes}
                        />}

                        {/* Menu create/edit */}
                        { (!selectedDropdownMenu || selectedMenu) && <MenuDetails mode={(selectedMenu && !isChildForm) ? 'edit' : 'create'} onFormSubmit={onFormSubmit} /> }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;