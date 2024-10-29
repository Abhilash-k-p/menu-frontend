import { useState, useEffect } from 'react';
import { fetchMenus } from '../services/menuService';


export const useMenus = () => {
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState(null);
    const getMenus = async () => {
        try {
            const data = await fetchMenus();
            setMenus(data);
            return data;
        } catch (err) {
            setError(err.message);
        }
    };
    useEffect(() => {
        getMenus();
    }, []);  // Empty dependency array ensures it runs only on mount

    return { menus, error, getMenus };
};
