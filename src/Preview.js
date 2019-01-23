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
        const {id} = this.props;
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
            <div  className="row">
            <div className="card ux-card addOn-card">
                <Loading isLoading={isLoading} >
                    {cards && <pre>{JSON.stringify(cards, null, 2)}</pre>}
                    {error && <div>ERROR: JSON.stringify(error)}</div>}
                </Loading>
            </div>
            </div>
        )
    }
}

export default Preview