import {Component} from 'react';
import { AxiosUtil as axios} from '../AxiosUtil';
import { MovieSearchComponent } from '../Components/MovieSearchComponent';
import { MovieListComponent } from '../Components/MovieListComponent';

class MovieHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentPage: 1,
          movieResults: [],
          searchValue: '',
        };
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            axios.get(`/api/movie/search`, { params: { query: this.state.searchValue }})        
            .then(res => {
              const movieResults = res.data;
              this.setState({movieResults: movieResults})
            });
        }    
    }

    handleChange = (event) => {
        const {value} = event.target;
        this.setState({searchValue:value});
    }

    componentDidMount() {
       
        axios.get(`/api/movie/featured`)        
        .then(res => {
          const movies = res.data;
          this.setState({movieResults: movies});
        })
    }

    render(){
        
        return (
            <div>
                <MovieSearchComponent 
                handleKeyDown={this.handleKeyDown}
                value= {this.state.searchValue}   
                handleChange={this.handleChange} />            
                <MovieListComponent movies={this.state.movieResults}/>
            </div>
        );
    }
}    

export default MovieHomePage;