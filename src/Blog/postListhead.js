// import React from "react";

// // reactstrap components
// import {
//   Row,
//   Col,
// } from "reactstrap";

// // core components

// const items = [
//   {
//     src: require("assets/img/bg1.jpg"),
//     altText: "Nature, United States",
//     caption: "Nature, United States"
//   },
//   {
//     src: require("assets/img/bg3.jpg"),
//     altText: "Somewhere Beyond, United States",
//     caption: "Somewhere Beyond, United States"
//   },
//   {
//     src: require("assets/img/bg4.jpg"),
//     altText: "Yellowstone National Park, United States",
//     caption: "Yellowstone National Park, United States"
//   }
// ];

// const captionStyles = {
//   position: "absolute",
//   width: "92%",
//   bottom: "0px",
//   padding: "20px",
//   color: "#fff",
//   textAlign: "center",
//   backgroundColor: "rgba(0,0,0,.5)"
// }

// function PostListHead() {

//   return (
//     <Col lg="12" md="12" >
//       <Row>
//         <h2>Popular Posts</h2>
//       </Row>
//       <Row>
//         {items.map(item => (
//           <Col md="4">
//             {/* carousel-caption */}
//             <div className=" d-md-block" >
//               <img src={item.src} alt={item.altText} />
//               <div style={captionStyles}>
//                 <h5>{item.caption}</h5>
//               </div>
//             </div>
//           </Col>
//         )
//         )}
//       </Row>
//     </Col>
//   );
// }

// export default PostListHead;
