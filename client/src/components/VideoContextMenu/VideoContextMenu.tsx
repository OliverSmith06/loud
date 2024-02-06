'use client'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteVideo } from '@/api/deleteVideo';
import './VideoContextMenu.scss';

interface VideoContextMenuProps {
    videoId: number;
    className: string;
}

export const VideoContextMenu: React.FC<VideoContextMenuProps> = ({ videoId, className }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDeleteClick = () => {
        setAnchorEl(null);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }
    
    const handleDeleteVideo = () => {
        setOpenDeleteDialog(false);
        const url = "http://localhost:8000/deleteVideo"
        deleteVideo(url, videoId);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={className}>
            <IconButton
                aria-label="more"
                className='video-context-menu__icon'
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDeleteClick}>Remove</MenuItem>
            </Menu>
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
                </DialogTitle>
                <DialogActions>
                <Button style={{backgroundColor: "#8a79bb", color: "black"}} onClick={handleCloseDeleteDialog}>Cancel</Button>
                <Button style={{backgroundColor: "#fc3165", color: "black"}} onClick={handleDeleteVideo} autoFocus>
                    Remove
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}