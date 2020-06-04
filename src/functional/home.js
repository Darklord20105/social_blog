import React from "react";

import { Container } from "reactstrap";

function Home() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <div className="page-header clear-filter" style={{ marginTop: "62px" }} filter-color="blue">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(" + require("img/header.jpg") + ")"
        }}
        ref={pageHeader}
      ></div>
      <Container>
        <div className="py-5 brand">
          <img
            alt="..."
            className="n-logo"
            src={require("img/now-logo.png")}
          ></img>
          <h1 className="h1-seo">Now UI Blog.</h1>
          <h3>A beautiful Bootstrap 4 Blog Post UI</h3>
        </div>
      </Container>
    </div>
  );
}

export default (Home);
