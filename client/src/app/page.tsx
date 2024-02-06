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
import { Button, CircularProgress, TextField } from '@mui/material';
import { Dance } from '@/models/Dance';
import { postDance } from '@/api/postDance';
import axios from 'axios';
import ParticleBackground from '@/components/ParticleBackground/ParticleBackground';
import LoginPage from '@/components/LoginPage/LoginPage';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import {  baseBackendUrl } from '@/secrets/env';

const Home = () => {

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [sectionData, setSectionData] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLogin = () => {

  }

  useEffect(() => {
    // const fetchVideo = async () => {
    //   try {
    //     const response = await fetch(`http://${baseBackendUrl}/video/someVideo.mp4`);
    //     if (!response.ok) {
    //       console.log(response)
    //       throw new Error('Failed to fetch video');
    //     }
    //     const blob = await response.blob();
    //     const url = URL.createObjectURL(blob);
    //     setVideoUrl(url);
    //   } catch (error) {
    //     console.error('Error fetching video:', error);
    //   }
    // };

    
    const clearFileQueue = async() => {
      const res = await axios.get(`http://${baseBackendUrl}/clearFileQueue`)
    }

    
    const fetchDances = async() => {
      const res = await fetch(`http://${baseBackendUrl}/dances`);
      if(!res.ok) {
        console.log(res)
        throw new Error('failed to fetch sections');
      }
      const data = await res.json();
      setSectionData(data.dances);
    }

    const initializeData = async () => {
      await fetchDances(); // Wait for fetchDances to complete
    };
  
    initializeData();

    // Clean up the URL object when the component is unmounted
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);


  // const [items, setItems] = useState([2,1,3,4]);
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  // function handleDragEnd(event: any) {
  //   const {active, over} = event;
    
  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);
        
  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }

  // const [isExpanded, setIsExpanded] = useState(true);

  // function handleClick(event: any) {
  //   setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  // }

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // const handleFileChange = (event: any) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleUpload = () => {
  //   if (!selectedFile) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   const xhr = new XMLHttpRequest();

  //   xhr.upload.addEventListener('progress', (event) => {
  //     if (event.lengthComputable) {
  //       const progress = (event.loaded / event.total) * 100;
  //       setUploadProgress(progress);
  //     }
  //   });

  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === XMLHttpRequest.DONE) {
  //       if (xhr.status === 200) {
  //         console.log('Upload successful');
  //       } else {
  //         console.error(`Upload failed: ${xhr.statusText}`);
  //       }
  //     }
  //   };

  //   xhr.open('POST', 'http://localhost:8000/upload/single', true);
  //   xhr.send(formData);
  // };

  const openAddSection = () => {
    setShowModal(true);
  }

  const closeAddSection = () => {
    setShowModal(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your post submission logic here
    closeAddSection();
  };

  const [sectionName, setSectionName] = useState<string | null>(null);
  const [sectionDesc, setSectionDesc] = useState<string | null>(null);

  async function postData() {
    if (sectionName == null || sectionDesc == null) {
      setHasError(true);
      return
    }
    closeAddSection();
    const dance: Dance = {
      name: [sectionName],
      desc: [sectionDesc],
      dance_order: 1,
    }


    const url = `http://${baseBackendUrl}/createDance`
    try {
      const data = await postDance(url, dance);
      window.location.reload();
      console.log('Posted dance:', data);
    } catch (error) {
      console.error('Failed to post dance:', error);
    }
  }

  // return(
    
  // )

  return (
    <div>
      {loggedIn ? (
        <div>
            {showModal && (
              <div className="add-section__modal">
                <div className='add-section__modal--wrapper'>
                  <div className="section-form__close">
                    <span  onClick={closeAddSection}>&times;</span>
                  </div>
                  <div className="add-section__modal--content">
                    <TextField error={hasError} required className='section-form__title' onChange={(evt) => setSectionName(evt.target.value)} id="standard-basic" label="Name" variant="standard" />
                    <TextField error={hasError} required className='section-form__title' onChange={(evt) => setSectionDesc(evt.target.value)} id="standard-basic" label="Description" variant="standard" />
                    <Button className='section-form__submit' onClick={postData} variant="contained" color="secondary">
                      Add Section
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex min-h-screen flex-col items-center p-24 dashboard">
            <PageHeading />
            {/* <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload</button>
              {uploadProgress > 0 && <p>Upload progress: {uploadProgress.toFixed(2)}%</p>}
            </div>
            <div>
              {videoUrl && (
                <video controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div> */}

            {/* <Accordion danceId={2} title='Red - 9DLC' videoIds={[1,3,2,4]} />
            <Accordion danceId={1} title='Pink - 9DA' videoIds={[1,3]} /> */}
            {sectionData ? (
              sectionData.map((section: any) => (
                <Accordion key={section.id} danceId={section.id} title={section.name} videoIds={[1,3]} />
              ))
            ) : (
              <CircularProgress style={{marginBottom: '2rem'}} />
            )}
            <div onClick={openAddSection} className='add-section'><div className='line'></div><AddCircleOutline /><div className='line'></div></div>
            
            {/* <div className='accordion'>
              <div className='accordion__header' onClick={handleClick} style={{ cursor: 'pointer' }}>
                <div className='accordion__header--icon'>
                  {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </div>
                <div className='accordion__header--title'>
                  Red - 9DLC
                </div>
              </div>
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
                      {items.map(id => <SortableItem key={id} id={id} />)}
                      <div className='accordion__content--add-video'>
                        <div className='accordion__content--add-video--items'>
                          <div><Add /></div>
                          <div>Add Video</div>
                        </div>
                      </div>
                      </div> 
                    
                  </SortableContext>
                </DndContext> 
              </div>
          </div> */}
          </div>
          <ParticleBackground />
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default Home