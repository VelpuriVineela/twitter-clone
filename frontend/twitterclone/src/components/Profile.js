import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      //unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      //follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>
        <img
          src="https://media.licdn.com/dms/image/D4D16AQGF0XoPHpItqw/profile-displaybackgroundimage-shrink_350_1400/0/1682430014674?e=1717632000&v=beta&t=YNhAaWyrd4FMsN6_q9A74jKkyQ80_8kmQ94vbW2Y20M"
          alt="banner"
        />
        <div className="absolute top-40 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://png.pngitem.com/pimgs/s/128-1284293_marina-circle-girl-picture-in-circle-png-transparent.png"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 hover:bg-gray-200 rounded-full  border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-4 py-1 bg-black text-white rounded-full "
            >
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4">
          <p>
            🎇🔥 writing code to produce cool effects on the web is like
            creating a work of art. It involves knowledge, time and effort to
            learn and practice, creativity, problem-solving skills, aesthetics
            and much more.|“Dream. Learn. Do. Repeat. 💭📚🚀🔄”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
