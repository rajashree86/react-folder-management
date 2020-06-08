import React, { Component, useState, useContext } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthContext from './context/authContext';
import Subfolder from './SubFolder';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AddIcon from '@material-ui/icons/Add';

function FileManager(props) {

    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([{ name: "New Folder" }]);


    const handleChange = (id) => (evt) => {

        const newFolders = folders.map((folder, fid) => {
            if (id !== fid) return folder;
            return { ...folder, name: evt.target.value };
        });

        setFolders(newFolders);
    }

   

    const handleAddFolder = () => {
        setFolders(folders.concat([{ name: '' }]));
        handleClose();

    }

    

    const handleClickOpen = () => {
        setOpen(true);
       
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();

    }


    const style = {
        color: "blue",
        fontSize: "200px"
    }

    const style1 = {
        color: "white",
        marginTop: -102,

    }

    const style2 = {
        padding : 20

    }
    const style3 = {
      
       borderTop : "2px dashed #ddd"

    }

    const style4 ={
        marginTop:"45px",
        width:"140px",
        height:"120px",
        border : "2px dashed #ddd"

     }


    const subFolder = folders.map(folder => folder.name);

    localStorage.setItem("folderName", subFolder);


    return (


        <div style={style2}>
            <h1>File Manager</h1>
            <hr style={style3}/>

            <div style={{ display: "flex", flexWrap: "wrap" }}>



              

                {folders.map((folder, id) => (

                    <div>
                        <div key={id}>
                            <AuthContext.Provider value={{ folderName: folder.name }} >
                                <Link to={`/subfolder/${folder.name}`} style={{ textDecoration: "none" }} >
                                    <FolderIcon style={style} />
                                    <h4 style={style1}>{folder.name}</h4></Link>
                                <div style={{display:"none"}}>

                                    <Subfolder />


                                </div>
                            </AuthContext.Provider>
                        </div>




                    </div>

                ))}

                
                <div >
                <Button variant="outlined" style={style4} onClick={handleClickOpen}><AddIcon style={{color:"#ddd"}}/></Button>
                </div>
               
               
                {folders.map((folder, id) => (

                    <form onSubmit={handleSubmit}>
                        <div>
                        

                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                                <DialogTitle id="form-dialog-title">Create New Folder </DialogTitle>
                                <DialogContent>

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Folder Name"
                                        value={folder.name}
                                        type="text"
                                        fullWidth
                                        onChange={handleChange(id)}
                                        inputProps={{
                                            maxLength: 15,
                                        }}
                                    />
                                    {folder.name.length === 15 ? <DialogContentText>
                                        <br/>
                                       <text style={{float:"right"}}> Name should be less than 15 character</text> <ErrorOutlineIcon/>
                                </DialogContentText> : null}


                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                </Button>
                                    <Button onClick={handleAddFolder} color="primary">
                                        Create
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>



                    </form>


                ))}
            </div>
        </div>





    )

}

export default FileManager;