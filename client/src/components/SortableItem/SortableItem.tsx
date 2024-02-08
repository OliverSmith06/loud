import React, { useEffect, useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import './SortableItem.scss'
import ReactPlayer from 'react-player';
import { getVideos } from '@/api/getVideos';
import { getVideo } from '@/api/getVideo';
import { CircularProgress } from '@mui/material';
import { VideoContextMenu } from '@/components/VideoContextMenu/VideoContextMenu';
import {  baseBackendUrl } from '@/secrets/env';

interface SortableItemProps {
    name: string;
}

// const SortableItem: React.FC<SortableItemProps> = ({name}) => {
export function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  interface VideoItem {
    date: Date;
    desc: string;
    url: string;
    title: string
  }
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [itemContent, setItemContent] = useState<VideoItem>();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<any>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const fetchVideo = async (videoName: string) => {
      try {
        const response = await fetch(`http://${baseBackendUrl}/video/${videoName}`);
        if (!response.ok) {
          console.log(response)
          throw new Error('Failed to fetch video');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    const fetchVideoMetadata = async() => {
      const url = `http://${baseBackendUrl}/video`;
      try {
        const data = await getVideo(url, props.danceId, props.id);
        setVideoData(data.video[0]);
        fetchVideo(`${data.video[0].id}.${data.video[0].video_type}`);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    }

    fetchVideoMetadata();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl])

  

  const handleMouseEnter = () => {
    console.log(props.isHeld)
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };
  
  return (
    <div  
      className='video-item--wrapper' 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      >
      {videoData && (
        <div className='video-item__content'>
          {/* <ReactPlayer
            className='video-item__content--video'
            url= 'videos/01.mkv'
            width='100%'
            height='77%'
            controls = {true}

          /> */}
          {videoUrl ? (
            <video className='video-item__content--video' 
              controls={showControls} // Hide controls by default
              onMouseEnter={handleMouseEnter} // Show controls on mouse enter
              onMouseLeave={handleMouseLeave}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className='video-item__content--video-skeleton'><CircularProgress /></div>
          )}
          <div className='video-item__content--title'>
            <div className='video-item__content--title--text'>
              {videoData.name ? (videoData.name) : (videoData.date)}
            </div>
            <VideoContextMenu className='video-item__content--menu' videoId={videoData.id} />
          </div>
        </div>
        )
      }
    </div>
  );
}