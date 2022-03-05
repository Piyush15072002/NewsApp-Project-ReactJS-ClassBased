import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

// RCC for class based snippet
export default class App extends Component {

  pagesize = 15
  apiKey = process.env.API_KEY

  // for Top loading bar
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {

    return (
      <Router>

        <Navbar />

        <LoadingBar
          color='red'
          progress={this.state.progress}
          height={4}
        />

        <Routes>
          <Route exact path="/" element={<News key="general" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="General" />} />

          <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="Science" />} />
          <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="Business" />} />


          <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="Entertainment" />} />


          <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="Health" />} />


          <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="Sports" />} />


          <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pagesize} country="in" category="Technology" />} />


        </Routes>
      </Router>
    );
  }
}

