import React from "react";
import Moment from "react-moment";
import momentjs from "moment";
import Image from "react-image-enlarger";

class Plugin extends React.Component {
  render() {
    let Author = null;
    if (this.props.value.data.author && this.props.value.data.author.email) {
      Author = <span>Author: <a href={"mailto:" + this.props.value.data.author.email}>{this.props.value.data.author.name}</a></span>
    }

    let npmLink = 'https://www.npmjs.org/package/' + this.props.value.name;

    // Use soft-hypen aka &shy;
    let pluginNameShy = this.props.value.name.replace(/_/g, '_\u00AD');


    let downloadPercentage;
    if (this.props.value.downloads < this.props.downloadAverageCount) {
      downloadPercentage = this.props.value.downloads / this.props.downloadAverageCount * 50;
    } else {
      downloadPercentage = 50 + (this.props.value.downloads / this.props.downloadMaxCount * 50);
    }

    let downloadStatsStyle = 'rgb(100, 100, 100) ' + downloadPercentage + '%';
    if (downloadPercentage > 50) {
      downloadStatsStyle = 'rgb(0, 200, 0) ' + downloadPercentage + '%';
    } else if (downloadPercentage > 15) {
      downloadStatsStyle = 'orange ' + downloadPercentage + '%';
    }

    return (
      <section className="plugin">
        <div className="plugin-headline">
          <span className="plugin-name">
            <a target="_blank" rel="noopener noreferrer" href={npmLink}>{pluginNameShy}</a>
          </span>
          <span className="plugin-version">{this.props.value.version}</span>
          <span title={momentjs(this.props.value.data.time[this.props.value.data['dist-tags'].latest]).format('lll')}>
            <Moment key={this.props.value.name + '-moment'} className="plugin-time" fromNow>{this.props.value.data.time[this.props.value.data['dist-tags'].latest]}</Moment>
          </span>
          <div title={this.props.value.downloads + ' downloads last month'} style={{background: "linear-gradient(to right, " + downloadStatsStyle + ", lightgrey 1%)"}} className="plugin-downloads" />
        </div>
        <p>{this.props.value.description}</p>
        <div>
          {
            this.props.value.images ?
              this.props.value.images.map(function(image) {
                return (<Screenshot key={image} src={image}/>);
              }) : ''
          }
        </div>
        <div className="plugin-footer">
          <span className="plugin-author">{Author}</span>
          <span className="plugin-npm-link">
            <a target="_blank" rel="noopener noreferrer" href={npmLink}>npm</a>
          </span>
          <p className="plugin-keywords">{this.props.value.data.keywords ? this.props.value.data.keywords.map(t => <span key={this.props.value.name + t} className="plugin-keyword">{t}</span>) : ''}</p>
        </div>
      </section>
    );
  }
}

function Screenshot({ src }) {
  const [zoomed, setZoomed] = React.useState(false);

  return (
    <div style={{ margin: "0.25rem" }}>
      <Image
        style={{ maxWidth: "200px", height: "auto" }}
        zoomed={zoomed}
        src={src}
        onClick={() => setZoomed(true)}
        onRequestClose={() => setZoomed(false)}
      />
    </div>
  );
}

export default Plugin;