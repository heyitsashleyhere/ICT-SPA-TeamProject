import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

// fakePosts API
import postProcess from "../../postProcess.js";

export const PostContext = React.createContext(null);

const fakePosts = [
  {
    postid: "1-1",
    userid: 1,
    username: "Ashley",
    avatar: `https://robohash.org/Ashley`,
    title: "hello",
    text: "My client is weird",
    websiteUrl: "",
    imageUrl:
      "https://images.unsplash.com/photo-1646343453593-ae92a36883c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    isPrivate: false,
    date: "thursday 18 March 2022",
    comments: [],
  },
  {
    postid: "2-1",
    userid: 2,
    username: "Ivo",
    avatar: `https://robohash.org/Ivo`,
    title: "Lorem Ipsummmmmmmmm",
    text: "new office everyone",
    websiteUrl: "",
    imageUrl:
      "https://images.unsplash.com/photo-1646332538196-3e2b35675016?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    isPrivate: false,
    date: "thursday 18 March 2022",
    comments: [
      {
        userid: 1,
        text: "Ipsum Lorem",
        username: "Ashley",
        avatar: "https://robohash.org/Ashley",
      },
    ],
  },
  {
    postid: "3-1",
    userid: 3,
    username: "Henrik",
    avatar: `https://robohash.org/Henrik`,
    title: "monday mornings are #LoremIpsum",
    text: "yes sure is ok",
    websiteUrl: "",
    imageUrl:
      "https://diagrams-notepad.com/wp-content/uploads/2022/01/Diagram-Freehand@2x-729x1024.png",
    isPrivate: false,
    date: "thursday 18 March 2022",
    comments: [
      {
        userid: 4,
        text: "not sure about it",
        username: "Darren",
        avatar: "https://robohash.org/Darren",
      },
    ],
  },
  {
    postid: "4-1",
    userid: 4,
    username: "Darren",
    avatar: `https://robohash.org/Darren`,
    title: "here we go",
    text: "next week meeting, important topics",
    websiteUrl: "",
    imageUrl:
      "https://support.content.office.net/en-us/media/54655fb8-d442-4989-a599-a0c5005342d3.png",
    isPrivate: false,
    date: "thursday 18 March 2022",
    comments: [
      {
        userid: 1,
        text: "paper done",
        username: "Ashley",
        avatar: "https://robohash.org/Ashley",
      },
    ],
  },
  {
    postid: "5-1",
    userid: 5,
    username: "Murad",
    avatar: `https://robohash.org/Murad`,
    title: "about other subjects",
    text: "Meeting was moved to next week",
    website: "",
    imageUrl: "",
    isPrivate: false,
    date: "thursday 19 March 2022",
    comments: [
      {
        userid: 2,
        text: "great, more time",
        username: "Ivo",
        avatar: "https://robohash.org/Ivo",
      },
    ],
  },
];
// Added set localStorage item to have them set on first render
const localPosts = localStorage.getItem("posts");
const localPostsObj = localPosts ? JSON.parse(localPosts) : postProcess;

export default function PostContextProvider(props) {
  const [allUserPosts, setAllUserPosts] = useState(localPostsObj);

  // For SearchBar Function
  const [searchQuery, setSearchQuery] = useState("");

  function searchFilterFunc(posts, query) {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.text.toLowerCase().includes(query.toLowerCase()) ||
        post.username.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  // For Moments & Profile Components:
  const [newComment, setNewComment] = useState("");
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const [inputCommentValue, setInputCommentValue] = useState({});

  // For CreatePost Component:
  const { currentUser } = useContext(UserContext);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [submitPost, setSubmitPost] = useState(false);
  const navigate = useNavigate();

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };
  const closePopUp = () => {
    setIsPopUpOpen(false);

    navigate(`/${currentUser.username}/moments`);
  };

  // To save in local storage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(allUserPosts));
  }, [allUserPosts, inputCommentValue]);

  // FUNCTIONS for Moments&Profile Components:
  function inputComment(userid, username, postid, e) {
    const inputText = e.target.value;
    const newCommentValue = { ...inputCommentValue };
    newCommentValue[postid] = inputText;
    setInputCommentValue(newCommentValue);
    setNewComment({ userid: userid, username: username, text: inputText });
  }
  function showThreadFunc(post) {
    if (showCommentsFor === post.postid) {
      setShowCommentsFor(null);
    } else {
      setShowCommentsFor(post.postid);
    }
  }
  //!ASK JOEL
  function addCommentHandler(thePost, postid) {
    const findThePost = allUserPosts.find(
      (post) => post.postid === thePost.postid
    );
    findThePost.comments.push(newComment);

    // const remainPosts = allUserPosts.find(post => post.postid !== thePost.postid)
    // setAllUserPosts([...remainPosts, findThePost])

    // to clear input
    const newCommentValue = { ...inputCommentValue };
    newCommentValue[postid] = "";
    setInputCommentValue(newCommentValue);
  }
  function deleteComment(post, comment) {
    const newPostComments = post.comments.filter(
      (c) => c.text !== comment.text
    );
    const newAllUserPosts = allUserPosts.map((p) => {
      if (p.postid === post.postid) {
        p.comments = newPostComments;
      }
      return p;
    });
    setAllUserPosts(newAllUserPosts);
  }

  const postContextValue = {
    allUserPosts,
    setAllUserPosts,
    newComment,
    setNewComment,
    showCommentsFor,
    setShowCommentsFor,
    inputCommentValue,
    setInputCommentValue,
    inputComment,
    showThreadFunc,
    addCommentHandler,
    deleteComment,
    isPopUpOpen,
    setIsPopUpOpen,
    openPopUp,
    closePopUp,
    searchQuery,
    setSearchQuery,
    searchFilterFunc,
    submitPost,
    setSubmitPost,
  };

  return (
    <PostContext.Provider value={postContextValue}>
      {props.children}
    </PostContext.Provider>
  );
}
