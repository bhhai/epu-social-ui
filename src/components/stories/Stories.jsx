import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
// import 'swiper/css';
import 'swiper/swiper.min.css';
import User from "../user/User";
import "./stories.scss";
import { useState } from "react";
import { CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '1px solid #ccc',
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const [showStory, setShowStory] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [viewed, setViewed] = useState([]);

  const [storyUnread, setStoryUnread] = useState([])

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    const getList = async () => {
      const res = await makeRequest.get("/stories/viewList");
      setViewed(res.data.data);
    }
    getList();
  }, [])

  useEffect(() => {
    if (data && viewed) {
      let yFilter = viewed.map(itemY => { return itemY.storyId; });
      let filteredX = data?.filter(itemX => !yFilter.includes(itemX.id));
      setStoryUnread(filteredX);
    }
  }, [data, viewed])

  const handleViewStory = async (item) => {
    try {
      const body = {
        userId: currentUser.id,
        storyId: item?.id,
        viewed: true
      }
      const res = await makeRequest.post("/stories/view", body)
    }
    catch {
      console.log("err");
    }
  }

  const handleClick = async (item) => {
    setViewItem(item)
    setShowStory(true)
    await handleViewStory(item);
  }

  const handleClose = () => {
    setShowStory(false)
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      {
        storyUnread && storyUnread?.length > 0 && (
          <div className="stories">
            {/* <div className="story">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div> */}
            {/* {error
          ? "Something went wrong"
          : isLoading
            ? "loading"
            : data.map((story) => (
              <div className="story" key={story.id}>
                <img src={story.img} alt="" />
                <span>{story.name}</span>
              </div>
            ))} */}

            {
              <div style={{ width: "100%", height: "200px" }}>
                <Swiper
                  spaceBetween={20}
                  slidesPerView={5}
                  onSlideChange={() => console.log('slide change')}
                  style={{ width: "898px" }}
                >
                  {
                    storyUnread?.length > 0 && storyUnread?.map((item, i) => (
                      <SwiperSlide key={i} onClick={() => handleClick(item)} >
                        <div className="storyItem" style={{ backgroundImage: "url(" + item.img + ")" }}>
                          <User data={item} isAvatar />
                        </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            }

            {
              showStory && (
                <Modal
                  open={showStory}
                  onClose={handleClose}
                >
                  <Box sx={style} height={500}>
                    <div className="storyItem view" style={{ backgroundImage: "url(" + viewItem.img + ")" }}>
                      <User data={viewItem} />
                    </div>
                  </Box>
                </Modal>
              )
            }

          </div>
        )
      }
    </>
  );
};

export default Stories;
