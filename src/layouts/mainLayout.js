import React from 'react';
import Header from './../components/header';
import Footer from './../components/footer';

class MainLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default MainLayout;