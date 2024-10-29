import { atom } from 'recoil';

export const selectedMenuState = atom({
    key: 'selectedMenuState',
    default: null,
});

export const isChildFormState = atom({
    key: 'isChildFormState',
    default: false,
});