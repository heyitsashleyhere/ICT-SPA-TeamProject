import React, { useContext } from 'react'
// Context
import { PostContext } from '../context/PostContext.jsx';
import { UserContext } from '../context/UserContext.jsx'
// Styling
import { FaRegCommentDots } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { FiSend } from 'react-icons/fi'
import './Moments.scss'

const Moments = () => {
  const { currentUser } = useContext(UserContext);
  const { allUserPosts,
    showCommentsFor,
    inputCommentValue,
    inputComment, showThreadFunc, addCommentHandler, deleteComment,
    searchQuery, searchFilterFunc } = useContext(PostContext)


  const publicPosts = allUserPosts.filter(post => post.isPrivate === false).reverse();

  const searchPosts = searchFilterFunc(publicPosts, searchQuery)



  return (
    < section className='Moments'>
      {searchPosts.map((post, i) => {
        return (
          <section className='allUser_postfeed' key={post.postid}>

            <div className="postfeed_header">
              <img className='avatar' src={post.avatar} alt={post.username} />
              <p className="username">{post.username}</p>
            </div>
            <div className="postfeed_content_subheader">
              <h3 className="date">{post.date}</h3>
              <h2 className="title">{post.title}</h2>
            </div>

            <div className="postfeed_content">

              <div className="postfeed_content_imgtext">
                {post.imageUrl ?
                  <img className='allUserPost_image'
                    src={ post.imageUrl.charAt(0) === '/' ? process.env.PUBLIC_URL + `${post.imageUrl}` : post.imageUrl} alt={post.title} /> : null}
                {post.text ?
                  <p className='allUserPost_text'>{post.text}</p> : null}
                {post.websiteUrl ?
                  <a className="allUserPost_webUrl" href={post.websiteUrl} target="_blank" rel="noreferrer">{post.websiteUrl}</a> : null}
              </div>
            </div>

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
                          {comment.username} :  {comment.text}
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
          </section>
        )
      })}
    </section>
  )
}

export default Moments