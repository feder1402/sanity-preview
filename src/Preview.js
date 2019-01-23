import React, { Component } from 'react'
import SanityClient from '@sanity/client'
import Loading from './components/Loading'

// const QUERY = '*[_id == "0fff2380-57d1-40ba-97b4-59d3926116b1"]'

const _client = SanityClient({
    projectId: 's28bingf',
    dataset: 'production'
})

class Preview extends Component {
    state = {
        error: null,
        isLoading: false,
        cards: null
    }

    componentDidMount = () => {
        const { id } = this.props;
        const QUERY = `*[_id == "${id}"]`

        _client
            .fetch(QUERY)
            .then(cards => {
                console.log(JSON.stringify(cards, null, 2))
                this.setState({ isLoading: false, error: null, cards })
            })
            .catch(error => this.setState({ isLoading: false, error }))

        // Clear old images while loading new ones
        this.setState({ isLoading: true, error: null, cards: null })
    }

    render() {
        const { error, isLoading, cards } = this.state

        return (
            <div className="col-lg-8 col-md-12 col-sm-12" id="stickyContainer">
                <div className="row">
                    <div className="row">
                        <div className="card addOn-card">
                            <div className="card-border bg-primary"></div>
                            <div className="card-block">
                                <Loading isLoading={isLoading} >
                                    {cards &&
                                        <div>
                                            <h3 className="font-primary-bold">{cards[0].title}</h3>
                                            <div>
                                                <p><span>{cards[0].description}</span></p>
                                                <h4 className="font-primary-bold">Select plan</h4>
                                            </div>
                                        </div>
                                    }
                                    {error && <div>ERROR: {JSON.stringify(error)}</div>}
                                </Loading>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview