import React from 'react';
import SideBar from './../components/sidebar';

class AdminLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container1">
        <aside className="sideBar">
          <SideBar />
        </aside>
        <section className="main">
          <div className="grid">
            {this.props.children}
          </div>
        </section>
      </div>
    )
  }
}

export default AdminLayout;