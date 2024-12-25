import { useEffect, useContext, useState } from "react";
import { SettingsContext } from "./settingsContext.js";

export default function UpdateList({ list, change, action, data, onUpdateList, onError, onLoading }){
    const { userId } = useContext(SettingsContext);
    const [ updatedList, setUpdatedList ] = useState(null);
    
    useEffect(() => {
        if(!list || !userId) return;
        if(change === 'items'){
            if(action === 'del') setUpdatedList({...list, items: list.items.filter(i => i.name !== data.name), action: "item"});
            else if(action === 'inc') setUpdatedList({...list, items: list.items.map(i => i.name === data.name ? {...i, quantity: i.quantity + 1} : i), action: "item"});
            else if(action === 'dec') setUpdatedList({...list, items: list.items.map(i => i.name === data.name ? {...i, quantity: i.quantity - 1} : i), action: "item"});
            else if(action === 'checked') setUpdatedList({...list, items: list.items.map(i => i.name === data.name ? {...i, state: 'checked'} : i), action: "item"});
            else if(action === 'active') setUpdatedList({...list, items: list.items.map(i => i.name === data.name ? {...i, state: 'active'} : i), action: "item"});
            else if(action === 'add'){
                let item = list.items.find(i => i.name === data.name);
                if(item){
                    if(item.state === 'checked'){
                        item.state = 'active';
                        item.quantity = data.quantity;
                    } else {
                        item.quantity += data.quantity;
                    }
                    setUpdatedList({...list, items: list.items.map(i => i.name === data.name ? item : i), action: "item"});
                } else {
                    setUpdatedList({...list, items: [...list.items, data], action: "item"});
                }
            }
        } else if(change === 'archive') setUpdatedList({...list, archived: !list.archived});
        else if(change === 'name') setUpdatedList({...list, name: data.name});
        else if(change === 'members'){
            if(action === 'delete' && data.id === userId){
                setUpdatedList({...list, members: list.members.filter(m => m !== data.id), action: "deleteSelf"});
            } else if(action === 'invite'){
                setUpdatedList({...list, members: [...list.members, data.id]});
            } else {
                setUpdatedList({...list, members: list.members.filter(m => m !== data.id)});
            }
        }
    }, [list, userId, change, action, data]);

    useEffect(() => {
        if(!updatedList) return;
        onLoading();
        fetch('http://localhost:3000/api/shoppinglist/update', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ id: list.id, list: updatedList, user: userId })
        }).then(response => { return response.json(); })
        .then(data => {
            onUpdateList();
        }).catch(error => {
            onError(error.message, error.code);
        });
    }, [updatedList, list.id, onUpdateList, onError, onLoading, userId]);

    return null;
}