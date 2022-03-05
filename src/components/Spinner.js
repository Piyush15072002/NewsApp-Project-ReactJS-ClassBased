import React, { Component } from 'react'
import spinner from './spinner.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className="text-center my-3 mb-5">
                <img src={spinner} alt="loading spinner" />
            </div>
        )
    }
}

export default Spinner