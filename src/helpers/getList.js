import { useContext, useEffect } from "react";
import { SettingsContext } from "./settingsContext.js";

export default function GetList({ id, onSuccess, onError, onLoading }){
    const { userId } = useContext(SettingsContext);

    useEffect(() => {
        if(!id || !userId) return;
        onLoading();
        fetch(`http://localhost:3000/api/shoppinglist/get?id=${id}&user=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if(data.message){
                if(data.code === 403){
                    onError("You are not allowed to view this list.");
                } else if(data.code === 404){
                    onError("List not found.");
                } else {
                    onError(data.message, data.code);
                }
            } else {
                onSuccess(data);
            }
        }).catch(error => {
            onError(error.message, error.code);
        });
    }, [id, userId, onSuccess, onError, onLoading]);

    return null;
}