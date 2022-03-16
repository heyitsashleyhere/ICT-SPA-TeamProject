import React, { useContext } from 'react';
// Context
import { UserContext } from '../context/UserContext.jsx';
import { PostContext } from '../context/PostContext.jsx';
// Styling
import { AiOutlineDelete } from 'react-icons/ai';
import { VscEdit } from 'react-icons/vsc';
import { FaRegCommentDots } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { FiSend } from 'react-icons/fi'
// scss file
import './Moments.scss'
import './profilePrivate.scss'
import './profilePublic.scss'


const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const { allUserPosts, setAllUserPosts,
    showCommentsFor,
    inputCommentValue,
    inputComment, showThreadFunc, addCommentHandler, deleteComment,
    searchQuery, searchFilterFunc } = useContext(PostContext)

  const currentUserPosts = allUserPosts.filter(post => post.username === currentUser.username)
  const privatePosts = currentUserPosts.filter(post => post.isPrivate === true)
  const publicPosts = currentUserPosts.filter(post => post.isPrivate === false)

  const searchPrivPosts = searchFilterFunc(privatePosts, searchQuery)
  const searchPubPosts = searchFilterFunc(publicPosts, searchQuery)

  function deletePost(post) {
    const newAllUserPosts = allUserPosts.filter(item => item.postid !== post.postid)
    setAllUserPosts(newAllUserPosts)
  }


  return (
    <section className='profile'>

      <div className="private">
        <section className="profile-header">
          <h1 className="profile-title">private posts</h1>
        </section>
        <section className="profile-inner">

          {searchPrivPosts.map((post, i) => {
            return (
              <div className="currentUserPost" key={`${post.username}-private-post${i}`} >
                <div className="currentUserPost-toolbar">
                  <VscEdit className='editIcon' />
                  <AiOutlineDelete className="deleteIcon" onClick={() => deletePost(post)} />
                </div>

                <div className="postfeed_content_subheader">
                  <h3 className="date">{post.date}</h3>
                  <h2 className="title">{post.title}</h2>
                </div>

                <section className="postfeed_content">

                  <section className="postfeed_content_imgtext">

                    {post.imageUrl ?
                      <img className="allUserPost_image" src={post.imageUrl} alt={post.title} /> : null
                    }
                    {post.text ?
                      <p className='allUserPost_text'>{post.text}</p> : null
                    }
                    {post.websiteUrl ?
                      <a className="allUserPost_webUrl" href={post.websiteUrl} target="_blank" rel="noreferrer">{post.websiteUrl}</a> : null}

                  </section>
                </section>

                <div className="postfeed">
                  <div className="postfeed_menu">
                    <button className="postfeed_icons" onClick={() => showThreadFunc(post)}><FaRegCommentDots /></button>
                    <button className="postfeed_icons"><AiOutlineCheckCircle></AiOutlineCheckCircle></button>
                  </div>

                  {post.postid === showCommentsFor
                    ?
                    <section className='postfeed_commentSection'>
                      {post.comments.map((comment, i) =>
                        <div key={i} className="postfeed_content_reply">
                          <div className="postfeed_content_reply_user">
                            <p className="postfeed_content_userfield">
                              <img className="postfeed_content_userAvatar" src={`https://robohash.org/${comment.username}`} alt={comment.username} />
                              {comment.username} : {comment.text}
                            </p>
                            {currentUser.userid === comment.userid ? <button className="comment__delete-btn" onClick={(e) => deleteComment(post, comment)}><TiDeleteOutline /></button> : null}
                          </div>
                        </div>
                      )}

                      <div className="postfeed_comment_input">
                        <input type="text"
                          placeholder="your comment"
                          value={inputCommentValue.text}
                          onChange={(e) => inputComment(currentUser.userid, currentUser.username, post.postid, e)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addCommentHandler(post, post.postid)
                            }
                          }} />
                        <button className="postfeed_comment_input_button" onClick={() => addCommentHandler(post, post.postid)}
                          disabled={!inputCommentValue}><FiSend /></button>
                      </div>
                    </section>
                    : null}

                </div>
              </div>
            )
          })}
        </section>
      </div>

      <div className="public pub">
        <section className="profile-header">
          <h1 className="profile-title">public posts</h1>
        </section>
        {searchPubPosts.map((post, i) => {
          return (
            <div className="currentUserPost" key={`${post.username}-public-post${i}`}>
              <div className="currentUserPost-toolbar">
                <VscEdit className='editIcon' />
                <AiOutlineDelete className="deleteIcon" onClick={() => deletePost(post)} />
              </div>

              <div className="postfeed_content_subheader">
                <h3 className="date">{post.date}</h3>
                <h2 className="title">{post.title}</h2>
              </div>

              <section className="postfeed_content">

                <section className="postfeed_content_imgtext">

                  {post.imageUrl ?
                    <img className="allUserPost_image" src={post.imageUrl.charAt(0) === '/' ? process.env.PUBLIC_URL + `${post.imageUrl}` : post.imageUrl} alt={post.title} /> : null
                  }
                  {post.text ?
                    <p className='allUserPost_text'>{post.text}</p> : null
                  }
                  {post.websiteUrl ?
                    <a className="allUserPost_webUrl" href={post.websiteUrl} target="_blank" rel="noreferrer">{post.websiteUrl}</a> : null}

                </section>

              </section>

              <div className="postfeed">
                <div className="postfeed_menu">
                  <button className="postfeed_icons" onClick={() => showThreadFunc(post)}><FaRegCommentDots /></button>
                  <button className="postfeed_icons"><AiOutlineCheckCircle></AiOutlineCheckCircle></button>
                </div>

                {post.postid === showCommentsFor
                  ?
                  <section className='postfeed_commentSection'>
                    {post.comments.map((comment, i) =>
                      <div key={i} className="postfeed_content_reply">
                        <div className="postfeed_content_reply_user">
                          <p className="postfeed_content_userfield">
                            <img className="postfeed_content_userAvatar" src={`https://robohash.org/${comment.username}`} alt={comment.username} />
                            {comment.username} : {comment.text}
                          </p>
                          {currentUser.userid === comment.userid ? <button className="comment__delete-btn" onClick={(e) => deleteComment(post, comment)}><TiDeleteOutline /></button> : null}
                        </div>
                      </div>
                    )}

                    <div className="postfeed_comment_input">
                      <input type="text"
                        placeholder="your comment"
                        value={inputCommentValue.text}
                        onChange={(e) => inputComment(currentUser.userid, currentUser.username, post.postid, e)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addCommentHandler(post, post.postid)
                          }
                        }} />
                      <button className="postfeed_comment_input_button" onClick={() => addCommentHandler(post, post.postid)}
                        disabled={!inputCommentValue}><FiSend /></button>
                    </div>
                  </section>
                  : null}

              </div>
            </div>
          )
        })}

      </div>

    </section>
  )
}

export default Profile
