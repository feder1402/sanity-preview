
const Loading = ({ isLoading, children = null }) => {
    return isLoading ? 'Loading...' : children
}

export default Loading