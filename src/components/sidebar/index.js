import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
import webConfig from "./../../../webConfig";
import withSession from "./../../hoc/withSession";
import classNames from "classnames";

export class UnconnectedSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNavState: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.outerWidth >= 1024) {
        this.setState({
          mobileNavState: false
        });
      }
    });
  }

  mobile_nav_button() {
    const vWidth = window.outerWidth;
    if (vWidth <= 1024) {
      this.setState({
        mobileNavState: !this.state.mobileNavState
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="logo_wrapper">
          <NavLink to="/" onClick={() => this.mobile_nav_button()}>
            <img src={`${webConfig.siteURL}/assets/graphics/logo.png`} />
          </NavLink>
        </div>

        <nav className="signbar_nav" data-test="sideBarComponent">
          <div
            className={classNames({
              headline: true,
              mobile_nav_button: true,
              active: this.state.mobileNavState
            })}
            onClick={() => this.mobile_nav_button()}
          >
            Main navigation
          </div>

          <div
            className={classNames({
              mobile_nav_toggle: true,
              active: this.state.mobileNavState
            })}
          >
            {this.props.session.getCurrentUser === null && (
              <ul>
                <li>
                  <NavLink
                    to="/signin"
                    onClick={() => this.mobile_nav_button()}
                  >
                    <i className="fas fa-user"></i>
                    LogIn
                  </NavLink>
                </li>
              </ul>
            )}

            {this.props.session.getCurrentUser != null && (
              <ul>
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => this.mobile_nav_button()}
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/slideshow"
                    onClick={() => this.mobile_nav_button()}
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    SlideShow
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/timeline"
                    onClick={() => this.mobile_nav_button()}
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    TimeLine
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/products"
                    onClick={() => this.mobile_nav_button()}
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signout"
                    onClick={() => this.mobile_nav_button()}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    LogOut
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default withSession(UnconnectedSideBar);
