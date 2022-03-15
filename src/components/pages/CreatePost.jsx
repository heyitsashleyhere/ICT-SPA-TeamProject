import React, { useContext } from 'react'
// Context
import { PostContext } from '../context/PostContext.jsx';
// Components
import CreatePostDisplayContent from './CreatePostDisplayContent.jsx';
// Styling
// import { CgImage } from 'react-icons/cg'
import { motion } from 'framer-motion'
import './createpost.scss'


const CreatePost = () => {
  const { isPopUpOpen, closePopUp } = useContext(PostContext);

  console.log('isPopUpOpen :>> ', isPopUpOpen);

  const opacityVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.3
      }
    }
  }

  const scaleVariants = {
    initial: {
      scale: 0
    },
    animate: {
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      scale: 0,
      transition: {
        delay: 0.3
      }
    }
  }

  return (
    <>
      {isPopUpOpen && (
        <motion.section
          variants={opacityVariants}
          className="overlay">

          <motion.div
            variants={scaleVariants}
            className="post-container">

            <section className="createpost-header">
              <section className="createpost-header-team">
                <img src={process.env.PUBLIC_URL + "/images/idea-removebg.png"} className="logo" alt='logo' />
                <p className="createpost-header-team-brand"> ideas come together</p>
              </section>

              <button onClick={closePopUp} className="button-close-pop">
                &times;
              </button>
            </section>

            <CreatePostDisplayContent />
          </motion.div>
        </motion.section>
      )}
    </>
  );
}

export default CreatePost