import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {isChildFormState, selectedMenuState} from '../../recoil/menu';

const MenuTree = ({ menu, depth = 0, isLastChild = false, expandedNodes, onNodeToggle }) => {
    const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
    const [, setIsChildForm] = useRecoilState(isChildFormState);
    const [isHovered, setIsHovered] = useState(false);
    const isExpanded = expandedNodes.has(menu.id);

    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div className="relative">
            {/* Right-angle line rendering */}
            {depth > 0 && (
                <div
                    className={`absolute left-0 top-0 border-l border-gray-400 ${isLastChild ? 'h-3' : 'h-full'}`}
                    style={{ transform: 'translateX(-1rem)' }}
                />
            )}

            <div className="flex items-center space-x-1 relative">
                {/* Horizontal Line */}
                {depth > 0 && (
                    <span
                        className="absolute left-0 top-3 w-4 border-t border-gray-400"
                        style={{ transform: 'translateX(-1rem)' }}
                    />
                )}

                {/* Expand/Collapse Icon */}
                {menu.children?.length > 0 ? (
                    <svg
                        onClick={() => onNodeToggle(menu)}
                        className="w-4 h-4 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isExpanded ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9l7 7 7-7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        )}
                    </svg>
                ) : (
                    <div className="text-center w-4"> - </div>
                )}

                {/* Menu Name (Click to Select) */}
                <div className="flex items-center space-x-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <span
                        onClick={() => {
                            setSelectedMenu(menu);
                            setIsChildForm(false)
                        }}
                        className={`cursor-pointer transition-colors ${selectedMenu?.id === menu.id ? 'text-blue-600 font-bold' : ''} ${
                            isHovered ? 'text-blue-600' : ''
                        }`}
                    >
                        {menu.name}
                    </span>
                    <span>
                        {isHovered && (
                            <svg
                                onClick={() => { 
                                    setSelectedMenu(menu);
                                    setIsChildForm(true)
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                stroke="white"
                                className="w-6 h-6 cursor-pointer"
                            >
                                <circle cx="12" cy="12" r="10" fill="#2563EB"/> {/* Blue circle */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
                            </svg>
                        )}
                    </span>
                </div>
            </div>

            {/* Render Children if Expanded */}
            {isExpanded && (menu.children?.length > 0) && (
                <div className="ml-6 mt-2 relative">
                    {menu.children?.map((child, index) => (
                        <MenuTree
                            key={child.id}
                            menu={child}
                            depth={depth + 1}
                            isLastChild={index === menu.children?.length - 1}
                            expandedNodes={expandedNodes}
                            onNodeToggle={onNodeToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuTree;