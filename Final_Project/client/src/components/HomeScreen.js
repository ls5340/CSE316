import React, { useContext, useEffect } from 'react'
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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '95%', left: '2%', top: '5%', bgcolor: 'background.paper', border: '2px solid', borderRadius: '16px', bgcolor: '#fffded'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <DeleteModal />
            <div id="list-selector-heading">
            <IconButton> 
                <HomeOutlinedIcon sx={{fontSize: 64}}> </HomeOutlinedIcon>
            </IconButton>
            <IconButton>
                <PersonIcon sx={{fontSize: 64}}> </PersonIcon>
            </IconButton>
            <IconButton>
                <GroupsIcon sx={{fontSize: 64}}> </GroupsIcon>
            </IconButton>
            <IconButton>
                <FunctionsIcon sx={{fontSize: 64}}> </FunctionsIcon>
            </IconButton>
            <TextField sx={{width: 666}}> </TextField>
            <Typography sx={{fontSize: 32}}> Sort By</Typography>
            <IconButton>
                <SortIcon sx={{fontSize: 64}}> </SortIcon>
            </IconButton>
                
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;