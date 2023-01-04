import "./profile.scss";
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from '@mui/icons-material/School';
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import WifiIcon from '@mui/icons-material/Wifi';
import { useState } from "react";
import { Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data?.coverPic} alt="" className="cover" />
            <img src={data.profilePic ? "/upload/" + data.profilePic : data?.avt} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="des">
                <h4 className="name">
                  {data?.name}
                  {
                    data?.isOfficial && <CheckCircleIcon fontSize="small" color="primary" className="icon" />
                  }
                </h4>
                <span>
                  {data?.des}
                </span>
              </div>
              <div className="info">
                {
                  data?.city && (
                    <div className="info-item">
                      <PlaceIcon fontSize="medium" />
                      <span className="value">
                        Lives in <b>{data?.city}</b>
                      </span>
                    </div>
                  )
                }
                {
                  data?.working && (
                    <div className="info-item">
                      <WorkIcon fontSize="medium" />
                      <span className="value">
                        Works at <b>{data?.working}</b>
                      </span>
                    </div>
                  )
                }
                {
                  data?.lerning && (
                    <div className="info-item">
                      <SchoolIcon fontSize="medium" />
                      <span className="value">
                        Studied at <b>{data?.learning}</b>
                      </span>
                    </div>
                  )
                }
                <div className="info-item">
                  <WifiIcon fontSize="medium" />
                  <span className="value">
                    Followed by <b>999 persons</b>
                  </span>
                </div>
                <div className="buttons">
                  {rIsLoading ? (
                    "Loading"
                  ) : userId === currentUser.id ? (
                    <Button variant="contained" onClick={() => setOpenUpdate(true)}>update your info</Button>
                  ) : (
                    <Button variant="contained" onClick={handleFollow}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  )}
                </div>
              </div>
              {/* <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "Loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div> */}
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}

    </div>
  );
};

export default Profile;
