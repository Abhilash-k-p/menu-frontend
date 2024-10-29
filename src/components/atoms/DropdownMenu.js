import React from 'react';

const DropdownMenu = ({ value, menus, onSelect}) => {

    const handleSelect = (event) => {
        const selectedMenu = menus.find(menu => menu.id === event.target.value);
        onSelect(selectedMenu);
    };
    
    return (
        
        <select
            value={value}
            className="border border-gray-300 rounded-lg px-4 py-2"
            onChange={handleSelect}
        >
            <option value=""> --Create Root Menu-- </option>
            {menus?.map(menu => (
                <option key={menu.id} value={menu.id}>
                    {menu.name}
                </option>
            ))}
        </select>
    );
};

export default DropdownMenu;
