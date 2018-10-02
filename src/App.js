import React, { Component } from 'react';
import axios from 'axios';
import Photo from "./components/Photo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            page:1,
            maxPage: null
        }
        this.loadmore = this.loadmore.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const API_ENDPOINT = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=a46a979f39c49975dbdd23b378e6d3d5&extras=owner_name%2Curl_n%2Cviews&per_page=20&page=1&format=json&nojsoncallback=1"
        axios.get(API_ENDPOINT)
            .then(res => {
                let data = res.data.photos;
                this.setState({
                    images: data.photo,
                    page: 2,
                    maxPage: data.pages
                })
            })
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    loadmore(){
        if(this.state.page > this.state.maxPage)
            return;
        const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=a46a979f39c49975dbdd23b378e6d3d5&extras=owner_name%2Curl_n%2Cviews&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`;
        axios.get(API_ENDPOINT)
            .then(res => {
                let data = res.data.photos;
                this.setState({
                    images: this.state.images.concat(data.photo),
                    page: this.state.page + 1,
                    maxPage: data.pages
                })
            })
    }
    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.loadmore();
        }
    }
    render() {
    return (
     <Photo tileData={this.state.images} />
    );
  }
}

export default App;
