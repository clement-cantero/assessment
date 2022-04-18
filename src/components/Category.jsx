import { Component } from 'react';
import Post from './Post';

class Category extends Component {


  constructor(props) {
    super(props);
    //Initializes the local state of the component
    this.state = {
      error: null,
      isFetching: false,
      posts: [],
      postsFiltered: [],
      limit: 5
    };
    this.categoriesList = ["All posts"];
    //bind the function to the child component: Post
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  //Called directly after the component is mounted
  //Loads data at initialization
  componentDidMount() {
    //Using Fetch API
    fetch("/api/posts")
      .then((response) => {
        return response.json()
      })
      .then((result) => {
          console.log(result)
        //Updates the local state of the component
          this.setState({isFetching: true, posts: result.posts, postsFiltered: result.posts});
        })
      .catch((error) => {
        //Updates the local state of the component
        this.setState({
          isFetching: true,
          error
        });
      })
  }

  //Retrieves all categories and sorts them alphabetically
  getAllCategories(){
    this.state.posts.forEach( post => {
      post.categories.forEach( category => {
        if(!this.categoriesList.includes(category.name)){
          this.categoriesList.push(category.name)
        }
      })
    })
    this.categoriesList.sort();
  }

  //Filter posts for a given category
  filtered(categorySelected) {
    this.postsFiltered = []
    if(categorySelected === "All posts"){
      //Updates the local state of the component with all possible posts
      this.setState({postsFiltered: this.state.posts})
    }
    else {
      this.state.posts.forEach(post => {
        post.categories.forEach(category => {
          if (category.name === categorySelected) {
            this.postsFiltered.push(post)
          }
        })
      })
      //Remove duplicates (some posts have the same category twice)
      const postsFilteredWD = this.postsFiltered.filter( (ele,pos) => this.postsFiltered.indexOf(ele) === pos);
      //Updates the local state of the component
      this.setState({postsFiltered : postsFilteredWD, limit: 5})
    }
  }

  //Function called in the child component Post that increases the number of posts that can be seen
  onLoadMore(){
    this.setState({limit: this.state.limit+5})
  }

  render() {
    const { error, isFetching } = this.state;
    this.getAllCategories();
    if(error){
      return <h1>Error</h1>;
    } else if (!isFetching) {
      return <h1>Loading ...</h1>
    } else
      return (
        <div>
          <div className="box">
            <h2>List of categories</h2>
            <ul>
              {this.categoriesList.map(category => (
                <li key={category.toString()} onClick={() => {
                  this.filtered(category)
                }}>
                  {category.toString()}
                </li>
              ))}
            </ul>
          </div>
          <Post p={this.state.postsFiltered} l={this.state.limit} loadMore={this.onLoadMore}/>
        </div>

      );
  }
}

export default Category