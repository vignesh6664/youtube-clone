import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbNail1 from "../../assets/thumbnail1.png";
import thumbNail2 from "../../assets/thumbnail2.png";
import thumbNail3 from "../../assets/thumbnail3.png";
import thumbNail4 from "../../assets/thumbnail4.png";
import thumbNail5 from "../../assets/thumbnail5.png";
import thumbNail6 from "../../assets/thumbnail6.png";
import thumbNail7 from "../../assets/thumbnail7.png";
import thumbNail8 from "../../assets/thumbnail8.png";
import { Link } from "react-router-dom";
import { API_KEY, value_convertor } from "../../data";
import moment from "moment";
const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videoLink = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoLink)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };
  useEffect(() => {
    fetchData();
  }, [category]);
  return (
    <>
      <div className="feed">
        {data.map((item, index) => {
          return (
            <Link
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              className="card"
              key={item.id}
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>
                {value_convertor(item.statistics.viewCount)} Views{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Feed;
