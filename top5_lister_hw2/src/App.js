import React from 'react';
import './App.css';

// IMPORT DATA MANAGEMENT AND TRANSACTION STUFF
import DBManager from './db/DBManager';

// THESE ARE OUR REACT COMPONENTS
import DeleteModal from './components/DeleteModal';
import Banner from './components/Banner.js'
import Sidebar from './components/Sidebar.js'
import Workspace from './components/Workspace.js';
import Statusbar from './components/Statusbar.js'

// IMPORT TRANSACTIONS
import ChangeItem_Transaction from './transactions/ChangeItem_Transaction';
import MoveItem_Transaction from './transactions/MoveItem_Transaction';

import jsTPS from './common/jsTPS';

class App extends React.Component {
    constructor(props) {
        super(props);

        // THIS WILL TALK TO LOCAL STORAGE
        this.db = new DBManager();

        // GET THE SESSION DATA FROM OUR DATA MANAGER
        let loadedSessionData = this.db.queryGetSessionData();

        // jsTPS thingy
        this.tps = new jsTPS();

        // SETUP THE INITIAL STATE
        this.state = {
            currentList : null,
            deleting: null,
            sessionData : loadedSessionData,
        }
    }
    componentDidMount = () => {
        this.updateToolbarButtons();
    }
    sortKeyNamePairsByName = (keyNamePairs) => {
        keyNamePairs.sort((keyPair1, keyPair2) => {
            // GET THE LISTS
            return keyPair1.name.localeCompare(keyPair2.name);
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CREATING A NEW LIST
    createNewList = () => {
        // FIRST FIGURE OUT WHAT THE NEW LIST'S KEY AND NAME WILL BE
        let newKey = this.state.sessionData.nextKey;
        let newName = "Untitled" + newKey;

        // MAKE THE NEW LIST
        let newList = {
            key: newKey,
            name: newName,
            items: ["?", "?", "?", "?", "?"]
        };

        // MAKE THE KEY,NAME OBJECT SO WE CAN KEEP IT IN OUR
        // SESSION DATA SO IT WILL BE IN OUR LIST OF LISTS
        let newKeyNamePair = { "key": newKey, "name": newName };
        let updatedPairs = [...this.state.sessionData.keyNamePairs, newKeyNamePair];
        this.sortKeyNamePairsByName(updatedPairs);

        // CHANGE THE APP STATE SO THAT IT THE CURRENT LIST IS
        // THIS NEW LIST AND UPDATE THE SESSION DATA SO THAT THE
        // NEXT LIST CAN BE MADE AS WELL. NOTE, THIS setState WILL
        // FORCE A CALL TO render, BUT THIS UPDATE IS ASYNCHRONOUS,
        // SO ANY AFTER EFFECTS THAT NEED TO USE THIS UPDATED STATE
        // SHOULD BE DONE VIA ITS CALLBACK
        this.setState(prevState => ({
            currentList: newList,
            closeDisabled: false,
            sessionData: {
                nextKey: prevState.sessionData.nextKey + 1,
                counter: prevState.sessionData.counter + 1,
                keyNamePairs: updatedPairs
            }
        }), () => {
            // PUTTING THIS NEW LIST IN PERMANENT STORAGE
            // IS AN AFTER EFFECT
            this.db.mutationCreateList(newList);
            this.db.mutationUpdateSessionData(this.state.sessionData);
            this.updateToolbarButtons();
        });
    }
    renameList = (key, newName) => {
        let newKeyNamePairs = [...this.state.sessionData.keyNamePairs];
        // NOW GO THROUGH THE ARRAY AND FIND THE ONE TO RENAME
        for (let i = 0; i < newKeyNamePairs.length; i++) {
            let pair = newKeyNamePairs[i];
            if (pair.key === key) {
                pair.name = newName;
            }
        }
        this.sortKeyNamePairsByName(newKeyNamePairs);

        // WE MAY HAVE TO RENAME THE currentList
        let currentList = this.state.currentList;
        if (currentList.key === key) {
            currentList.name = newName;
        }

        this.setState(prevState => ({
            currentList: prevState.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: newKeyNamePairs
            }
        }), () => {
            // AN AFTER EFFECT IS THAT WE NEED TO MAKE SURE
            // THE TRANSACTION STACK IS CLEARED
            let list = this.db.queryGetList(key);
            list.name = newName;
            this.db.mutationUpdateList(list);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }
    // THIS FUNCTION RENAMES AN ITEM
    renameItem = (index, text) => {
        let newCurrentList = this.state.currentList;
        newCurrentList.items[index] = text;
        this.setState(prevState => ({
            currentList: newCurrentList,
            sessionData: prevState.sessionData,
        }), () => {
            this.db.mutationUpdateList(this.state.currentList);
            this.updateToolbarButtons();
        });

    }
    // THIS FUNCTION DRAG AND DROPS AN ITEM
    dragItem = (oldIndex, newIndex) => {
        let newCurrentList = this.state.currentList;
        let temp = newCurrentList.items[oldIndex];
        newCurrentList.items[oldIndex] = newCurrentList.items[newIndex];
        newCurrentList.items[newIndex] = temp;
        this.setState(prevState => ({
            currentList: newCurrentList,
            sessionData: prevState.sessionData,
        }), () => {
            this.db.mutationUpdateList(this.state.currentList);
            this.updateToolbarButtons();
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF LOADING A LIST FOR EDITING
    loadList = (key) => {
        let newCurrentList = this.db.queryGetList(key);
        if (this.state.currentList !== null && this.state.currentList.key != newCurrentList.key)
            this.tps.clearAllTransactions();
        this.setState(prevState => ({
            currentList: newCurrentList,
            sessionData: prevState.sessionData,
        }), () => {
            this.updateToolbarButtons();
            // ANY AFTER EFFECTS?
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CLOSING THE CURRENT LIST
    closeCurrentList = () => {
        this.setState(prevState => ({
            currentList: null,
            //listKeyPairMarkedForDeletion : prevState.listKeyPairMarkedForDeletion,
            sessionData: prevState.sessionData
        }), () => {
            this.tps.clearAllTransactions();
            this.updateToolbarButtons()
            // ANY AFTER EFFECTS?
        });
    }
    deleteList = (keyNamePair) => {
        // SOMEHOW YOU ARE GOING TO HAVE TO FIGURE OUT
        // WHICH LIST IT IS THAT THE USER WANTS TO
        // DELETE AND MAKE THAT CONNECTION SO THAT THE
        // NAME PROPERLY DISPLAYS INSIDE THE MODAL
        this.setState(prevState => ({
            currentList: prevState.currentList,
            sessionData: prevState.sessionData,
            deleting: keyNamePair
        }), () => {
            this.showDeleteListModal();
        });
    }
    // THIS FUNCTION ADDS AN ITEM CHANGE TRANSACTION TO THE JSTPS STACK
    addChangeItemTransaction = (id, newText) => {
        // GET THE CURRENT TEXT
        let oldText = this.state.currentList.items[id];
        let transaction = new ChangeItem_Transaction(this, id, oldText, newText);
        this.tps.addTransaction(transaction);
        this.updateToolbarButtons();
    }
    // THIS FUNCTION ADDS AN ITEM MOVE TRANSACTION TO THE JSTPS STACK   
    addMoveItemTransaction = (fromId, toId) => {
        let transaction = new MoveItem_Transaction(this, fromId, toId);
        this.tps.addTransaction(transaction);
        this.updateToolbarButtons();
    }
    // THIS FUNCTION PERFORMS TRANSACTION UNDO
    undo = () => {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
            this.updateToolbarButtons();
        }
    }
    // THIS FUNCTION PERFORMS TRANSACTION REDO
    redo = () => {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
            this.updateToolbarButtons();
        }
    }
    updateToolbarButtons = () => {
        let tps = this.tps;
        if (!tps.hasTransactionToUndo()) {
            this.disableButton("undo-button");
        }
        else {
            this.enableButton("undo-button");
        }   
        
        if (!tps.hasTransactionToRedo()) {
            this.disableButton("redo-button");
        }
        else {
            this.enableButton("redo-button");
        }  

        if (this.state.currentList === null) {
            this.disableButton("close-button");
        }
        else {
            this.enableButton("close-button");
        }
    }
    disableButton(id) {
        let button = document.getElementById(id);
        button.disabled = true;
    }

    enableButton(id) {
        let button = document.getElementById(id);
        button.disabled = false;
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST
    showDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    hideDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
    }
    confirmDeleteListModal = () => {
        let index = this.state.sessionData.keyNamePairs.indexOf(this.state.deleting);
        this.state.sessionData.keyNamePairs.splice(index, 1);
        if (this.state.currentList !== null && this.state.deleting.key == this.state.currentList.key) {
            this.closeCurrentList();
            this.db.mutationUpdateSessionData(this.state.sessionData);
            this.hideDeleteListModal();
        }
        else {
            this.setState(prevState => ({
                currentList: prevState.currentList,
                sessionData: prevState.sessionData
            }), () => {
                // ANY AFTER EFFECTS?
                this.hideDeleteListModal();
                this.db.mutationUpdateSessionData(this.state.sessionData);
            });
        }
    }

    render() {
        return (
            <div id="app-root">
                <Banner 
                    title='Top 5 Lister'
                    closeCallback={this.closeCurrentList}
                    undoCallback={this.undo}
                    redoCallback={this.redo} />
                <Sidebar
                    heading='Your Lists'
                    currentList={this.state.currentList}
                    keyNamePairs={this.state.sessionData.keyNamePairs}
                    createNewListCallback={this.createNewList}
                    deleteListCallback={this.deleteList}
                    loadListCallback={this.loadList}
                    renameListCallback={this.renameList}
                />
                <Workspace
                    currentList={this.state.currentList}
                    renameItemCallback={this.addChangeItemTransaction}
                    dragItemCallback={this.addMoveItemTransaction} 
                />
                <Statusbar 
                    currentList={this.state.currentList} />
                <DeleteModal
                    listKeyPair={this.state.deleting}
                    hideDeleteListModalCallback={this.hideDeleteListModal}
                    confirmDeleteListModalCallback={this.confirmDeleteListModal}
                />
            </div>
        );
    }
}

export default App;
