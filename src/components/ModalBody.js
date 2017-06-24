import React, { PureComponent } from 'react';
import shopButton from '../../public/assetics/icons/shopping-cart-primary.png';
import favouriteButton from '../../public/assetics/icons/btn-favourites-primary.png';
import defaultButton from '../../public/assetics/icons/btn-favourites-default.png';

class ModalBody extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.state = {
      favorites : [],
      clicked: false,
    }
  }

  handleOnClick(e) {
    const { id, imgSrc, title } = this.props;
    const favorite = {
      image: imgSrc,
      title: title,
      id: id
    }
    e.preventDefault();
    this.state.clicked ? this.setState({ clicked: false }) : this.setState({ clicked: true });
    if(this.state.favorites.length == 0) {
      console.log('COMIC ADDED TO LS');
      this.setState({ favorites: this.state.favorites.concat([favorite])});
      return localStorage.setItem('favorites', { favorites: this.state.favorites});
    } else if(!this.state.clicked) {
      console.log('COMIC ADDED TO LS');
      this.setState({ favorites: this.state.favorites.concat([favorite])});
      return localStorage.setItem('favorites', { favorites: this.state.favorites});
      
    } else if(this.state.clicked) {
      console.log('COMIC REMOVED TO LS', this.state.favorites);
      const removeIndex = this.state.favorites.map( item => item.id).indexOf(id);
      ~removeIndex && this.setState({ favorites: this.state.favorites.splice(removeIndex, 1)});
      localStorage.removeItem('favorites');
      return localStorage.setItem('favorites', { favorites: this.state.favorites});
    } else {
      console.warn('Error removing/adding comic to LS');
    }
    
  }

  render() {
    const { id, title, description, imgSrc, price } = this.props;
    return(
      <div className="row no-margin">
        <div className="col s4 margin-bot-1rem">
          <img src={imgSrc} className="width-100" />
        </div>
        <div className="col s8 margin-bot-1rem">
          <h4 className="bold">{title}</h4>
           <div dangerouslySetInnerHTML={{ __html: description }} ></div>
        </div>
        <div className="col s12 no-padding">
          <a href="#" onClick={this.handleOnClick}>
            {this.state.clicked ? (
              <div className="col s6 modal-favorited-button">
                <img src={favouriteButton} className="margin-right-10px" alt="favorite logo"/>Added to favourites
              </div>
              ) : 
              <div className="col s6 modal-favorite-button">
                <img src={defaultButton} className="margin-right-10px" alt="default logo"/>Add to favourites
              </div> 
            } 
          </a>

          <a href="#" className="col s6 modal-shop-button">
            <img src={shopButton} className="margin-right-10px" alt="shop logo"/>
            Buy for ${price}
          </a>
        </div>
      </div>
    );
  }
}

export default ModalBody;