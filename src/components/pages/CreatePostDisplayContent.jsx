import React, { useContext, useRef, useState } from "react";
// MomentJS
import moment from "moment";
// UUID
import { v4 as uuidv4 } from "uuid";
// Context
import { PostContext } from "../context/PostContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
// Styling
import { CgImage } from "react-icons/cg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";

import "./createpost.scss";

const CreatePostInput = () => {
  const { currentUser } = useContext(UserContext);
  const { allUserPosts, setAllUserPosts } = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitPost, setSubmitPost] = useState(false);

  const inputText = useRef();
  const inputWebUrl = useRef();

  // function generatePostId() {
  //   const currentUserPosts = allUserPosts.filter(post => post.username === currentUser.username)
  //   const sortedPostIds = currentUserPosts.map(post => post.postid).sort()

  //   if (sortedPostIds.length > 1) {
  //     return `${currentUser.userid}-${parseInt(sortedPostIds[1].charAt(2)) + 1}`
  //   } else if (sortedPostIds.length == 0){
  //     return `${currentUser.userid}-${parseInt(sortedPostIds[0].charAt(2)) + 1}`
  //   }
  // }

  function handlePrivateChange() {
    setIsPrivate(!isPrivate);
  }

  // ON SUBMIT ==========================================
  function handlePostSubmit(e) {
    e.preventDefault();
    console.log("submitPost :>> ", submitPost);
    setAllUserPosts([
      ...allUserPosts,
      {
        postid: uuidv4(),
        userid: currentUser.userid,
        username: currentUser.username,
        avatar: currentUser.avatar,
        title: title,
        text: inputText.current.value,
        websiteUrl: inputWebUrl.current.value,
        imageUrl: imageUrl,
        isPrivate: isPrivate,
        date: moment().format("dddd DD MMMM YYYY"),
        comments: [],
      },
    ]);
    setSubmitPost(true);
    // Empty input
    setTitle("");
    inputText.current.value = "";
    inputWebUrl.current.value = "";
    setImageUrl("");
  }

  const success = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.85,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };

  return (
    <section className="createpost-display">
      {submitPost ? (
        <div className="confirmPost">
          <motion.section
            className="confirmPost_container"
            initial="hidden"
            animate="show"
          >
            <BsFillCheckCircleFill className="postInput_confirmIcon" />
            <motion.h2 variants={success}>We got this</motion.h2>
          </motion.section>

          <section className="confirmPost_buttons_c">
            <p
              onClick={() => setSubmitPost(false)}
              className="confirmPost_button"
            >
              Create another post
            </p>
          </section>
        </div>
      ) : (
        <form className="CreatePostForm" onSubmit={handlePostSubmit}>
          <section className="createpost-inner">
            <div className="createpost-top">
              <section className="createpost-leftside-container ">
                {/* INPUT TITLE */}
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {/* INPUT COMMENT */}
                <textarea
                  ref={inputText}
                  name="textInput"
                  id="textInput"
                  placeholder=" ... write your caption"
                  rows="5"
                  cols="33"
                ></textarea>

                {/* INPUT WEB URL */}
                <input
                  ref={inputWebUrl}
                  type="url"
                  name="websiteUrl"
                  id="websiteUrl"
                  placeholder="website URL"
                />
              </section>

              {/* INPUT IMAGE */}
              <section className="createpost-rightside-container">
                <input
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  placeholder="image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <div className="imgContainer">
                  {imageUrl === "" ? (
                    <CgImage className="postInput-icon" />
                  ) : (
                    <img src={imageUrl} alt={title} />
                  )}
                </div>
              </section>
            </div>

            <section className="createpost-bottom">
              {/* INPUT PRIVATE */}
              <label className="createpost-private" name="isPrivate">
                <p>Private</p>
                <input
                  type="checkbox"
                  name="isPrivate"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={handlePrivateChange}
                />
              </label>

              {/* SUBMIT BUTTON */}
              <button className="button-submit" type="submit" disabled={!title}>
                SUBMIT
              </button>
            </section>
          </section>
        </form>
      )}
    </section>
  );
};

export default CreatePostInput;
