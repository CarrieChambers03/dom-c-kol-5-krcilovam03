import { useContext, useEffect } from 'react';
import { SettingsContext } from './settingsContext';

export default function DeleteList({ list, onDeleteList, onError, onLoading }){
    const { userId } = useContext(SettingsContext);

    useEffect(() => {
        if(!list || !userId) return;
        onLoading();
        fetch(`http://localhost:3000/api/shoppinglist/delete?id=${list.id}&user=${userId}`, {
            method: 'DELETE'
        }).then(response => {
            return response.json();
        }).then(data => {
            if(data.message){
                return data.message === 'Second delete' ? null : onError(data.message, data.code);
            } else {
                onDeleteList();
            }
        }).catch(error => {
            onError(error.message, error.code);
        });
    }, [list, userId, onDeleteList, onError, onLoading]);

    return null;
}