import { useEffect, useContext } from 'react';
import { SettingsContext } from './settingsContext';

export default function LoadLists({ archive, onLoading, onError, onLoadLists }){
    const { userId } = useContext(SettingsContext);

    useEffect(() => {
        if(!userId) return;
        onLoading();
        fetch(`http://localhost:3000/api/shoppinglist/list?user=${userId}&archived=${archive}`, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            if(data.message){
                onError(data.message, data.code);
            } else {
                onLoadLists(data);
            }
        }).catch(error => {
            onError(error.message, error.code);
        });
    }, [userId, archive, onLoading, onError, onLoadLists]);


    return null;
}