import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return <div className='error-boundary'>
                <h1>Something went wrong.</h1>
                <p>Please reload...</p>
            </div>;
        }
        // Render the normal UI
        return this.props.children;
    }
}
export default ErrorBoundary;

