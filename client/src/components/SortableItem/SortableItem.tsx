import React, { useEffect, useRef, useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import './SortableItem.scss'
import ReactPlayer from 'react-player';
import { getVideos } from '@/api/getVideos';
import { getVideo } from '@/api/getVideo';
import { CircularProgress } from '@mui/material';
import { VideoContextMenu } from '@/components/VideoContextMenu/VideoContextMenu';
import {  baseBackendUrl } from '@/secrets/env';
import { PlayArrow } from '@mui/icons-material';

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
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // const fetchVideo = async (videoName: string) => {
    //   try {
    //     const response = await fetch(`http://${baseBackendUrl}/video/${videoName}`);
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

    // const fetchVideo = async (videoName: string) => {
    //   try {
    //     const response = await fetch(`http://${baseBackendUrl}/video/${videoName}`);
    //     const blob = await response.blob();
    //     if (videoRef.current) {
    //       videoRef.current.src = URL.createObjectURL(blob);
    //     }
    //   } catch (error) {
    //     console.error('Error streaming video:', error);
    //   }
    // };

    const fetchVideoMetadata = async() => {
      const url = `http://${baseBackendUrl}/video`;
      try {
        const data = await getVideo(url, props.danceId, props.id);
        setVideoData(data.video[0]);
        // fetchVideo(`${data.video[0].id}.${data.video[0].video_type}`);
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

  const onPlay = () => {
    setPlayVideo(true);
  }
  
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
          {videoData ? (
            <>
              {playVideo ? (
                <video className='video-item__content--video' 
                  autoPlay
                  controls={showControls} // Hide controls by default
                  onMouseEnter={handleMouseEnter} // Show controls on mouse enter
                  onMouseLeave={handleMouseLeave}
                >
                  <source src={`http://${baseBackendUrl}/video/${videoData.id}.${videoData.video_type}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div 
                  onClick={onPlay} 
                  className='video-item__content--video'
                  style={{
                    backgroundImage: `url('http://${baseBackendUrl}/random-frame/${videoData.id}.${videoData.video_type}')`, // Replace with your image path
                    backgroundSize: 'cover', // Adjust as needed
                    backgroundPosition: 'center', // Adjust as needed
                  }}
                >
                  <div><PlayArrow style={{color: 'white', fontSize: '6rem'}} /></div>
                </div>
              )}
            </>
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