import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState(store.currentList ? store.currentList.name : "");


    function handleSaveList() {
        store.saveCurrentList(value);
    }

    function handleUpdateTitle(event) {
        setValue(event.target.value);
    }

    let lists = "";
    if (store.currentList) {
        lists = 
            <Box id="top5-workspace" sx={{bgcolor: "pink", border: '2px solid', borderRadius: '16px', pt: 1, pb: "1%", pl: "2%", pr: "2%"}}>
        <TextField defaultValue={store.currentList.name} onChange={handleUpdateTitle} sx={{bgcolor: 'white', width: '40%'}} inputProps={{style: {fontSize: 20, fontWeight: 512, height: 10}}}>  </TextField>
        <Box  sx={{bgcolor: "blue", display: "flex", borderRadius: '16px', width: "100%", height: "80%", mt: 1}}>
            <Box id="edit-numbering" sx={{ml: 2}}>
                <Typography className="item-number" variant="h3" sx={{fontWeight: 512, border: '2px', borderRadius: '16px', mt: 1}}>1.</Typography>
                <Typography className="item-number" variant="h3" sx={{fontWeight: 512, border: '2px', borderRadius: '16px', mt: 1}}>2.</Typography>
                <Typography className="item-number" variant="h3" sx={{fontWeight: 512, border: '2px', borderRadius: '16px', mt: 1}}>3.</Typography>
                <Typography className="item-number" variant="h3" sx={{fontWeight: 512, border: '2px', borderRadius: '16px', mt: 1}}>4.</Typography>
                <Typography className="item-number" variant="h3" sx={{fontWeight: 512, border: '2px', borderRadius: '16px', mt: 1}}>5.</Typography>
            </Box>
            <Box sx={{ border: '2px', borderRadius: '16px', width: "100%", height: "100%"}}>
                <List sx={{ width: '96%', height: '100%', left: '2%', bottom: '2%', mt: 0.4}}>
                    {
                        store.currentList.items.map((item, index) => (
                            <Top5Item 
                                key={'top5-item-' + (index+1)}
                                text={item}
                                index={index} 
                            />
                        ))
                    }
                </List>;
            </Box>
        </Box>
        <Box sx={{display: 'flex', width: '100%', height: '10%', mt: 1, justifyContent: 'right'}}>
            <Button onClick={handleSaveList} sx={{width: '10%', height: '100%', bgcolor: 'gray', color: 'black'}}>Save</Button>
            <Button sx={{width: '10%', height: '100%', bgcolor: 'gray', color: 'black', ml: 2}}>Publish</Button>
        </Box>
    </Box>
    }
    return (
        <div> {lists} </div>
    )
}

export default WorkspaceScreen;