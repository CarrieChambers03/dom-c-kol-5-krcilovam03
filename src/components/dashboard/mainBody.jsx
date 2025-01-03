import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faBox, faBoxOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from 'react-spinners';

import { SettingsContext } from "../../helpers/settingsContext";
import { languages } from "../../helpers/languages";

import LoadLists from "../../helpers/loadLists";
import CreateNewList from "../../helpers/createNewList";

import "./mainBody.css";

export default function MainBody ({ archive, onChange, reload }) {
    const { userId, lang, darkMode } = useContext(SettingsContext);

    const [userLists, setUserLists] = useState([]);
    const [showNewListForm, setShowNewListForm] = useState(false);
    const [newList, setNewList] = useState("");

    const [loadLists, setLoadLists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const [ action, setAction ] = useState(null);
    const [createNewList, setCreateNewList] = useState(null);

    useEffect(() => {
        setLoadLists(true);
    }, [archive, reload]);

    return(<div className={`mainBody${darkMode ? ' dark' : ''}`}>

        {loadLists && <LoadLists archive={archive} onLoadLists={(lists) => {
            setUserLists(lists);
            setLoadLists(false);
            setLoading(false);
            setError(null);
        }} onError={(msg, code) => {
            setError(msg);
            setLoading(false);
            setLoadLists(false);
        }} onLoading={() => setLoading(true)} />}

        {createNewList && <CreateNewList data={createNewList} onCreate={() => {
            setCreateNewList(null);
            setLoadLists(true);
            setLoading(false);
            setError(null);
        }} onError={(msg, code) => {
            setError(msg);
            setLoading(false);
            setCreateNewList(null);
        }} onLoading={() => setLoading(true)} />}

        {loading && <div className='loading'><PulseLoader color={darkMode ? 'rgb(95, 95, 250)' : 'blue'} loading={loading} size={15} /></div>}
        {error && <div className="error">{error}<Link to='/'>{languages[lang].backToSettings}</Link></div>}

        {showNewListForm && <div>
            <div className={`backdrop${darkMode ? ' dark' : ''}`} onClick={() => setShowNewListForm(false)}></div>
            <div className="newListForm">
                <input type="text" value={newList} onChange={(e) => setNewList(e.target.value)} />
                <div className="buttons">
                    <button onClick={() => setShowNewListForm(false)}>{languages[lang].cancel}</button>    
                    <button className="confirm" onClick={() => {
                        setCreateNewList({name: newList, owner: userId});
                        setShowNewListForm(false);
                        setNewList("");
                    }}>{languages[lang].create}</button>
                </div>
            </div>
        </div>}

        {showConfirmation && <div>
            <div className='backdrop'></div>
            <div className='confirmation'>
                <h3>{languages[lang].confirmation.replace("{action}", languages[lang][action.a])}</h3>
                <div className='buttons'>
                    <button className='cancel' onClick={() => {setShowConfirmation(false); setAction(null)}}>{languages[lang].cancel}</button>
                    <button className='confirm' onClick={() => {
                        setShowConfirmation(false);
                        setAction(null);
                        onChange(action.a, action.list, userId)
                    }}>{languages[lang][action.a]}</button>
                </div>
            </div>    
        </div>}

        <div className={`lists`}>
            {userLists.map(list => {
                return <div className={`list${darkMode ? ' dark' : ''}`} key={list.id}>
                    <Link to={`/detail/${list.id}`} ><label className={`listTile${darkMode ? ' dark' : ''}`}>{list.name.length > 33 ? `${list.name.substring(0, 30)}...` : list.name}</label></Link>
                    {list.owner === userId &&
                    <div> 
                        {archive ? <FontAwesomeIcon onClick={() => {setAction({a: 'unarchive', list: list}); setShowConfirmation(true);}} icon={faBoxOpen} />
                        : <FontAwesomeIcon icon={faBox} onClick={() => { setAction({a: "archive", list: list}); setShowConfirmation(true);}} />}
                    </div>
                    }

                    <FontAwesomeIcon icon={faTrash} onClick={() => {
                        list.owner === userId ? setAction({a: 'delete', list: list}) : setAction({a: 'leave', list: list})
                        setShowConfirmation(true);
                    }} />
                </div>
            })}
        </div>
        <FontAwesomeIcon onClick={() => setShowNewListForm(true)} icon={faCirclePlus} className={`addList${darkMode ? ' dark' : ''}`} />
    </div>)
}