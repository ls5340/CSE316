import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal'
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import Top5Item from './Top5Item.js'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WorkspaceScreen from './WorkspaceScreen'
import AuthContext from '../auth'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [text, setText] = useState("");

    useEffect(() => {
        store.loadAllLists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleHome() {
        store.home();
    }

    function handleUser() {
        store.user();
    }

    function handleUsers() {
        store.users();
    }

    function handleCommunityLists() {
        store.communityLists();
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleSearch(event) {
        if (event.code === "Enter")
            store.search(text);
    }

    let listCard = "";
    let homeDisabled = false;
    if (auth.user === "Guest")
        homeDisabled = true;
    if (store) {
        // if (store.currentList) {
        //     history.push()
        // }
        // else {
            listCard = 
                <div id="list-selector-list">
                    <List sx={{ width: '95%', left: '2%', top: '3%', bgcolor: 'transparent'}}>
                    {
                        store.currentFiltered.map((aList) => (
                            <ListCard
                                key={aList._id}
                                list={aList}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
                </div>
        
    }
    return (
        <Box id="top5-list-selector" sx={{display: 'block'}}>
            <DeleteModal />
            <Box id="list-selector-heading">
            <IconButton onClick={handleHome} disabled={homeDisabled}> 
                <HomeOutlinedIcon sx={{fontSize: 64}}> </HomeOutlinedIcon>
            </IconButton>
            <IconButton onClick={handleUser}>
                <PersonIcon sx={{fontSize: 64}}> </PersonIcon>
            </IconButton>
            <IconButton>
                <GroupsIcon sx={{fontSize: 64}}> </GroupsIcon>
            </IconButton>
            <IconButton>
                <FunctionsIcon sx={{fontSize: 64}}> </FunctionsIcon>
            </IconButton>
            <TextField defaultValue={text} onChange={handleUpdateText} onKeyPress={handleSearch} sx={{width: 666}}> </TextField>
            <Typography sx={{fontSize: 32}}> Sort By</Typography>
            <IconButton>
                <SortIcon sx={{fontSize: 64}}> </SortIcon>
            </IconButton>
                
            </Box>
            
            <Box sx={{height: '100%'}}>
            {listCard}
            </Box>
            
            <Box sx={{width: '100%', justifyContent: 'center', display: 'flex'}}>
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </Box>
        </Box>)
}

export default HomeScreen;