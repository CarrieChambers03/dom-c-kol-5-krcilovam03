import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import { SettingsContext } from "../helpers/settingsContext.js";

import Header from "../components/dashboard/header.jsx";
import MainBody from "../components/dashboard/mainBody.jsx";

import UpdateList from "../helpers/updateList.js";
import DeleteList from "../helpers/deleteList.js";

import "./dashboard.css";

export default function Dashboard({ users }){
    const { darkMode } = useContext(SettingsContext);
    const [isMobile, setIsMobile] = useState(false);
    const [showArchive, setShowArchive] = useState(false);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updateLists, setUpdateLists] = useState(false);
    const [deleteList, setDeleteList] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 426px)').matches);
        };

        // Add the resize event listener
        window.addEventListener('resize', handleResize);

        // Call handleResize initially in case the initial state needs adjustment
        handleResize();

        // Cleanup the listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(<div className={`dashboard${darkMode ? ' dark' : ''}`}>
        {updateLists && <UpdateList list={updateLists.list} change={
            updateLists.action === 'leave' ? 'members' : 'archive'
        } action={updateLists.action === 'leave' ? 'delete' : null} data={
            updateLists.action === 'leave' ? { id: updateLists.user } : null
        } onUpdateList={() => {
            setUpdateLists(false);
            setLoading(false);
            setError(null);
            setReload(!reload);
        }} onError={(msg, code) => {
            setError(msg);
            setLoading(false);
            setUpdateLists(false);
        }} onLoading={() => setLoading(true)} />}
        {deleteList && <DeleteList list={deleteList.list} onDeleteList={() => {
            setDeleteList(false);
            setLoading(false);
            setError(null);
            setReload(!reload);
        }} onError={(msg, code) => {
            setError(msg);
            setLoading(false);
            setDeleteList(false);
        }} onLoading={() => setLoading(true)} />}

        {loading && <div className='loading'><PulseLoader color={darkMode ? 'rgb(95, 95, 250)' : 'blue'} loading={loading} size={15} /></div>}
        {error && <div className="error">{error}<Link to='/'>Back to menu</Link></div>}

        <Header users={users} isMobile={isMobile} onChangePage={() => setShowArchive(!showArchive)} archive={showArchive} />
        <MainBody archive={showArchive} onChange={(action, list, userId) => {
            action === 'delete' ? setDeleteList({list: list}): setUpdateLists({action: action, list: list, user: userId});
        }} reload={reload} />
    </div>)
}