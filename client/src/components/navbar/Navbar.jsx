import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>AnshEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;










// import { useContext, useState, useEffect } from "react";
// import "./navbar.scss";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { useNotificationStore } from "../../lib/notificationStore";

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   const { currentUser } = useContext(AuthContext);
//   const fetchNotifications = useNotificationStore((state) => state.fetch);
//   const number = useNotificationStore((state) => state.number);

//   useEffect(() => {
//     if (currentUser) {
//       fetchNotifications();
//     }
//   }, [currentUser, fetchNotifications]);

//   return (
//     <nav>
//       <div className="left">
//         <Link to="/" className="logo">
//           <img src="/logo.png" alt="AnshEstate Logo" />
//           <span>AnshEstate</span>
//         </Link>
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link> {/* Use Link instead of a */}
//         <Link to="/contact">Contact</Link>
//         <Link to="/agents">Agents</Link>
//       </div>

//       <div className="right">
//         {currentUser ? (
//           <div className="user">
//             <img src={currentUser.avatar || "/noavatar.jpg"} alt="User Avatar" />
//             <span>{currentUser.username}</span>
//             <Link to="/profile" className="profile">
//               {number > 0 && <div className="notification">{number}</div>}
//               <span>Profile</span>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <Link to="/login">Sign in</Link>
//             <Link to="/register" className="register">Sign up</Link>
//           </>
//         )}

//         <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
//           <img src="/menu.png" alt="Menu" />
//         </div>

//         <div className={open ? "menu active" : "menu"}>
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/agents">Agents</Link>
//           {!currentUser && (
//             <>
//               <Link to="/login">Sign in</Link>
//               <Link to="/register">Sign up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
