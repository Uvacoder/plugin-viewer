import React from "react";
import Moment from "react-moment";

class Plugin extends React.Component {
  render() {
    let Author = null;
    if (this.props.value.data.author && this.props.value.data.author.email) {
      Author = <span>Author: <a href={"mailto:" + this.props.value.data.author.email}>{this.props.value.data.author.name}</a></span>
    }

    return (
      <section key={this.props.value.name} className="plugin">
        <div className="plugin-headline">
          <span className="plugin-name">{this.props.value.name}</span>
          <span className="plugin-version">{this.props.value.version}</span>
          <span title={<Moment format="DD MM YYYY">{this.props.value.data.time[this.props.value.data['dist-tags'].latest]}</Moment>}>
            <Moment className="plugin-time" fromNow>{this.props.value.data.time[this.props.value.data['dist-tags'].latest]}</Moment>
          </span>
        </div>
        <p>{this.props.value.description}</p>
        <div className="plugin-footer">
          <p className="plugin-author">{Author}</p>
          <p className="plugin-npm-link">
            <a target="_blank" href={"https://www.npmjs.org/package/" + this.props.value.name}>Open on npm</a>
          </p>
          <p className="plugin-keywords">{this.props.value.data.keywords ? this.props.value.data.keywords.map(t => <span key={this.props.value.name + t} className="plugin-keyword">{t}</span>) : ''}</p>
        </div>
      </section>
    );
  }
}

export default Plugin;