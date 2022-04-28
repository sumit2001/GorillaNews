import React from 'react'

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  var image = false;
  var video = false;

  if (imageUrl != null) {
    var imageOrVideo = imageUrl.substr(imageUrl.length - 4);
    if (imageOrVideo === ".mp4") {
      video = true;
    } else {
      image = true;
    }
  } else {
    image = true;
    imageUrl = "https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/04/box-office-kgf-chapter-2-hindi-sets-another-massive-record-enters-200-crore-club-in-just-a-little-over-4-days-is-bigger-than-the-biggest-bollywood-blockbusters-001.jpg";
  }
  const handleImgError = e => {
    e.target.src = "https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/04/box-office-kgf-chapter-2-hindi-sets-another-massive-record-enters-200-crore-club-in-just-a-little-over-4-days-is-bigger-than-the-biggest-bollywood-blockbusters-001.jpg"
  }
  return (
    <div className="my-3">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "flex-end", position: 'absolute', right: "0" }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        {image && <img onError={handleImgError} style={{ width: "100%", height: "200px" }} src={imageUrl} className="card-img-top" alt="..." />}
        {video && <div style={{ width: "100%", height: "200px" }} className="embed-responsive embed-responsive-16by9" >
          <iframe title={title} className="embed-responsive-item" src={imageUrl} allowFullScreen="" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true"></iframe>
        </div>}
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author ? "anonymous" : author} on {new Date(date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</small></p>
          <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )

}

export default NewsItem
