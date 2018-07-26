import React from "react";
import CardBtn from "../CardBtn";
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Card.css";



class Card extends React.Component {

  render () {
    const { image, recipeName, recipeLink, showCard, handleBtnClick, like, save } = this.props

    return (
      // fix loading spinner
      <div>
        <ul className="recipeResults">
          <div className="cardtitle">
            {recipeName}
            <br/>
            <a href={recipeLink} target="_blank">View the full recipe!</a>
          </div>
          
          <div
            className="card"
            style={{
              backgroundImage: image ? `url(${image})` : "none"
            }}
          >
            
            {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}

          </div>

          <div className="cardbottom">

          <CardBtn
              // className={ {like} ? "liked" : "heartBtn"}
              className="heartBtn"
              style={{ opacity: image ? 1 : 0 }}
              onClick={handleBtnClick}
              like={like}
            >
              <i className="fas fa-heart" data-value="heart"></i>
           </CardBtn>

            <CardBtn
              // className={ {save} ? "saved" : "bookmarkBtn"}
              className="bookmarkBtn"
              style={{ opacity: image ? 1 : 0 }}
              onClick={handleBtnClick}
              save={save}
            >
              <i className="fas fa-bookmark" data-value="bookmark"></i>
            </CardBtn>
          </div>

        </ul>
      </div>
      // )
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string,
  recipeLink: PropTypes.string,
  showCard: PropTypes.bool,
  handleBtnClick: PropTypes.func,
  like: PropTypes.bool,
  save: PropTypes.bool
}

export default Card;
