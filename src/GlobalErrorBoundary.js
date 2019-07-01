/**
 * Created by wawooh on 5/7/19.
 */
import React from 'react';

// const HighOrderBoundarie = (MyComponent) =>
class GlobalErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        hasError: false,
      error: null,
      info: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    /* here is where the magic happens.
           code inside here is executed if an error
           itn thrown from children */
       this.setState({
              hasError: true,
              error: error,
              info: info
    });
        // do some other logics if needed

  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Smartrestaurant encountered an error! Oh My!</h1>
            <h1>Oops, something went wrong :(</h1>
         <details style={{ whiteSpace: 'pre-wrap' }}>
             <p>The error: {this.state.error && this.state.error.toString()}</p>
          <p>Where it occured: {this.state.info && this.state.info.componentStack}</p>
         </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
