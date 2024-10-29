import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const fetchMenus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menus`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch menus');
    }
};

export const createMenu = async (menuData) => {
    const response = await axios.post(`${API_BASE_URL}/menus`, menuData);
    return response.data;
};

export const updateMenu = async (menuId, menuData) => {
    const response = await axios.put(`${API_BASE_URL}/menus/${menuId}`, menuData);
    return response.data;
};

export const deleteMenu = async (menuId) => {
    const response = await axios.delete(`${API_BASE_URL}/menus/${menuId}`);
    return response.data;
};