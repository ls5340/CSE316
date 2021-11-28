import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { list } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLike(event) {
        store.like(list._id);
    }

    function handleDislike(event) {
        store.dislike(list._id);
    }

    function handleExpand(event) {
        store.expandList(list._id);
    }

    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{ display: 'flex', p: 1, height: 128, border: '2px solid', borderRadius: '16px', bgcolor: '#fffded', mt: 1 }}
            button
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
                {/* <Grid sx={{flexGrow: 1}} container spacing={0.5}>
                    <Grid item xs={12}>
                        <Typography sx={{fontSize: 24, ml: 2, fontWeight: 512}}>
                            {idNamePair.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography sx={{fontSize: 16, ml: 2, fontWeight: 512}}>
                            By: 
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Link to='/login/' style={{textDecoration: 'none'}}>
                            <Typography sx={{fontSize: 16, ml: 1, color: 'blue', textDecoration: 'underline', fontWeight: 512}}>
                                {idNamePair.name}
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to='/login/' style={{textDecoration: 'none'}}>
                            <Typography sx={{fontSize: 16, ml: 2, color: 'red', textDecoration: 'underline', fontWeight: 512}}>
                                Edit
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid sx={{flexGrow: 1,  textAlign: 'right'}} container spacing={2}>
                    <Grid item xs={5.5} sx={{display: 'flex', justifyContent: 'right', mt: 2}}>
                        <IconButton sx={{fontSize: 48}}>
                            <ThumbUpOutlinedIcon sx={{fontSize: '100%', mt: 1}}></ThumbUpOutlinedIcon>
                        </IconButton>
                        <Typography sx={{fontSize: 20, mt: 3}}>2M</Typography>
                    </Grid>
                    <Grid item xs={5.5} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        <IconButton sx={{fontSize: 48}}>
                            <ThumbDownOutlinedIcon sx={{fontSize: '100%', mt: 1}}></ThumbDownOutlinedIcon>
                        </IconButton>
                        <Typography sx={{fontSize: 20, mt: 3}}>1k</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        <IconButton sx={{fontSize: 48}}>
                            <DeleteIcon sx={{fontSize: '100%', mt: 1}}></DeleteIcon>
                        </IconButton>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6.9} sx={{display: 'flex', justifyContent: 'right'}}>
                            <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, mt: 1.5}}>
                                Views: 
                            </Typography>
                            <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 1, mt: 1.5}}>
                                somenumber
                            </Typography>
                        </Grid>
                        <Grid item xs={5.1}>
                            <IconButton sx={{fontSize: 48}}>
                                <ExpandMoreIcon sx={{fontSize: '100%'}} ></ExpandMoreIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid> */}
                <Box sx={{display: 'flex', height: '100%', width: '100%'}}>
                    <Box sx={{display: 'block', height: '100%', width: '70%'}}>
                        <Typography sx={{fontSize: 32, ml: 2, fontWeight: 512}}>
                                    {list.name}
                        </Typography>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Typography sx={{fontSize: 16, ml: 2, fontWeight: 512}}>
                                    By: 
                            </Typography>
                            <Link to='/login/' style={{textDecoration: 'none'}}>
                                <Typography sx={{fontSize: 16, ml: 1, color: 'blue', textDecoration: 'underline', fontWeight: 512}}>
                                    {list.name}
                                </Typography>
                            </Link>
                        </Box>
                        <Typography onClick={(event) => {handleLoadList(event, list._id)}} sx={{fontSize: 16, ml: 2, mt: 1, color: 'red', textDecoration: 'underline', fontWeight: 512, width: 32}}>
                            Edit
                        </Typography>
                    </Box>
                    <Box sx={{display: 'block', width: '30%'}}>
                        <Box sx={{display: 'flex'}}>
                            <IconButton sx={{fontSize: 48, ml: 4}}>
                                <ThumbUpOutlinedIcon onClick={handleLike} sx={{fontSize: '100%'}}></ThumbUpOutlinedIcon>
                            </IconButton>
                            <Typography sx={{fontSize: 20, mt: 2}}>{list.likes}</Typography>
                            <IconButton sx={{fontSize: 48, ml: 10}}>
                                <ThumbDownOutlinedIcon onClick={handleDislike} sx={{fontSize: '100%'}}></ThumbDownOutlinedIcon>
                            </IconButton>
                            <Typography sx={{fontSize: 20, mt: 2}}>{list.dislikes}</Typography>
                            <IconButton sx={{fontSize: 48, ml: 10}}>
                                <DeleteIcon sx={{fontSize: '100%'}}></DeleteIcon>
                            </IconButton>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 5, mt: 1}}>
                                Views: 
                            </Typography>
                            <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 1, mt: 1}}>
                                somenumber
                            </Typography>
                            <IconButton sx={{fontSize: 36, ml: 22}}>
                                <ExpandMoreIcon onClick={handleExpand} sx={{fontSize: '100%'}}></ExpandMoreIcon>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
        </ListItem>

    if (store.listsExpanded) {
        let index = store.listsExpanded.indexOf(list._id);
        if (index >= 0) {
            cardElement =
                <ListItem
                    id={list._id}
                    key={list._id}
                    sx={{ display: 'flex', p: 1, height: 512, border: '2px solid', borderRadius: '16px', bgcolor: '#ccccff', mt: 1 }}
                    button
                    style={{
                        fontSize: '48pt',
                        width: '100%'
                    }}
                >
                        {/* <Grid sx={{flexGrow: 1}} container spacing={0.5}>
                            <Grid item xs={12}>
                                <Typography sx={{fontSize: 24, ml: 2, fontWeight: 512}}>
                                    {idNamePair.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography sx={{fontSize: 16, ml: 2, fontWeight: 512}}>
                                    By: 
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Link to='/login/' style={{textDecoration: 'none'}}>
                                    <Typography sx={{fontSize: 16, ml: 1, color: 'blue', textDecoration: 'underline', fontWeight: 512}}>
                                        {idNamePair.name}
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to='/login/' style={{textDecoration: 'none'}}>
                                    <Typography sx={{fontSize: 16, ml: 2, color: 'red', textDecoration: 'underline', fontWeight: 512}}>
                                        Edit
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid sx={{flexGrow: 1,  textAlign: 'right'}} container spacing={2}>
                            <Grid item xs={5.5} sx={{display: 'flex', justifyContent: 'right', mt: 2}}>
                                <IconButton sx={{fontSize: 48}}>
                                    <ThumbUpOutlinedIcon sx={{fontSize: '100%', mt: 1}}></ThumbUpOutlinedIcon>
                                </IconButton>
                                <Typography sx={{fontSize: 20, mt: 3}}>2M</Typography>
                            </Grid>
                            <Grid item xs={5.5} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                                <IconButton sx={{fontSize: 48}}>
                                    <ThumbDownOutlinedIcon sx={{fontSize: '100%', mt: 1}}></ThumbDownOutlinedIcon>
                                </IconButton>
                                <Typography sx={{fontSize: 20, mt: 3}}>1k</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                                <IconButton sx={{fontSize: 48}}>
                                    <DeleteIcon sx={{fontSize: '100%', mt: 1}}></DeleteIcon>
                                </IconButton>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6.9} sx={{display: 'flex', justifyContent: 'right'}}>
                                    <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, mt: 1.5}}>
                                        Views: 
                                    </Typography>
                                    <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 1, mt: 1.5}}>
                                        somenumber
                                    </Typography>
                                </Grid>
                                <Grid item xs={5.1}>
                                    <IconButton sx={{fontSize: 48}}>
                                        <ExpandMoreIcon sx={{fontSize: '100%'}} ></ExpandMoreIcon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid> */}
                        <Box sx={{height: '100%', width: '100%'}}>
                            <Box sx={{display: 'flex', height: '16%', width: '100%'}}>
                                <Box sx={{display: 'block', height: '100%', width: '70%'}}>
                                    <Typography sx={{fontSize: 32, ml: 2, fontWeight: 512}}>
                                                {list.name}
                                    </Typography>
                                    <Box sx={{display: 'flex', width: '100%'}}>
                                        <Typography sx={{fontSize: 16, ml: 2, fontWeight: 512}}>
                                                By: 
                                        </Typography>
                                        <Link to='/login/' style={{textDecoration: 'none'}}>
                                            <Typography sx={{fontSize: 16, ml: 1, color: 'blue', textDecoration: 'underline', fontWeight: 512}}>
                                                {list.name}
                                            </Typography>
                                        </Link>
                                    </Box>
                                </Box>
                                <Box sx={{display: 'block', width: '30%'}}>
                                    <Box sx={{display: 'flex'}}>
                                        <IconButton sx={{fontSize: 48, ml: 4}}>
                                            <ThumbUpOutlinedIcon onClick={handleLike} sx={{fontSize: '100%'}}></ThumbUpOutlinedIcon>
                                        </IconButton>
                                        <Typography sx={{fontSize: 20, mt: 2}}>{list.likes}</Typography>
                                        <IconButton sx={{fontSize: 48, ml: 10}}>
                                            <ThumbDownOutlinedIcon onClick={handleDislike} sx={{fontSize: '100%'}}></ThumbDownOutlinedIcon>
                                        </IconButton>
                                        <Typography sx={{fontSize: 20, mt: 2}}>{list.dislikes}</Typography>
                                        <IconButton sx={{fontSize: 48, ml: 10}}>
                                            <DeleteIcon sx={{fontSize: '100%'}}></DeleteIcon>
                                        </IconButton>
                                    </Box>
                                    <Box sx={{display: 'flex'}}>
                                        <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 5, mt: 1}}>
                                            Views: 
                                        </Typography>
                                        <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 1, mt: 1}}>
                                            somenumber
                                        </Typography>
                                        <IconButton sx={{fontSize: 36, ml: 22}}>
                                            <ExpandMoreIcon sx={{fontSize: '100%'}} ></ExpandMoreIcon>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', width: "100%", height: "70%", ml: 2}}>
                                <Box sx={{width: "50%", height: "100%", bgcolor: "blue", border: '2px', borderRadius: '16px', p: 1}}>
                                    <Typography sx={{fontSize: 48, width: "100%", color: "yellow"}}>
                                        1. {list.items[0]}
                                    </Typography>
                                    <Typography sx={{fontSize: 48, width: "100%", color: "yellow"}}>
                                        2. {list.items[1]}
                                    </Typography>
                                    <Typography sx={{fontSize: 48, width: "100%", color: "yellow"}}>
                                        3. {list.items[2]}
                                    </Typography>
                                    <Typography sx={{fontSize: 48, width: "100%", color: "yellow"}}>
                                        4. {list.items[3]}
                                    </Typography>
                                    <Typography sx={{fontSize: 48, width: "100%", color: "yellow"}}>
                                        5. {list.items[4]}
                                    </Typography>
                                </Box>
                                <Box>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', width: "100%", height: "14%"}}>
                                <Box>
                                    <Typography></Typography>
                                </Box>
                                <Box>
                                </Box>
                            </Box>
                        </Box>
                </ListItem>
        }
    }
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + list._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={list.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;