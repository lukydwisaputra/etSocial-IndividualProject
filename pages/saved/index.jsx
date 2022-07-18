import React from 'react';
import MenubarComponent from '../../components/menubar/MenubarComponent';

function SavedPage() {
    const desktop = 'd-none d-sm-none d-md-none d-lg-block'
    
    return ( 
        <>
            <div className={desktop}>
                <MenubarComponent title={'Savéd'} /> 
            </div>
        </>
    );
}

export default SavedPage;