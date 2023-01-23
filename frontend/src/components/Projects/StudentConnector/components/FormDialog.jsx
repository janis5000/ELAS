import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useState} from "react";

const FormDialog = ({open, handleDialogStatus, currentProfile, handleSaveImage}) => {

    const [url, setUrl] = useState("")

    const handleClose = () => {
        handleDialogStatus(false);
    }

    const handleSave = () => {
        handleSaveImage({... currentProfile, "profile_image": url})
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Profile Image</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To change your profile image please enter a valid URL to an image of your choice.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Profile Image URL"
                type="email"
                fullWidth
                onChange={e => {
                    setUrl(e.target.value)
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>)
}
export default FormDialog;