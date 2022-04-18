import { Component } from 'react';

class Post extends Component {

  render() {
    return (
      <div className="box2">
        <ul>
        {this.props.p.slice(0,this.props.l).map( post => (
            <li key={post.id}>
              <div className="card-body">
                <div className="card-author">
                  <div className="card-author-avatar">
                    <img src={post.author.avatar} alt="avatar"/>
                  </div>
                  <div className="card-author-name">
                    {post.author.name}
                  </div>
                </div>
                <div className="card-date">
                  {post.publishDate}
                </div>
                <div className="card-title">
                  {post.title}
                </div>
                <div className="card-summary">
                  {post.summary}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="button" onClick={this.props.loadMore}>{this.props.l > this.props.p.length ? "" : "Load more"}</div>
  </div>
      )
    }
}

export default Post