import React, { useEffect, useState } from "react";
import "./Recomended.css";
import thumbNail1 from "../../assets/thumbnail1.png";
import thumbNail2 from "../../assets/thumbnail2.png";
import thumbNail3 from "../../assets/thumbnail3.png";
import thumbNail4 from "../../assets/thumbnail4.png";
import thumbNail5 from "../../assets/thumbnail5.png";
import thumbNail6 from "../../assets/thumbnail6.png";
import thumbNail7 from "../../assets/thumbnail7.png";
import thumbNail8 from "../../assets/thumbnail8.png";
import { API_KEY, value_convertor } from "../../data";
import { Link } from "react-router-dom";
const Recomended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchRecData = async () => {
    const RecUrl = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(RecUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchRecData();
  }, []);
  return (
    <>
      <div className="recomemded">
        {apiData.map((item, index) => {
          return (
            <Link
              style={{ color: "black" }}
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              key={index}
              className="side-video-list"
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_convertor(item.statistics.viewCount)} Views</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Recomended;
