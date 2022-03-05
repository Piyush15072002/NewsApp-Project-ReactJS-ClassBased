import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general",
        apiKey: "098c2a1f476f4147973886a18a3b1d2f"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false

        });
        this.props.setProgress(100);
    }


    async componentDidMount() {
        this.updateNews();
    }

    onNext = async () => {

        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    onPrevious = async () => {

        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    fetchData = async () => {
        this.setState({
            page: this.state.page + 1,  // Loading new page
        })
        // fetching data from next page using our function
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false

        })
    };

    render() {
        return (
            <>
                <div className="container my-3 ">
                    <h1 className="text-center my-5">Top Headlines - {this.props.category}</h1>

                    {/* if loading is true than show spinner */}
                    {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />} >
                        <div className="container">
                            <div className="row d-flex justify-content-center ">
                                {!this.state.loading && this.state.articles.map((element) => {
                                    return <div className="col-md-3 mx-3 my-3 " key={element.url}>
                                        <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>


                </div>

            </>
        );
    }
}

export default News;

// unused codes that were for the 'next' and 'previous' button

/* 
    <div className="container d-flex justify-content-between">
    <button disabled={this.state.page <= 1} type="button" onClick={this.onPrevious} className="btn btn-dark"> &larr; Previous</button>
    <h4>Page {this.state.page}</h4>
    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.onNext} className="btn btn-dark">Next &rarr;</button>
    </div> 

*/