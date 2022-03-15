import React, { useContext, useState } from 'react'
import { PostContext } from '../context/PostContext';
import {GrSearch} from 'react-icons/gr'
import './search.scss'

const SearchBar = () => {
    const [ isCapsOn, setIsCapsOn ] = useState(false);
    const { searchQuery, setSearchQuery } = useContext(PostContext);

    // function searchInputOnKeyUp(e) {
    //     var x = e.getModifierState("CapsLock");
    //     // console.log(x)
    //     setIsCapsOn(!isCapsOn)
    // }
    
  return (
      <div className="search-bar">
      <GrSearch className="search-icon"/>
        <input type="search"
               className="nav-searchInput"
               placeholder='search'             
               value={searchQuery}
               onInput={(e) => setSearchQuery(e.target.value)}
         />
        {/* {isCapsOn ? <p>Caption Lock is On</p> : null} */}
      </div>

  )
}

export default SearchBar