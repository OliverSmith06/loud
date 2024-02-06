'use client'
import * as React from 'react';
import { useEffect, useState, MouseEvent } from 'react';
import './page.scss'
import { SortableItem } from '@/components/SortableItem/SortableItem';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { KeyboardArrowUp, KeyboardArrowDown, Add, AddCircleOutline } from '@mui/icons-material';
import { Accordion } from '@/components/Accordion/Accordion';
import { Button, TextField } from '@mui/material';
import { Dance } from '@/models/Dance';
import { postDance } from '@/api/postDance';

export const Modal = () => {
    return (
        <div className="add-section__modal">
            {/* <div className='add-section__modal--wrapper'>
                <div className="section-form__close">
                <span  onClick={closeAddSection}>&times;</span>
                </div>
                <div className="add-section__modal--content">
                <TextField className='section-form__title' onChange={(evt) => setSectionName(evt.target.value)} id="standard-basic" label="Name" variant="standard" />
                <TextField className='section-form__title' onChange={(evt) => setSectionDesc(evt.target.value)} id="standard-basic" label="Description" variant="standard" />
                <Button className='section-form__submit' onClick={postData} variant="contained" color="secondary">
                    Add Section
                </Button>
                </div>
            </div> */}
        </div>
    )
}