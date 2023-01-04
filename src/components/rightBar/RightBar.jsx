import { Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { BASE_URL } from "../../utils/constance";
import User from "../user/User";
import "./rightBar.scss";

const RightBar = () => {

  const [users, setUsers] = useState([]);
  const [hotUser, setHotUser] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await makeRequest.get(`/users/timeLogin`)
      if (res.data) {
        setUsers(res.data);
      }
    }
    getData();
  }, [])
  useEffect(() => {
    const getData = async () => {
      const res = await makeRequest.get(`/relationships/hotUser`)
      if (res.data) {
        setHotUser(res.data);
      }
    }
    getData();
  }, [])

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {
            hotUser && hotUser?.length > 0 && hotUser?.slice(0, 5).map((item) => (
              <div className="user" key={item.id}>
                <User data={item} hiddenTime />
                <div className="buttons">
                  <Button color="primary">Follow</Button>
                  <Button color="error">Dismiss</Button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="item">
          <span>Latest Activities</span>
          {
            users && users?.length > 0 && users.filter((item) => item.loginTime).slice(0, 5).map((u) => (
              <div className="user" key={u.id}>
                <Link to={`/profile/${u.id}`} className="userInfo">
                  <User data={u} hiddenTime />
                </Link>
                <span>{moment(u.loginTime).fromNow()}</span>
              </div>
            ))
          }
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
