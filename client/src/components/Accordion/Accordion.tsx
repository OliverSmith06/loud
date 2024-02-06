import * as React from 'react';
import { useEffect, useState, MouseEvent } from 'react';
import './Accordion.scss'
import { SortableItem } from '@/components/SortableItem/SortableItem';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { KeyboardArrowUp, KeyboardArrowDown, Add, CheckCircle, Cancel, CloudUpload } from '@mui/icons-material';
import { Button, CircularProgress, TextField, styled } from '@mui/material';
import { Video, VideoResponse } from '@/models/Video';
import { postVideo } from '@/api/postVideo';
import { getVideos } from '@/api/getVideos';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { updateVideoOrder } from '@/api/updateVideoOrder';
import axios from 'axios';

interface AccordionProps {
    danceId: number;
    title: string;
    videoIds: number[];
}

export const Accordion: React.FC<AccordionProps> = ({ danceId, title, videoIds}) => {

  const [items, setItems] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [videoName, setVideoName] = useState<string>('');
  const [videoDesc, setVideoDesc] = useState<string>('');
  const [videosData, setVideosData] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState('uploading');
  const [showVideos, setShowVideos] = useState(false);
  const [showSaveOrder, setShowSaveOrder] = useState(false);
  const [initialOrdering, setInitialOrdering] = useState<number[]>([])
  const [orderForSaving, setOrderForSaving] = useState<number[]>([]);

  useEffect(() => {

    const fetchVideos = async() => {
      const url = "http://localhost:8000/videos";
      try {
        const data = await getVideos(url, danceId);
        setItems((data.videos as VideoResponse[]).map(video => video.order))
        setOrderForSaving((data.videos as VideoResponse[]).map(video => video.order))
        setShowVideos(true);
        console.log('Received videos:', data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    }

    fetchVideos();

  }, []);


    const sensors = useSensors(
      useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
          delay: 250,
          tolerance: 10,
        },
      }),

      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    function handleDragEnd(event: any) {
      const {active, over} = event;
      
      if (active.id !== over.id) {
        setItems((items: any) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          
          const newItems: number[] = arrayMove(items, oldIndex, newIndex);
          setOrderForSaving(newItems);
          console.log(`new items: ${newItems}`);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      
      
      setShowSaveOrder(true);
    }
  

    const openAddVideo = () => {
      setShowModal(true);
    }
  
    const closeAddVideo = () => {
      setShowModal(false);
    }
  
    function handleClick(event: any) {
      setIsExpanded((prevIsExpanded: any) => !prevIsExpanded);
    }

    const handleFileChange = (event: any) => {
      setFileName(event.target.files[0].name)
      setSelectedFile(event.target.files[0]);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleUpload = (videoId: number) => {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('videoId', videoId.toString());
  
      const xhr = new XMLHttpRequest();
      setOpen(true);
  
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log('Upload successful');
            setStatus('completed')
          } else {
            setStatus('failed')
            console.error(`Upload failed: ${xhr.statusText}`);
          }
        }
      };
  
      xhr.open('POST', 'http://localhost:8000/upload/single', true);
      xhr.setRequestHeader('videoid', videoId.toString());
      xhr.send(formData);
    };

    async function postData() {
      closeAddVideo();
      const video: Video = {
        dance: danceId,
        order: 1,
        date: new Date(),
        name: videoName !== '' ? [videoName] : undefined,
        desc: videoDesc !== '' ? [videoDesc] : undefined,
      }

      const url = "http://localhost:8000/createVideo";
      try {
        const data = await postVideo(url, video);
        handleUpload(data.video.id)
        console.log('Posted video:', data);
      } catch (error) {
        console.error('Failed to post video:', error);
      }
    }

    async function saveOrder() {
      console.log(orderForSaving);
      const url = "http://localhost:8000/updateOrdering";
      try {
        const data = await updateVideoOrder(url, initialOrdering, items, danceId);
        console.log('Posted video:', data);
      } catch (error) {
        console.error('Failed to post video:', error);
      }
    }

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    

    let icon;
    if (status === 'failed') {
      icon = <Cancel />;
    } else if (status === 'completed') {
      icon = <CheckCircle />;
    } else {
      icon = <CircularProgress />;
    }

    const snackContent = (
      <React.Fragment>
        {icon}
        {`Upload in progress: ${uploadProgress.toFixed(2)}%`}
      </React.Fragment>
    )

    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });

    return (
        <div>
          {showModal && (
            <div className="add-section__modal">
              <div className='add-section__modal--wrapper'>
                <div className="section-form__close">
                  <span  onClick={closeAddVideo}>&times;</span>
                </div>
                <div className="add-section__modal--content">
                  <TextField className='section-form__title' onChange={(evt) => setVideoName(evt.target.value)} id="standard-basic" label="Name" variant="standard" />
                  <TextField className='section-form__title' onChange={(evt) => setVideoDesc(evt.target.value)} id="standard-basic" label="Description" variant="standard" />
                  {/* <input type="file" onChange={handleFileChange} /> */}
                  <Button className='section-form__upload' component="label" variant="contained" startIcon={<CloudUpload />}>
                    Upload file
                    <VisuallyHiddenInput onChange={handleFileChange} type="file" />
                  </Button>
                  <div className='section-form__file-name'>
                    {fileName}
                  </div>
                  <Button className='section-form__submit' onClick={postData} variant="contained" color="secondary">
                    Add Video
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className='accordion'>
              
              <div className='accordion__header' onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className='accordion__header--icon'>
                  {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </div>
              <div className='accordion__header--title'>
                  {title}
              </div>
              </div>
              {showSaveOrder && (
                <div className='accordion-content--save-wrapper'>
                  <Button onClick={saveOrder} className='accordion-content--save-button' variant="contained" color="success">
                    Save
                  </Button>
                </div>
              )}
              {showVideos && (

                <div className={`accordion-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
              <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              >
                  <SortableContext 
                  items={items}
                  strategy={rectSortingStrategy}
                  >
                  
                      <div>
                      {items.map(id => <SortableItem 
                                          key={id} 
                                          id={id} 
                                          danceId={danceId} 
                                          />)}
                      <div onClick={openAddVideo} style={{ cursor: 'pointer' }} className='accordion__content--add-video'>
                      <div className='accordion__content--add-video--items'>
                          <div><Add /></div>
                          <div>Add Video</div>
                      </div>
                      </div>
                      </div> 
                  
                  </SortableContext>
              </DndContext> 
              </div>
              )}
          </div>
          <Snackbar
            open={open}
            onClose={handleClose}
            message={snackContent}
            action={action}
          />
        </div>
    )
}