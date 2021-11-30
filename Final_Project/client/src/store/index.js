import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ALL_LISTS: "LOAD_ALL_LISTS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_ITEM_EDIT_INACTIVE: "SET_ITEM_EDIT_INACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    LOG_OUT: "LOG_OUT",
    LIKE: "LIKE",
    DISLIKE: "DISLIKE",
    PUBLISH_CURRENT_LIST: "PUBLISH_CURRENT_LIST",
    EXPAND_LIST: "EXPAND_LIST",
    COMMENT: "COMMENT",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentList: null,
        currentAllLists: [],
        currentFiltered: [],
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        listsExpanded: [],
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentList: null,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    currentList: payload,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ALL_LISTS: {
                return setStore({
                    currentList: null,
                    currentAllLists: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentList: null,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    currentList: null,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentList: payload,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    currentList: store.currentList,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_INACTIVE: {
                return setStore({
                    currentList: store.currentList,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentList: payload,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // LOGOUT
            case GlobalStoreActionType.LOG_OUT: {
                return setStore({
                    currentList: null,
                    currentAllLists: [],
                    newListCounter: 0,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                });
            }
            case GlobalStoreActionType.LIKE: {
                return setStore({
                    currentList: null,
                    currentAllLists: payload,
                    newListCounter: 0,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                    listsExpanded: store.listsExpanded,
                })
            }
            case GlobalStoreActionType.DISLIKE: {
                return setStore({
                    currentList: null,
                    currentAllLists: payload,
                    newListCounter: 0,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                    listsExpanded: store.listsExpanded,
                })
            }
            case GlobalStoreActionType.PUBLISH_CURRENT_LIST: {
                return setStore({
                    currentList: payload,
                    currentAllLists: store.currentAllLists,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                    //listsExpanded: payload.listsExpanded,
                })
            }
            case GlobalStoreActionType.EXPAND_LIST: {
                return setStore({
                    currentList: null,
                    currentAllLists: store.currentAllLists,
                    newListCounter: 0,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                    listsExpanded: payload,
                })
            }
            case GlobalStoreActionType.COMMENT: {
                return setStore({
                    currentList: null,
                    currentAllLists: store.currentAllLists,
                    newListCounter: 0,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                    listsExpanded: store.listsExpanded,
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        //this.loadAllLists();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        history.push('/');
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            itemTuples: [],
            ownerEmail: auth.user.email,
            published: null,
            communityList: false,
            likes: 0,
            likedBy: [],
            dislikes: 0,
            dislikedBy: [],
            views: 0,
            comments: [],
            commensBy: [],
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
            this.setCurrentList(response.data.top5List._id)
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            //history.push("/top5list/" + newList._id);
            //this.setCurrentList()
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadAllLists = async function () {
        const response = await api.getTop5Lists();
        if (response.data.success) {
            let lists = response.data.lists;
            let newArray = [];
            for (let key in lists) {
                if (lists[key].ownerEmail === auth.user.email && !lists[key].communityList)
                    newArray.push(lists[key]);
            }
            console.log(newArray);
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_LISTS,
                payload: newArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        if (listToDelete.published) {
            const response = await api.getTop5Lists();
            if (response.data.success) {
                let lists = response.data.lists;
                let found = null;
                for (let key in lists) {
                    if (lists[key].communityList && lists[key].name === listToDelete.name) {
                        found = lists[key];
                        break;
                    }
                }
                if (found) {
                    console.log("deleting?")
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < found.itemTuples.length; j++) {
                            if (found.itemTuples[j][0] === listToDelete.items[i]) {
                                found.itemTuples[j][1] -= 5 - i;
                                if (found.itemTuples[j][1] === 0) {
                                    found.itemTuples.splice(j, 1);
                                    found.items.splice(found.items.indexOf(listToDelete.items[i], 1));
                                }
                                break;
                            }
                        }
                    }
                    if (found.items.length === 0) {
                        let response = await api.deleteTop5ListById(found._id);
                        if (response.data.success) {
                            console.log("community list deleted");
                            let response = await api.deleteTop5ListById(listToDelete._id);
                            if (response.data.success) {
                                store.loadAllLists();
                                history.push("/");
                            }
                        }
                    }
                    else {
                        found.itemTuples.sort((a, b) => {
                            return a[1] > b[1] ? -1 : (a[1] === b[1] ? (a[0] > b[0] ? 1 : -1) : 1)
                        })
                        console.log("deleting2?")
                        let response = await api.updateTop5ListById(found._id, found);
                        if (response.data.success) {
                            let response = await api.deleteTop5ListById(listToDelete._id);
                            if (response.data.success) {
                                store.loadAllLists();
                                history.push("/");
                            }
                        }
                    }
                }
            }
        }
        else {
            let response = await api.deleteTop5ListById(listToDelete._id);
            if (response.data.success) {
                store.loadAllLists();
                history.push("/");
            }
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        //store.updateCurrentList();
    }

    store.saveCurrentList = async function (title) {
        store.currentList.name = title;
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
            this.closeCurrentList();
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setIsItemEditInactive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_INACTIVE,
            payload: null
        });
    }

    store.publishCurrentList = async function() {
        let lists = store.currentAllLists;
        let found = false;
        for (let key in lists) {
            if (lists[key].published !== null && lists[key].name === store.currentList.name) {
                found = true;
                break;
            }
        }
        if (found) {
            // show error
        }
        else {
            const response = await api.getTop5Lists();
            if (response.data.success) {
                let lists1 = response.data.lists;
                let found1 = null;
                for (let key in lists1) {
                    if (lists1[key].published !== null && lists1[key].name === store.currentList.name && lists1[key].communityList) {
                        found1 = lists1[key];
                        break;
                    }
                }
                if (found1) {
                    console.log("HERE");
                    for (let i = 0; i < 5; i++) {
                        let exists = found1.items.indexOf(store.currentList.items[i]);
                        if (exists < 0) {
                            found1.items.push(store.currentList.items[i]);
                            found1.itemTuples.push([store.currentList.items[i], 5 - i])
                        }
                        else {
                            for (let j = 0; j < found1.itemTuples.length; j++) {
                                if (found1.itemTuples[j][0] === store.currentList.items[i]) {
                                    console.log("WIN" + found1.itemTuples[j][0]);
                                    
                                    found1.itemTuples[j][1] += 5 - i;
                                    break;
                                }
                            }
                        }
                    }

                    found1.itemTuples.sort((a, b) => {
                        return a[1] > b[1] ? -1 : (a[1] === b[1] ? (a[0] > b[0] ? 1 : -1) : 1)
                    })
                    const response = await api.updateTop5ListById(found1._id, found1);
                    if (response.data.success) {
                        async function updateList() {
                            let list2 = store.currentList;
                            list2.published = new Date();
                            const response = await api.updateTop5ListById(list2._id, list2);
                            if (response.data.success) {
                                storeReducer({
                                    type: GlobalStoreActionType.PUBLISH_CURRENT_LIST,
                                    payload: store.currentList
                                });
                                store.closeCurrentList();
                            }
                        }
                        updateList();
                    }
                }
                else {
                    let tuples = [
                        [store.currentList.items[0], 5],
                        [store.currentList.items[1], 4],
                        [store.currentList.items[2], 3],
                        [store.currentList.items[3], 2],
                        [store.currentList.items[4], 1],
                    ];

                    let payload = {
                        name: store.currentList.name,
                        items: store.currentList.items,
                        itemTuples: tuples,
                        ownerEmail: auth.user.email,
                        published: new Date(),
                        communityList: true,
                        likes: 0,
                        likedBy: [],
                        dislikes: 0,
                        dislikedBy: [],
                        views: 0,
                        comments: [],
                        commensBy: [],
                    };
                    const response = await api.createTop5List(payload);
                    if (response.data.success) {
                        async function updateList() {
                            let list2 = store.currentList;
                            list2.published = new Date();
                            const response = await api.updateTop5ListById(list2._id, list2);
                            if (response.data.success) {
                                storeReducer({
                                    type: GlobalStoreActionType.PUBLISH_CURRENT_LIST,
                                    payload: store.currentList
                                });
                                store.closeCurrentList();
                            }
                        }
                        updateList();
                    }
                }
            }

            let list = store.currentList;
            list.published = new Date();
            const response1 = await api.updateTop5ListById(list._id, list);
            if (response1.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.PUBLISH_CURRENT_LIST,
                    payload: {
                        
                    }
                });
            }
        }
    }

    store.like = async function(id) {
        let list = "";
        for (let key in store.currentAllLists) {
            if (store.currentAllLists[key]._id === id) {
                list = store.currentAllLists[key];
                break;
            }
        }
        let index = list.likedBy.indexOf(auth.user.email);
        if (index < 0) {
            list.likes += 1;
            list.likedBy.push(auth.user.email);
            index = list.dislikedBy.indexOf(auth.user.email);
            if (index >= 0) {
                list.dislikes -= 1;
                list.dislikedBy.splice(index, 1);
            }
        }
        else {
            list.likes -= 1;
            list.likedBy.splice(index, 1);
        }
        
        const response = await api.updateTop5ListById(id, list);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.LIKE,
                payload: store.currentAllLists,
            });
        }
    }

    store.dislike = async function(id) {
        let list = "";
        for (let key in store.currentAllLists) {
            if (store.currentAllLists[key]._id === id) {
                list = store.currentAllLists[key];
                break;
            }
        }
        let index = list.dislikedBy.indexOf(auth.user.email);
        if (index < 0) {
            list.dislikes += 1;
            list.dislikedBy.push(auth.user.email);
            index = list.likedBy.indexOf(auth.user.email);
            if (index >= 0) {
                list.likes -= 1;
                list.likedBy.splice(index, 1);
            }
        }
        else {
            list.dislikes -= 1;
            list.dislikedBy.splice(index, 1);
        }
        
        const response = await api.updateTop5ListById(id, list);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.DISLIKE,
                payload: store.currentAllLists,
            });
        }
    }

    store.expandList = (id) => {
        let list = [];
        if (store.listsExpanded) {
            list = store.listsExpanded;
            let index = list.indexOf(id);
            if (index < 0) {
                list.push(id);
            }
            else {
                list.splice(index, 1);
            }
        }
        else {
            list.push(id);
        }
        storeReducer({
            type: GlobalStoreActionType.EXPAND_LIST,
            payload: list,
        });
    }

    store.comment = async function (id, value) {
        let list = "";
        for (let key in store.currentAllLists) {
            if (store.currentAllLists[key]._id === id) {
                list = store.currentAllLists[key];
                break;
            }
        }
        list.comments.unshift(value);
        list.commentsBy.unshift(auth.user.email);
    
        const response = await api.updateTop5ListById(id, list);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.COMMENT,
                payload: null,
            });
        }
    }

    store.sortBy = (num) => {

    }

    store.search = (num) => {

    }

    store.logout = function() {
        storeReducer({
            type: GlobalStoreActionType.LOG_OUT,
            payload: null
        })
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };