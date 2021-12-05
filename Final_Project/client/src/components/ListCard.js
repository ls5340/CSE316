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
import List from '@mui/material/List';
import AuthContext from '../auth'

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
    const { auth } = useContext(AuthContext);
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

    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(list._id);
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
        store.expandList(list);
    }

    function handleComment(event) {
        if (event.code === "Enter") {
            store.comment(list._id, event.target.value);
        }
    }

    function handleLoadUser(event) {
        store.user(list.ownerUsername);
    }

    let author = 
            <Box sx={{display: 'flex', width: '100%'}}>
                <Typography sx={{fontSize: 16, ml: 2, fontWeight: 512}}>
                        By: 
                </Typography>
                <Typography onClick={handleLoadUser} sx={{fontSize: 16, ml: 1, color: 'blue', textDecoration: 'underline', fontWeight: 512}}>
                    {list.ownerUsername}
                </Typography>
            </Box>
        
    if (store.currentView === "COMMUNITY_LISTS")
        author = <Box sx={{display: 'flex', width: '100%', height: 22}}>
                </Box>

    let edit = 
            <Typography onClick={(event) => {handleLoadList(event, list._id)}} sx={{fontSize: 16, ml: 2, mt: 1, color: 'red', textDecoration: 'underline', fontWeight: 512, width: 32}}>
                Edit
            </Typography>

    let edit2 = 
        <Typography onClick={(event) => {handleLoadList(event, list._id)}} sx={{fontSize: 16, ml: 2, mt: 3, color: 'red', textDecoration: 'underline', fontWeight: 512, width: "80%"}}>
            Edit
        </Typography>

    let deleteStuff = 
        <IconButton onClick={handleDeleteList} sx={{fontSize: 48, ml: 12}}>
            <DeleteIcon sx={{fontSize: '100%'}}></DeleteIcon>
        </IconButton>   
    
    if (store.currentView != "HOME")
        deleteStuff = "";

    if (list.published != null) {
        let type = "Published: ";
        if (list.communityList) {
            type = "Uploaded: ";
        }



        let day = new Date(list.published).getDate();
        let month = new Date(list.published).getMonth();
        let year = new Date(list.published).getYear() + 1900;

        switch (month) {
            case 1:
                month = 'January';
                break;
            case 2:
                month = 'February';
                break;
            case 3:
                month = 'March';
                break;
            case 4:
                month = 'April';
                break;
            case 5:
                month = 'May';
                break;
            case 6:
                month = 'June';
                break;
            case 7:
                month = 'July';
                break;
            case 8: 
                month = 'August';
                break;
            case 9:
                month = 'September';
                break;
            case 10:
                month = 'October';
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
            default:
                break;
        }

        edit = 
        <Typography sx={{fontSize: 16, ml: 2, mt: 1, fontWeight: 512, width: 400}}>
            {type} {month} {day}, {year}
        </Typography>

        edit2 = 
        <Typography sx={{fontSize: 16, ml: 2, mt: 4, fontWeight: 512, width: "80%"}}>
            {type} {month} {day}, {year}
        </Typography>

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
                <Box sx={{display: 'flex', height: '100%', width: '100%'}}>
                    <Box sx={{display: 'block', height: '100%', width: '70%'}}>
                        <Typography sx={{fontSize: 32, ml: 2, fontWeight: 512}}>
                                    {list.name}
                        </Typography>
                        {author}
                        {edit}
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
                            {deleteStuff}
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 5, mt: 1}}>
                                Views: 
                            </Typography>
                            <Typography sx={{fontSize: 16, textAlign: 'right', fontWeight: 512, ml: 1, mt: 1}}>
                                {list.views}
                            </Typography>
                            <IconButton sx={{fontSize: 36, ml: 32}}>
                                <ExpandMoreIcon onClick={handleExpand} sx={{fontSize: '100%'}}></ExpandMoreIcon>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
        </ListItem>

    if (store.listsExpanded) {
        let index = store.listsExpanded.indexOf(list._id);
        if (index >= 0) {
            let expandedItems = 
            <Box sx={{width: "50%", height: "100%", bgcolor: "#003399", border: '2px', borderRadius: '16px', p: 1}}>
                <Typography sx={{fontSize: 48, width: "100%", color: "#ffcc00"}}>
                    1. {list.communityList ? list.itemTuples[0][0] : list.items[0]}
                </Typography>
                <Typography sx={{fontSize: 48, width: "100%", color: "#ffcc00"}}>
                    2. {list.communityList ? list.itemTuples[1][0] : list.items[1]}
                </Typography>
                <Typography sx={{fontSize: 48, width: "100%", color: "#ffcc00"}}>
                    3. {list.communityList ? list.itemTuples[2][0] : list.items[2]}
                </Typography>
                <Typography sx={{fontSize: 48, width: "100%", color: "#ffcc00"}}>
                    4. {list.communityList ? list.itemTuples[3][0] : list.items[3]}
                </Typography>
                <Typography sx={{fontSize: 48, width: "100%", color: "#ffcc00"}}>
                    5. {list.communityList ? list.itemTuples[4][0] : list.items[4]}
                </Typography>
            </Box>

            if (list.communityList) {
                expandedItems = 
                <Box sx={{width: "50%", height: "100%", bgcolor: "#003399", border: '2px', borderRadius: '16px', p: 1}}>
                    <Typography sx={{fontSize: 32, width: "100%", color: "#ffcc00"}}>
                        1. {list.communityList ? list.itemTuples[0][0] : list.items[0]}
                    </Typography>
                    <Typography sx={{fontSize: 12, width: "100%", color: "#ffcc00", ml: 5}}>
                        Votes: {list.itemTuples[0][1]}
                    </Typography>
                    <Typography sx={{fontSize: 32, width: "100%", color: "#ffcc00"}}>
                        2. {list.communityList ? list.itemTuples[1][0] : list.items[1]}
                    </Typography>
                    <Typography sx={{fontSize: 12, width: "100%", color: "#ffcc00", ml: 5}}>
                        Votes: {list.itemTuples[1][1]}
                    </Typography>
                    <Typography sx={{fontSize: 32, width: "100%", color: "#ffcc00"}}>
                        3. {list.communityList ? list.itemTuples[2][0] : list.items[2]}
                    </Typography>
                    <Typography sx={{fontSize: 12, width: "100%", color: "#ffcc00", ml: 5}}>
                        Votes: {list.itemTuples[2][1]}
                    </Typography>
                    <Typography sx={{fontSize: 32, width: "100%", color: "#ffcc00"}}>
                        4. {list.communityList ? list.itemTuples[3][0] : list.items[3]}
                    </Typography>
                    <Typography sx={{fontSize: 12, width: "100%", color: "#ffcc00", ml: 5}}>
                        Votes: {list.itemTuples[3][1]}
                    </Typography>
                    <Typography sx={{fontSize: 32, width: "100%", color: "#ffcc00"}}>
                        5. {list.communityList ? list.itemTuples[4][0] : list.items[4]}
                    </Typography>
                    <Typography sx={{fontSize: 12, width: "100%", color: "#ffcc00", ml: 5}}>
                        Votes: {list.itemTuples[4][1]}
                    </Typography>
                </Box>
            }
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
                        <Box sx={{height: '100%', width: '100%'}}>
                            <Box sx={{display: 'flex', height: '16%', width: '100%'}}>
                                <Box sx={{display: 'block', height: '100%', width: '70%'}}>
                                    <Typography sx={{fontSize: 32, ml: 2, fontWeight: 512}}>
                                                {list.name}
                                    </Typography>
                                    {author}
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
                                        {deleteStuff}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', width: "100%", height: "70%", ml: 2}}>
                                {expandedItems}
                                <Box sx={{width: "50%", height: "100%", bgcolor: "transparent"}}>
                                    <Box sx={{width: "100%", height: "85%"}}>
                                        <List sx={{ width: '95%', left: '2%', top: '3%', bgcolor: 'transparent', height: "90%", overflow: "scroll"}}>
                                            {
                                                list.comments ? list.comments.map((value, index) => (
                                                    <ListItem>
                                                    <Box>
                                                        <Typography sx={{color: 'blue', textDecoration: 'underline', fontWeight: 512, fontSize: 16}}>
                                                            {list.commentsBy[index]}
                                                        </Typography>
                                                        <Typography sx={{fontSize: 24}}>
                                                            {value}
                                                        </Typography>
                                                    </Box>
                                                    </ListItem>
                                            )) : ""
                                            }
                                        </List>
                                    </Box>
                                    <Box sx={{width: "100%", height: "15%"}}>
                                        <TextField onKeyPress={handleComment} label="Add Comment" sx={{width: "95%", height: "100%", bgcolor: "white", fontSize: 32, border: "2px", borderRadius: "16px"}}>
                                            
                                        </TextField>
                                    </Box>

                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', width: "100%", height: "14%"}}>
                                {edit2}
                                    <Typography sx={{fontSize: 16, fontWeight: 512, ml: 5, height: "100%", width: "4%", mt: 4}}>
                                        Views: 
                                    </Typography>
                                    <Typography sx={{fontSize: 16, fontWeight: 512, ml: 1, height: "100%", width: "6.5%", mt: 4}}>
                                        {list.views}
                                    </Typography>
                                    <IconButton sx={{fontSize: 36, ml: 22, width: "5%", mt: 2}}>
                                        <ExpandLessIcon onClick={handleExpand} sx={{fontSize: '100%'}} ></ExpandLessIcon>
                                    </IconButton>
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