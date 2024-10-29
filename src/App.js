import React from 'react';
import { RecoilRoot } from 'recoil';
import MenuPage from './components/templates/MenuPage';

function App() {
    return (
        <RecoilRoot>
            <MenuPage />
        </RecoilRoot>
    );
}

export default App;
