var express = require('express');
var router = express.Router();

const ytch = require('yt-channel-info')

//import { Youtube } from 'tube-api';
const Youtube = require('tube-api').Youtube;
const YOUTUBE_API_KEY = 'AIzaSyC-FiPAdujQL7XV0P31rZ7pAUu4SMchuRc'
const ytube = new Youtube(YOUTUBE_API_KEY);
const channelId = 'UCtxs-UF_cW0zCP123nbHTAw'
const uploads_id= 'UUtxs-UF_cW0zCP123nbHTAw'

//-------------------------------videos---------------------------------------------------
router.get('/',async (req,res,next)=>{

  const videos = await ytube.videosList(uploads_id, [])

  let videos_data = [];//<<===========

  for(var i=0;i<videos.length;i++){

      let video_item={
        title:videos[i].title,
        videoURL: `https://www.youtube.com/watch?v=${videos[i].video_id}`,
        thumbnails:videos[i].thumbnails.medium.url,
        views:videos[i].statistics.viewCount,
        likes:videos[i].statistics.likeCount

      }
      videos_data.push(video_item);

  }
//---------------------------------------------------------------------------------------------


  const channel_stats = await ytube.channelDetails(channelId)

  var likesList=[]
  for(var i=0;i<videos.length;i++){
    eachLikes=parseInt(videos[i].statistics.likeCount)
    likesList.push(eachLikes)

  }
  let totalLikes= await likesList.reduce((a, b) => a + b, 0)

  let channel_data={             
    subscriberCount:channel_stats.statistics.subscriberCount,
    totalViews:channel_stats.statistics.viewCount,
    totalLikes:String(totalLikes),
    totalVideos:channel_stats.statistics.videoCount

  };
  //-----------------------------------------------------------------------------------------

  let Response = { 
    videos_data : videos_data,
    channel_data : channel_data
   }
 //console.log(Response);
  
  try{
    res.status(200).send(Response);
  }catch(err){
      res.status(500).json(err)
  }
  
    
})


module.exports = router;
