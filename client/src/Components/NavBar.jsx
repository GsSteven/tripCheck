import React, { useRef, useState, useEffect } from "react";

function NavBar(props) {
  const [clicked, setClicked] = useState(false);

  const mobile1 = useRef();
  const mobile2 = useRef();
  const mobile3 = useRef();
  const navRef = useRef();

  const expandNav = () => {
    const navList = navRef.current;
    const line1 = mobile1.current;
    const line2 = mobile2.current;
    const line3 = mobile3.current;

    if (!clicked) {
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
      setClicked(true);
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
      setClicked(false);
    }
  };

  const handleClick = (e) => {
    const value = e.target.id;
    props.setCurrentPage(value);
    if (window.innerWidth < 1000) {
      expandNav();
    }
  };

  useEffect(() => {
    //if nav bar is hidden and window is resized above mobile format, show nav bar
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000 && window.innerWidth < 1020 && !clicked) {
        setClicked(true);
        expandNav();
      }
    });
  });

  return (
    <div id="navWrapper">
      <div className="mobileOptions" onClick={expandNav}>
        <div ref={mobile1} className="mobile1"></div>
        <div ref={mobile2} className="mobile2"></div>
        <div ref={mobile3} className="mobile3"></div>
      </div>
      <ul ref={navRef} className="navList">
        <li id="myLists" onClick={handleClick}>
          My Lists
        </li>
        <li id="newList" onClick={handleClick}>
          New List
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
