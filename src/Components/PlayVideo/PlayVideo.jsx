import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_convertor } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";
const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);

  const [channelData, setChannelData] = useState(null);

  const [commentData, setCommentData] = useState([]);

  const videoLinkUrl = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}
    `;
    await fetch(videoDetails_url)
      .then((response) => response.json())
      .then((data) => setApiData(data.items[0]));
  };

  const channelDataUrl = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}
    `;
    await fetch(channelData_url)
      .then((response) => response.json())
      .then((data) => setChannelData(data.items[0]));

    // Comment url

    const fetchCommentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(fetchCommentUrl)
      .then((response) => response.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    videoLinkUrl();
  }, [videoId]);

  useEffect(() => {
    channelDataUrl();
  }, [apiData]);
  return (
    <>
      <div className="play-video">
        {/* <video src={video1} controls muted autoPlay></video> */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <h3>{apiData ? apiData.snippet.title : "Title-Here"}</h3>
        <div className="play-video-info">
          <p>
            {value_convertor(
              apiData ? apiData.statistics.viewCount : "Views-Count"
            )}{" "}
            Views &bull;{" "}
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "Days"}{" "}
          </p>

          <div>
            <span>
              {" "}
              <img src={like} alt="" />
              {value_convertor(
                apiData ? apiData.statistics.likeCount : "Likes"
              )}
            </span>
            <span>
              <img src={dislike} alt="" />
            </span>
            <span>
              <img src={save} alt="" /> Save
            </span>
            <span>
              <img src={share} alt="" /> Share
            </span>
          </div>
        </div>
        <div className="publisher">
          <img
            src={channelData ? channelData.snippet.thumbnails.default.url : ""}
            alt=""
          />
          <div>
            <p>{apiData ? apiData.snippet.channelTitle : "Channel-Title"}</p>
            <span>
              {value_convertor(
                channelData
                  ? channelData.statistics.subscriberCount
                  : "Sub-count"
              )}{" "}
              Subscribers
            </span>
          </div>
          <button>Subscribe</button>
        </div>
        <div className="vid-description">
          <p>{apiData ? apiData.snippet.description.slice(0, 250) : "desc"}</p>
          <hr />
          <h4>
            {value_convertor(
              apiData ? apiData.statistics.commentCount : "Comment-Count"
            )}{" "}
            Comments
          </h4>
          {commentData.map((item, index) => {
            return (
              <div key={index} className="comment-section">
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    <span>
                      {moment(
                        item.snippet.topLevelComment.snippet.publishedAt
                      ).fromNow()}
                    </span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {value_convertor(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlayVideo;
