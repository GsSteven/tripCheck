import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.expandNav = this.expandNav.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  expandNav(e) {
    const navList = document.querySelector(".navList");
    const line1 = document.querySelector(".mobile1");
    const line2 = document.querySelector(".mobile2");
    const line3 = document.querySelector(".mobile3");

    if (!this.state.clicked) {
      //show nav
      navList.style.opacity = "1";
      navList.style.pointerEvents = "auto";
      navList.style.height = "auto";
      navList.style.right = "0";
      // make mobile options a red X
      line1.style.transform = "rotate(45deg) translateY(19px)";
      line2.style.opacity = "0";
      line3.style.transform = "rotate(-45deg) translateY(-19px)";
      line1.style.backgroundColor = "rgb(126, 7, 7)";
      line3.style.backgroundColor = "rgb(126, 7, 7)";
      this.setState({ clicked: true });
    } else {
      //hide nav
      navList.style.opacity = "0";
      navList.style.pointerEvents = "none";
      navList.style.height = "0";
      navList.style.right = "100%";
      //return mobile options to default position
      line1.style.transform = "";
      line2.style.opacity = "1";
      line3.style.transform = "";
      line1.style.backgroundColor = "black";
      line3.style.backgroundColor = "black";
      this.setState({ clicked: false });
    }
  }

  handleClick(e) {
    const value = e.target.id;
    this.props.setCurrentPage(value);
  }

  render() {
    return (
      <div id="navWrapper">
        <div className="mobileOptions" onClick={this.expandNav}>
          <div className="mobile1"></div>
          <div className="mobile2"></div>
          <div className="mobile3"></div>
        </div>
        <ul className="navList">
          <a href="#myLists">
            <li id="myLists" onClick={this.handleClick}>
              My Lists
            </li>
          </a>
          <a href="#newList">
            <li id="newList" onClick={this.handleClick}>
              New List
            </li>
          </a>
        </ul>
      </div>
    );
  }
}

export default NavBar;
