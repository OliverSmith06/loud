'use client'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState, MouseEvent, useRef } from 'react';
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
import './OurItem.scss';
import { KeyboardArrowUp, KeyboardArrowDown, Add, CheckCircle, Cancel, CloudUpload } from '@mui/icons-material';
import {  baseBackendUrl } from '@/secrets/env';
import ActionSheet from "actionsheet-react";

interface CategoryProps {
    itemId: number,
    name: string,
    category: number,
    desc?: string,
    itemImgUrl?: string,
    itemUrl?: string,
    location?: string,
    price?: number,
}

export const OurItem: React.FC<CategoryProps> = ({ itemId, name, category, desc, itemImgUrl, itemUrl, location, price }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const ref = useRef<any>();

    const handleOpen = () => {
        ref.current.open();
    };

    const handleClose = () => {
        ref.current.close();
    };

    const style = {
        content: {
          height: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
    };

    useEffect(() => {


        console.log("INIT CATEGORY")
    }, []);

    function handleClick(event: any) {
        setIsExpanded((prevIsExpanded: any) => !prevIsExpanded);
    }

    return (
        <div className='our-item'>
            {name}
        </div>
    );
}