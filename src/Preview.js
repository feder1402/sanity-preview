import React, { Component } from 'react'
import SanityClient from '@sanity/client'
import BlockContent from '@sanity/block-content-to-react'
import Card from './components/card'
import Loading from './components/Loading'

// const QUERY = '*[_id == "0fff2380-57d1-40ba-97b4-59d3926116b1"]'

const _client = SanityClient({
    projectId: 's28bingf',
    dataset: 'production',
    useCdn: false
})

const serializers = {
    types: {
        plans: props => (
            <pre>
                <code>{JSON.stringify(props, null, 2)}</code>
            </pre>
        )
    }
}

class Preview extends Component {
    state = {
        error: null,
        isLoading: false,
        cards: null
    }

    componentDidMount = () => {
        const { id } = this.props;

        if (id == null) {
            this.setState({ isLoading: false, error: "ID of cards not passed in the URL" })
        } else {
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
    }

    render() {
        const { error, isLoading, cards } = this.state

        if (error) {
            return <div>ERROR: {JSON.stringify(error)}</div>
        }

        return (
            <Card>
                <Loading isLoading={isLoading} >
                    {cards && <BlockContent blocks={cards[0].content} serializers={serializers} />}
                </Loading>
            </Card>
        )
    }
}

export default Preview