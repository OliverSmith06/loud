'use client'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState, MouseEvent, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteVideo } from '@/api/deleteVideo';
import './Category.scss';
import { Button, CircularProgress, Snackbar, TextField, styled } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Add, CheckCircle, Cancel, CloudUpload, AddCircleRounded } from '@mui/icons-material';
import {  baseBackendUrl } from '@/secrets/env';
import ActionSheet from "actionsheet-react";
import { Item } from '@/models/Item';
import { postItem } from '@/api/postItem';
import { getItems } from '@/api/getItems';
import { OurItem } from '../OurItem/OurItem';

interface CategoryProps {
    name: string,
    color?: string,
    categoryImgUrl?: string,
    categoryId: number;
}

export const Category: React.FC<CategoryProps> = ({ name, color, categoryImgUrl, categoryId }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [itemName, setItemName] = useState<string>('');
    const [itemDesc, setItemDesc] = useState<string>('');
    const [itemLocation, setItemLocation] = useState<string>('');
    
    const [items, setItems] = useState<Item[] | null>(null);
    const [currentStatusMessage, setCurrentStatusMessage] = useState<string | null>(null);
    const [status, setStatus] = useState(false);
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
        const fetchCategories = async() => {
            try {
                const data = await getItems(categoryId);
                setItems(data.items)
                console.log(items)
            } catch (error) {
                console.error('Failed to fetch categories: ', error)
            }
        }

        fetchCategories();
    }, []);

    function handleClick(event: any) {
        setIsExpanded((prevIsExpanded: any) => !prevIsExpanded);
    }

    async function postData() {
        
        handleClose();
        const ourNewItem: Item = {
            id: -1,
            name: itemName,
            category: categoryId, // Foreign key of item category
            desc: itemDesc,
            itemURL: '',
            itemImgUrl: '',
            location: itemLocation,
            price: -1,
        }
        // const video: Item = {
        //   dance: danceId,
        //   order: 1,
        //   date: new Date(),
        //   name: videoName !== '' ? [videoName] : undefined,
        //   desc: videoDesc !== '' ? [videoDesc] : undefined,
        //   video_type: [fileExtension || 'mp4'],
        // }
        try {
            const data = await postItem(ourNewItem);
            // items?.push(ourNewItem);
            setCurrentStatusMessage("Item Added!")
            setStatus(true);
            setItems([...(items || []), ourNewItem]);
            console.log('Posted item: ', data);
        } catch (error) {
            console.error('Failed to post item: ', error)
        }
  
        // const url = `http://${baseBackendUrl}/createVideo`;
        // try {
        //   const data = await postVideo(url, video);
        //   handleUpload(`${data.video.id}.${data.video.video_type}`)
        //   console.log('Posted video:', data);
        // } catch (error) {
        //   console.error('Failed to post video:', error);
        // }
      }

      const handleStatusClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setStatus(false);
      };

      const statusAction = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleStatusClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      )

      const statusMessage = (
        <React.Fragment>
          {currentStatusMessage && <div>{currentStatusMessage}</div>}
        </React.Fragment>
      )

      // #B7D3F8
    return (
        <div className='category'>
            <div className={`category__header ${isExpanded ? '' : 'accordion__header--collapsed'}`}  onClick={handleClick} style={{ cursor: 'pointer' }}>
                <div className='category__header--icon'>
                    {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </div>
                <div className='category__header--title'>
                    <div style={{backgroundColor: `${color}`}} className='category__header--category-icon'>

                    </div>
                    {name}
                </div>
            </div>
            
            <div className={`category__content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className='category__item-container'>
                    <div style={{backgroundColor: `${color}`}} className='category__color-line'>

                    </div>
                    <div className='category__items'>
                        {items ? (
                            items.map((item: Item) => (
                                <OurItem
                                    key={item.id}
                                    itemId={item.id}
                                    name={item.name}
                                    category={item.category}

                                />
                            ))
                        ) : (
                            <CircularProgress style={{marginBottom: '2rem'}} />
                        )}
                    </div>
                </div>
                <IconButton style={{color: `${color}`}}  onClick={handleOpen} className='category-form__submit' aria-label="delete">
                    <AddCircleIcon />
                </IconButton>
            </div>
            <ActionSheet ref={ref}>
                <div style={style.content}>
                <div className='add-section__modal--wrapper'>
                    <div className="section-form__close">
                    </div>
                    <div className="add-section__modal--content">
                    <TextField 
                        className='section-form__title' 
                        onChange={(evt) => setItemName(evt.target.value)} 
                        id="standard-basic" 
                        label="Name" 
                        variant="outlined" 
                    />
                    <TextField 
                        className='section-form__title' 
                        onChange={(evt) => setItemDesc(evt.target.value)} 
                        id="standard-basic" 
                        label="Description" 
                        variant="outlined" 
                    />
                    <TextField 
                        className='section-form__title' 
                        onChange={(evt) => setItemLocation(evt.target.value)} 
                        id="standard-basic" 
                        label="Location" 
                        variant="outlined" 
                    />
                    {/* <input type="file" onChange={handleFileChange} /> */}
                    <Button className='section-form__submit' onClick={postData} variant="contained" color="secondary">
                        Add Item
                    </Button>
                    </div>
                </div>
                </div>
            </ActionSheet>
            <Snackbar
                open={status}
                onClose={handleStatusClose}
                message={statusMessage}
                action={statusAction}
            />
        </div>
    );
}