// import React from "react";
// import "./Sidebar.scss";
// import Logo from "../assets/Logo.png";
// import Home from "../assets/Home.png";
// import Add from "../assets/Add.png";
// import Search from "../assets/Search-icon.png";
// // import List from "../assets/List.png";
// import StudentSidebar from "../assets/Student-sidebar.png";
// import Report from "../assets/Report.png";
// import Setting from "../assets/Setting.png";
// // import Logout from "../assets/Logout.png";
// import TopArrow from "../assets/Top-arrow-sidebar.png";
// import BottomArrow from "../assets/Bottom-arrow.png";

// import { Link } from "react-router-dom";

// import { handlerInterfaces } from "../handle-event/HandleEvent.jsx";

// export const Sidebar = () => {
//   const dropdownHandler = (e) => {
//     const dropdownList = e.target.parentNode.nextElementSibling; //img
//     // const dropdownLi = e.target.querySelector(".dropdown"); //li
//     const dropdownA = e.target.parentNode.querySelector(".dropdown"); //a
//     // if (dropdownList.classList.contains("dropdown")) {
//     //   if (dropdownList.style.display == "block") {
//     //     dropdownList.style.display = "none";
//     //     e.target.src = BottomArrow;
//     //   } else {
//     //     dropdownList.style.display = "block";
//     //     e.target.src = TopArrow;
//     //   }
//     // }

//     if (e.target.tagName === "IMG" && dropdownList) {
//       if (dropdownList.classList.contains("dropdown")) {
//         if (dropdownList.style.display == "block") {
//           dropdownList.style.display = "none";
//           e.target.src = BottomArrow;
//         } else {
//           dropdownList.style.display = "block";
//           e.target.src = TopArrow;
//         }
//       }
//     }
//     // else if (dropdownLi) {
//     //   if (dropdownLi.classList.contains("dropdown")) {
//     //     if (dropdownLi.style.display == "block") {
//     //       dropdownLi.style.display = "none";
//     //       e.target.src = BottomArrow;
//     //     } else {
//     //       dropdownLi.style.display = "block";
//     //       e.target.src = TopArrow;
//     //     }
//     //   }
//     // }
//     else if (e.target.tagName === "A" && dropdownA) {
//       if (dropdownA.classList.contains("dropdown")) {
//         var img = e.target.closest("li").querySelector("div > img");
//         if (dropdownA.style.display == "block") {
//           dropdownA.style.display = "none";
//           img.src = BottomArrow;
//         } else {
//           dropdownA.style.display = "block";
//           img.src = TopArrow;
//         }
//       }
//     }
//   };

//   return (
//     <div className="sidebar">
//       <div className="logo">
//         <img src={Logo} alt="" />
//         <h2>Edu School</h2>
//       </div>
//       <ul className="sidebar__menu">
//         <Link to="/" className="home active">
//           <li onClick={(e) => handlerInterfaces.toggleClass(e)}>
//             <img src={Home} alt="" />
//             Trang chủ
//           </li>
//         </Link>
//         <Link className="add" to="/" onClick={(e) => dropdownHandler(e)}>
//           <li onClick={(e) => handlerInterfaces.toggleClass(e)}>
//             <img src={Add} alt="" />
//             Thêm
//             <div>
//               <img
//                 src={BottomArrow}
//                 alt=""
//                 onClick={(e) => dropdownHandler(e)}
//               />
//             </div>
//             <ul className="dropdown" style={{ display: "none" }}>
//               <li>
//                 <Link
//                   to="/add-student"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Tiếp nhận học sinh
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/add-class"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Lập danh sách lớp
//                 </Link>
//               </li>
//             </ul>
//           </li>
//         </Link>
//         {/* <li className="list">
//           <img src={List} alt="" />
//           <Link to="/">Quản lý danh sách</Link>
//           <div onClick={(e) => dropdownHandler(e)}>
//             <img src={BottomArrow} alt="" />
//           </div>
//           <ul className="dropdown" style={{ display: "none" }}>
//             <li>
//               <Link to="/manage-student">Học sinh</Link>
//             </li>
//             <li>
//               <Link to="/manage-class">Lớp học</Link>
//             </li>
//             <li>
//               <Link to="/manage-subject">Môn học</Link>
//             </li>
//           </ul>
//         </li> */}
//         <Link className="manage-score" to="/search">
//           <li onClick={(e) => handlerInterfaces.toggleClass(e)}>
//             {/* <img src={Search} alt="" /> */}
//             <i>
//               <BsSearch></BsSearch>
//             </i>
//             Tra cứu
//           </li>
//         </Link>
//         <Link className="manage-score" to="/score">
//           <li onClick={(e) => handlerInterfaces.toggleClass(e)}>
//             <img src={StudentSidebar} alt="" />
//             Tạo bảng điểm môn
//           </li>
//         </Link>

//         {/* onClick={(e) => handlerInterfaces.toggleClass(e)} */}
//         <Link to="/" className="report" onClick={(e) => dropdownHandler(e)}>
//           <li onClick={(e) => handlerInterfaces.toggleClass(e)}>
//             <img src={Report} alt="" />
//             Báo cáo
//             <div>
//               <img
//                 src={BottomArrow}
//                 alt=""
//                 onClick={(e) => dropdownHandler(e)}
//               />
//             </div>
//             <ul className="dropdown" style={{ display: "none" }}>
//               <li>
//                 <Link
//                   to="/report-subject"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Báo cáo môn học
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/report-term"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Báo cáo học kỳ
//                 </Link>
//               </li>
//             </ul>
//           </li>
//         </Link>
//         <Link
//           className="sidebar__setting"
//           to="/setting"
//           onClick={(e) => dropdownHandler(e)}
//         >
//           <li onClick={(e) => handlerInterfaces.toggleClass(e)}>
//             <img src={Setting} alt="" />
//             Thay đổi quy định
//             <div>
//               <img
//                 src={BottomArrow}
//                 alt=""
//                 onClick={(e) => dropdownHandler(e)}
//               />
//             </div>
//             <ul className="dropdown" style={{ display: "none" }}>
//               <li>
//                 <Link
//                   to="/setting/setting-list"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Danh sách tham số
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/setting/class-list"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Danh sách các lớp
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/setting/subject-list"
//                   onClick={(e) => handlerInterfaces.toggleClass(e)}
//                 >
//                   Danh sách môn học
//                 </Link>
//               </li>
//             </ul>
//           </li>
//         </Link>
//       </ul>
//     </div>
//   );
// };

//=============

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Navigation } from "react-minimal-side-navigation";
import Logo from "../assets/Logo.png";
import Home from "../assets/Home.png";
import File from "../assets/File.png";
import Search from "../assets/Search.png";
import People from "../assets/People.png";
import Add from "../assets/Add.png";
// import Search from "../assets/loupe.png";

// import List from "../assets/List.png";
import StudentSidebar from "../assets/Student-sidebar.png";
import Report from "../assets/Report.png";
import Setting from "../assets/Setting.png";
// import { Routes } from "../config/Routes";
import { useHistory, useLocation } from "react-router-dom";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./Sidebar.scss";
import "./Sidebar_Lib.scss";

const Sidebar = () => {
  const history = useHistory();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const location = useLocation();
  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="" />
          <h2>Edu School</h2>
        </div>
        <div
        // className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-sky-400 border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
        //   isSidebarOpen
        //     ? "ease-out translate-x-0"
        //     : "ease-in -translate-x-full"
        // }`}
        >
          <Navigation
            // you can use your own router's api to get pathnam

            activeItemId="/"
            onSelect={({ itemId }) => {
              // maybe push to the route
              history.push(itemId);
            }}
            items={[
              {
                title: "Trang chủ",
                itemId: "/",
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => (
                  <img src={Home} alt="" />
                  //<i class="fa-solid fa-house"></i>
                ),
              },
              {
                title: "Thêm",
                itemId: "/add",
                elemBefore: () => (
                  <img src={Add} alt="" /> //<i class="fa-solid fa-tv"></i>
                ),
                subNav: [
                  {
                    title: "Tiếp nhận học sinh",
                    itemId: "/add/add-student",
                    // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                    // elemBefore: () => <img src={Home} alt="" />,
                  },
                  {
                    title: "Lập danh sách lớp",
                    itemId: "/add/add-class",
                    // elemBefore: () => <img src={Home} alt="" />,
                  },
                ],
              },
              {
                title: "Tra cứu",
                itemId: "/search",
                elemBefore: () => (
                  <img src={Search} alt="" /> //<i class="fa-solid fa-magnifying-glass"></i>
                ),
              },
              {
                title: "Tạo bảng điểm môn",
                itemId: "/score",
                elemBefore: () => (
                  <img src={People} alt="" /> //<i class="fa-solid fa-user-graduate"></i>
                ),
              },
              {
                title: "Báo cáo",
                itemId: "/report",
                elemBefore: () => (
                  <img src={File} alt="" /> //<i class="fa-solid fa-file-lines"></i>
                ),
                subNav: [
                  {
                    title: "Báo cáo môn học",
                    itemId: "/report/report-subject",
                    // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                  },
                  {
                    title: "Báo cáo học kỳ",
                    itemId: "/report/report-term",
                  },
                ],
              },
              {
                title: "Thay đổi quy định",
                itemId: "/setting",
                elemBefore: () => (
                  <img src={Setting} alt="" />
                  //<i class="fa-solid fa-gears"></i>
                ),
                subNav: [
                  {
                    title: "Danh sách tham số",
                    itemId: "/setting/setting-list",
                    // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                  },
                  {
                    title: "Danh sách lớp",
                    itemId: "/setting/class-list",
                  },
                  {
                    title: "Danh sách môn học",
                    itemId: "/setting/subject-list",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
