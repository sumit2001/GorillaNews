import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import Error from './Error.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&language=en&category=${props.category}&page=${page}${props.country === "all" ? "" : "&country=" + props.country}`;
    // setState({ loading: true })
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.results)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  const [country, setCountry] = useState(props.country)

  useEffect(() => {
    if (props.country !== country) {
      updateNews();
      setCountry(props.country);
    }
    // eslint-disable-next-line
  }, [props.country]);

  useEffect(() => {
    document.title = `NewsGorilla - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&language=en&category=${props.category}&page=${page + 1}${props.country === "all" ? "" : "&country=" + props.country}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.results))
    setTotalResults(parsedData.totalResults)
    setPage(page + 1)
  }

  return (
    <>
      <h1 className="text-center mb-4" style={{ marginTop: "65px" }}>NewsGorilla - Top {capitalizeFirstLetter(props.category === "top" ? "" : props.category)} HeadLines</h1>
      {loading && <Spinner />}
      <div>{loading}</div>
      {totalResults > 0 ? <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {
              articles.map((element) => {
                return <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6 col-xs-12" key={element.link + Math.random()}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} author={element.creator != null ? element.creator[0] : "Anonymous"} date={element.pubDate} source={element.source_id} imageUrl={element.image_url} newsUrl={element.link}></NewsItem>
                </div>
              })}
          </div>
        </div>
      </InfiniteScroll> : !loading && <Error />}
    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
