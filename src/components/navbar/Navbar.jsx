import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import User from "../user/User";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const [formSearch, setFormSearch] = useState(false);
  const [hotUser, setHotUser] = useState(false);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await makeRequest.get(`/relationships/hotUser`)
      if (res.data) {
        setHotUser(res.data);
      }
    }
    getData();
  }, [])

  const handleSearch = async (e) => {
    setSearch(e.target.value.trim())
    // const res = await makeRequest.get(`users/findByName/${e.target.value.trim()}`);
    // console.log(res)
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>EPU social</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e)} value={search} onClick={() => setFormSearch(true)} onBlur={() => setFormSearch(false)} />
        </div>

        {
          formSearch && (
            <div className="box">
              <span className="label">Recommend search</span>
              <div className="users">
                {
                  hotUser && hotUser?.length > 0 && hotUser?.slice(0, 5).map((item) => (
                    <div className="user" key={item.id}>
                      <User data={item} hiddenTime />
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${userId}`} className="user">
          <img
            src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : currentUser?.avt}
            alt=""
          />
          <span>{currentUser.name}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
