import { useEffect, useState } from 'react';

export default function CreateNewList ({ data, onCreate, onError, onLoading }) {
    const [ currentListsLength, setCurrentListsLength ] = useState(null);
    const [ hasRun, setHasRun ] = useState(false);

    useEffect(() => {
        if(hasRun) return;
        onLoading();
        fetch('http://localhost:3000/api/shoppinglist/list', {
            method: "GET"
        }).then(response => { return response.json(); })
        .then(data => {
            console.log(data.length);
            if(!data.length){
                setCurrentListsLength(0);
            } else {setCurrentListsLength(data.length);}
        }).catch(error => {
            onError(error.message, error.code);
        });
    }, [onError, onLoading, hasRun]);

    useEffect(() => {
        if(hasRun) return;
        if(!currentListsLength || !data) return;
        const list = {
            id: String(currentListsLength + 1),
            name: data.name,
            owner: data.owner,
            archived: false,
            members: [],
            items: []
        }
        setHasRun(true);
        fetch('http://localhost:3000/api/shoppinglist/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ list: list })
        }).then(response => { return response.json(); })
        .then(data => {
            onCreate();
        }).catch(error => {
            onError(error.message, error.code);
        });
    }, [data, currentListsLength, onCreate, onError, hasRun]);

    return null;
}