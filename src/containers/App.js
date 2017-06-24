import React, { Component } from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { key , hash , apiUrl , limit , ts } from '../api';
import characterIcon from '../../public/assetics/icons/characters.png';
import favoritesIcon from '../../public/assetics/icons/favourites.png';
import characterJson from '../mocks/characters.json'; 

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            characters: [],
            comics: []
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        // this.handleOnSelect = this.handleOnSelect.bind(this);
        // this.handleUnSelected = this.handleUnSelected.bind(this);
    }

    handleOnChange(event) {
        const value = event.target.value;
        this.setState({ search: value });
    }

    handleOnClick() {
        //for testing
        const value = characterJson;
        this.setState({ characters: value.data.results})
        
        

        //for production
        // const value = this.state.search;

        // if( value !== '' || value !== null ) {

        //     fetch(`${apiUrl}/characters?nameStartsWith=${value}&limit=${limit}&apikey=${key}&hash=${hash}&ts=${ts}`)
        //     .then(response => {
        //         if(response.code >= 400) {
        //             throw new Error('Bad response from server')
        //         }
        //         return response.json();
        //     })
        //     .then( (characters) => {
        //         if (characters.data.results.length > 0) {
        //             this.setState({ characters: characters.data.results})
        //         } else {
        //             this.setState({ characters: ['Searching...'] })
        //         }
        //     });
        // }
    }

    renderCharacters() {

        const characters = this.state.characters;
        // console.log(characters);
        if(characters.length > 0) {
            const characterComponent = characters.map((character) => 
                <Hero 
                key={character.id}
                name={character.name}
                description={character.description}
                thumbnail={character.thumbnail}
                comics={character.comics}
                comicsId = {character.comics.items.slice(0, 4).map((comic) => {
                    return comic.resourceURI.substring(comic.resourceURI.lastIndexOf('/') + 1);
                })}
                />
            );
            return characterComponent;
        } else {
            return <div></div>;
        }
    }

    render() {
        return (
            <main>
                <nav>
                    <div className="nav-wrapper">
                        <form className="row display-flex">
                            <a id="logo-container" href="#" className="col s2 display-flex align-center justify-center"><img className="logo" src="public/assetics/logo-marvel.png"/></a>
                            <div className="input-field col s10 no-padding">
                                <input id="search" onChange={this.handleOnChange} value={this.state.search} type="search" placeholder="Search character..." required/>
                                <label className="label-icon" htmlFor="search"><i className="material-icons" onClick={ this.handleOnClick }>search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                <section id="main" className="section no-padding">
                    <div className="container">
                    <div className="row">
                        
                        <div className="col s12 m9 no-padding display-flex flex-wrap justify-space">
                            <div className="col s12 display-flex align-center main-container">
                                <img src={ characterIcon } alt=""/>
                                <h3 className="no-margin">Characters</h3>
                            </div>
                            { this.renderCharacters() }
                        </div>

                        <div className="col s12 m3 favorites-col">
                            <div className="display-flex align-center  main-container">
                                <img src={ favoritesIcon } alt=""/>
                                <h4>My Favourites</h4>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                <Footer/>
                    
            </main>
        );
    }
}

export default App;