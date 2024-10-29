import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMenuState } from '../../recoil/menu';
import {createMenu, deleteMenu, updateMenu} from "../../services/menuService";
import Button from "../atoms/Button";

const MenuDetails = ({ onFormSubmit, mode = 'create'}) => {
    const selectedMenu = useRecoilValue(selectedMenuState);
    const [error, setError] = useState('');
    const initialMenuData = {
        id: '',
        parent_id: '',
        name: '',
        depth: '',
        parent: {
            id: '',
            name: '',
        }
    }
    const [menuData, setMenuData] = useState(selectedMenu ?? initialMenuData);

    useEffect(() => {
        if (mode === 'edit') {
            setMenuData(selectedMenu);
        } else {
            initialMenuData.parent_id = selectedMenu?.id;
            initialMenuData.parent.name = selectedMenu?.name;
            initialMenuData.depth = selectedMenu?.depth === undefined ? 0 : (selectedMenu?.depth + 1);
            setMenuData(initialMenuData);
        }
    }, [selectedMenu, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenuData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'edit') {
                onFormSubmit(await updateMenu(menuData.id, menuData));
            } else {
                onFormSubmit((await createMenu(menuData)));
            }
        } catch (error) {
            setError('Error saving menu: ' +  error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            onFormSubmit(await deleteMenu(menuData.id));
        } catch (error) {
            setError('Error saving menu: ' +  error.message);
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-md md:w-1/2 w-full">
            <h3 className="text-xl font-bold">{mode === 'edit' ? 'Edit Menu' : 'Create Menu'}</h3>
            {mode === 'edit' && (<div className="mt-4">
                <label className="block text-sm font-medium">Menu ID</label>
                <input
                    name="id"
                    className="border w-full rounded-lg px-4 py-2 mt-1"
                    value={menuData.id}
                    disabled={mode === 'edit'} // Disable ID field in edit mode
                />
            </div>)}
            { menuData?.parent_id ? (<div className="mt-4">
                <label className="block text-sm font-medium">Parent Menu Name</label>
                <input
                    name="parent_id"
                    className="border w-full rounded-lg px-4 py-2 mt-1"
                    value={menuData?.parent?.name}
                    disabled={true} // Disable ID field in edit mode
                />
            </div>) : (<div className="border w-full rounded-lg px-4 py-2 mt-4 bg-slate-100">Root Menu</div>) }
            <div className="mt-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                    name="name"
                    className="border w-full rounded-lg px-4 py-2 mt-1"
                    value={menuData.name}
                    onChange={handleChange} // Handle changes for the name field
                />
            </div>
            {mode === 'edit' && (<div className="mt-4">
                <label className="block text-sm font-medium">Depth</label>
                <input
                    name="depth"
                    className="border w-full rounded-lg px-4 py-2 mt-1"
                    value={menuData.depth}
                    onChange={handleChange} // Handle changes for the depth field
                    disabled={true} // Disable depth field in edit mode
                />
            </div>)}
            { error && <span className="text-red-500">{error}</span> }
            <Button
                onClick={handleSubmit}
                label={mode === 'edit' ? 'Update' : 'Create'}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            />
            { mode === 'edit' && <Button
                onClick={handleDelete}
                label="Delete"
                className="mt-6 ml-4 bg-red-500 text-white px-4 py-2 rounded"
            /> }
        </div>
    );
};

export default MenuDetails;