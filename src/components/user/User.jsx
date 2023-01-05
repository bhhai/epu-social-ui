import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./user.scss"
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

function User(props) {
  const { data, isAvatar, hiddenTime, isOnline } = props;

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + data.id).then((res) => {
        return res.data;
      })
  );

  return (
    <div className="userInfo">
      {
        data && (
          <>
            <div className='avt'>
              {isOnline && <div className='dot'></div>}
              <img src={data?.profilePic ? "/upload/" + data?.profilePic : data?.avt || "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"} alt="" />
            </div>

            <div className="details">
              <Link
                to={`/profile/${data.userId || data.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                className="details__info"
              >
                {
                  !isAvatar && <span className="name">{data.name}</span>
                }
                {
                  !isAvatar && data?.isOfficial && data?.isOfficial !== 0 && <CheckCircleIcon className='tick' />
                }
              </Link>
              {
                !isAvatar && !hiddenTime && <span className="date">{moment(data.createdAt).fromNow()}</span>
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default User