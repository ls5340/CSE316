/**
 * Top5ListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class Top5Controller {
    constructor() {

    }

    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        document.getElementById("add-list-button").disabled = false;
        document.getElementById("undo-button").disabled = true;
        document.getElementById("redo-button").disabled = true;
        document.getElementById("close-button").disabled = true;
        document.getElementById("add-list-button").onmousedown = (event) => {
            document.getElementById("add-list-button").disabled = true;
            document.getElementById("undo-button").disabled = true;
            document.getElementById("redo-button").disabled = true;
            document.getElementById("close-button").disabled = false;

            let newList = this.model.addNewList("Untitled", ["?","?","?","?","?"]);            
            this.model.loadList(newList.id);
            this.model.saveLists();
            for (let i = 1; i <= 5; i++) {
                let item = document.getElementById("item-" + i);
                item.style.pointerEvents = "auto";
            }
            document.getElementById("top5-statusbar").innerHTML = "Top 5 Untitled";
        }

        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }

        document.getElementById("redo-button").onmousedown = (event) => {
            this.model.redo();
        }

        document.getElementById("close-button").onmousedown = (event) => {
            this.closeList();
        }
        // SETUP THE ITEM HANDLERS
        for (let i = 1; i <= 5; i++) {
            let item = document.getElementById("item-" + i);
            item.style.pointerEvents = "auto";

            // AND FOR TEXT EDITING
            item.ondblclick = (ev) => {
                if (this.model.hasCurrentList()) {

                    // CLEAR THE TEXT
                    item.innerHTML = "";

                    // ADD A TEXT FIELD
                    let textInput = document.createElement("input");
                    textInput.setAttribute("type", "text");
                    textInput.setAttribute("id", "item-text-input-" + i);
                    textInput.setAttribute("value", this.model.currentList.getItemAt(i-1));

                    item.appendChild(textInput);

                    textInput.ondblclick = (event) => {
                        this.ignoreParentClick(event);
                    }
                    textInput.onkeydown = (event) => {
                        if (event.key === 'Enter') {
                            this.model.addChangeItemTransaction(i-1, event.target.value);
                        }
                    }
                    textInput.onblur = (event) => {
                        this.model.restoreList();
                    }
                }
            }
            item.setAttribute("draggable", "true");

            item.ondragstart = (event) => {
                event.dataTransfer.setData("text", event.target.id);
            }

            item.ondrop = (event) => {
                event.preventDefault();
                let id = event.dataTransfer.getData("text");
                this.model.addMoveItemTransaction(id.substring(5, 6), event.target.id.substring(5, 6));
            }

            item.ondragover = (event) => {
                event.preventDefault();
            }
        }
    }

    closeList() {
        document.getElementById("add-list-button").disabled = false;

        document.getElementById("undo-button").disabled = true;

        document.getElementById("redo-button").disabled = true;

        document.getElementById("close-button").disabled = true;
        
        for (let i = 1; i <= 5; i++) {
            let item = document.getElementById("item-" + i);
            item.innerText = "";
            item.style.pointerEvents = "none";
        }
        this.model.unselectAll();
        document.getElementById("top5-statusbar").innerHTML = null;
        
    }

    registerListSelectHandlers(id) {
        // FOR SELECTING THE LIST
        let mod;
        document.getElementById("top5-list-" + id).onmousedown = (event) => {

            this.initHandlers();
            document.getElementById("add-list-button").disabled = true;
            document.getElementById("close-button").disabled = false;
            this.model.unselectAll();

            // GET THE SELECTED LIST
            this.model.loadList(id);
            document.getElementById("top5-statusbar").innerHTML = "Top 5 " + document.getElementById("top5-list-" + id).children[0].value;
            
            mod = this.model;
        }

        document.getElementById("top5-list-" + id).addEventListener('dblclick', function(event) {
            document.getElementById("top5-list-" +id).children[0].readOnly = false;
            document.getElementById("top5-list-" + id).children[0].addEventListener('focusout', function(event) {
                mod.changeListName(id,  document.getElementById("top5-list-" + id).children[0].value);
                mod.loadList(id);
                mod.saveLists();
                document.getElementById("top5-statusbar").innerHTML = "Top 5 " + document.getElementById("top5-list-" + id).children[0].value;
            })
            document.getElementById("top5-list-" + id).children[0].addEventListener('keyup', function(event) {
                event.preventDefault();
                if (event.key === 'Enter') {
                    mod.changeListName(id,  document.getElementById("top5-list-" + id).children[0].value);
                    mod.loadList(id);
                    mod.saveLists();
                    document.getElementById("top5-statusbar").innerHTML = "Top 5 " + document.getElementById("top5-list-" + id).children[0].value;
                }
            })
        })

        document.getElementById("top5-list-" + id).onmouseover = (event) => {
            document.getElementById("top5-list-" + id).children[0].style.color = "#ffffff";
        }

        document.getElementById("top5-list-" + id).onmouseout = (event) => {
            document.getElementById("top5-list-" + id).children[0].style.color = "#000000";
        }
        

        // FOR DELETING THE LIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            this.ignoreParentClick(event);
            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE LIST
            let modal = document.getElementById("delete-modal");
            this.listToDeleteIndex = id;
            let listName = this.model.getList(this.model.getListIndex(id)).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            modal.classList.add("is-visible");

            document.getElementById("dialog-confirm-button").onclick = (event) => {
                this.model.deleteList(id);
                this.model.saveLists();
                if (!this.model.checkCurrentList(id))
                    this.model.loadList(this.model.currentList.id);
                modal.classList.remove("is-visible");
            }

            document.getElementById("dialog-cancel-button").onclick = (event) => {
                modal.classList.remove("is-visible");
            }
        }
    }

    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}