import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//visual components
import ListHeader from '../components/detail/listHeader.jsx';
import ListSettings from '../components/detail/listSettings.jsx';
import ItemList from '../components/detail/itemList.jsx';
import MemberList from '../components/detail/memberList.jsx';
import { PulseLoader } from 'react-spinners';

//helpers
import GetList from '../helpers/getList.js';
import UpdateList from '../helpers/updateList.js';
import DeleteList from '../helpers/deleteList.js';
import { ListContext } from '../helpers/listContext.js';

import './detail.css';

export default function Detail({ users }){
    const { id } = useParams();

    const [ showSettings, setShowSettings ] = useState(false);
    const [ showMembers, setShowMembers ] = useState(false);

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ loadLists, setLoadLists ] = useState(false);
    const [ updateList, setUpdateList ] = useState(null);
    const [ deleteList, setDeleteList ] = useState(null);

    const [ listContext, setListContext ] = useState({
        filterSetting: false,
        list: null,
        isMobile: false
    });

    useEffect(() => {
        setListContext(prevContext => ({
            ...prevContext,
            isMobile: window.matchMedia('(max-width: 426px)').matches
        }));
    }, []);

    useEffect(() => {
        setLoadLists(true);
    }, [id])

    const changeMembers = (action, changeId) => {
        setUpdateList({
            change: "members",
            action: action,
            data: {
                id: changeId
            }
        });
    }

    return(
        <div>
            {loadLists &&
                <GetList id={id} onSuccess={(list) => {
                    setLoadLists(false);
                    setListContext(prevContext => ({
                        ...prevContext,
                        list: list
                    }));
                    setLoading(false);
                    setError(null);
                }} onError={(msg) => {setLoadLists(false); setLoading(false); setError(msg)}} onLoading={() => setLoading(true)} />
            }
            {updateList && 
                <UpdateList
                    list={listContext.list}
                    change={updateList.change}
                    action={updateList.action}
                    data={updateList.data}
                    onUpdateList={() => {
                        setUpdateList(null);
                        setLoading(false);
                        setLoadLists(true);
                    }}
                    onError={(msg, code) => {
                        setUpdateList(null);
                        setError(msg);
                    }}
                    onLoading={() => setLoading(true)} />
            }
            {deleteList &&
                <DeleteList list={listContext.list} onDeleteList={() => {
                    setDeleteList(null);
                    setLoading(false);
                    setListContext({
                        ...listContext,
                        list: null
                    })
                    setLoadLists(true);
                }} onError={(msg, code) => {
                    setDeleteList(null);
                    setLoading(false);
                    setError(msg);
                }} onLoading={() => setLoading(true)} />
            }


            {loading && <div className='loading'><PulseLoader color='blue' loading={loading} size={15} /></div>}

            {error && <div className='error'>{error}<Link to='/home'>Back to dashboard</Link></div>}
            
            {listContext.list && 
                <div className="detail">
                    <ListContext.Provider value={listContext}>
                        <ListHeader onIconClick={(icon) => {
                            if(icon === 'settings') setShowSettings(true);
                            if(icon === 'members') setShowMembers(true);
                        }} />

                        {showSettings && <div>
                            <div className='backdrop'></div>
                            <ListSettings onClose={(fiter, action, newName) => {
                                if(action === 'delete'){
                                    setDeleteList(true);
                                } else if (action === 'archive' || action === 'unarchive'){
                                    setUpdateList({
                                        change: "archive"
                                    });
                                } else if (action === 'nameChange'){
                                    setUpdateList({
                                        change: "name",
                                        data: {
                                            name: newName
                                        }
                                    })
                                }
                                setListContext({
                                    ...listContext,
                                    filterSetting: fiter
                                });
                                setShowSettings(false);
                            }} />
                        </div>}
                    
                    <div className='content'>
                            <ItemList onItemChange={(itemName, action, quantity) => {
                                setUpdateList({
                                    change: "items",
                                    action: action,
                                    data: {
                                        name: itemName,
                                        quantity: quantity
                                    }
                                })
                            }} />

                            {listContext.isMobile ? <div>
                                {showMembers && (<div>
                                    <div className='membersBackdrop' onClick={() => setShowMembers(false)}></div>
                                    <MemberList users={users} onMemberChange={changeMembers} />
                                </div>)}
                            </div> : <MemberList users={users} onMemberChange={changeMembers} />}
                    </div>
                    </ListContext.Provider>
                </div>
            }
        </div>
    );
}