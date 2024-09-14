/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  HamBurger,
  HomeLogo,
  SearchLogo,
  UserLogo,
} from "../../../public/SvgComponents";
import ContextMenu from "../ContextMenu";
import axios from "axios";

export default function Header() {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const contextMenuOptions = [
    {
      name: "Login",
      link: "/login",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Sign Up",
      link: "/register",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "About Us",
      link: "/about-us",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
  ];

  const authenticatedContextMenuOptions = [
    {
      name: "Account",
      link: "/account",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Home",
      link: "/",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Notifications",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "About Us",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Logout",
      callBack: async () => {
        setIsContextMenuVisible(false);
        // await axios.post("api/user/logout");
        // setUser(null);
        setRedirect("/");
      },
    },
  ];

  const triggerElementRef = useRef(null);

  const handleContextMenuToggle = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        !triggerElementRef.current ||
        triggerElementRef.current.contains(e.target)
      ) {
        return;
      }
      setIsContextMenuVisible(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <header className="w-full flex flex-row justify-between transition-all duration-300 h-15 border-b border-b-gray-200 pb-4">
      <Link
        to={"/"}
        className="flex items-center gap-1"
        ref={triggerElementRef}
        onClick={handleContextMenuToggle}
      >
        <HomeLogo />
      </Link>

      <div className="flex items-center text-4xl gap-2">
        <Link
          to={"/"}
          className="flex items-center gap-1"
          ref={triggerElementRef}
          onClick={handleContextMenuToggle}
        >
          Diet Reccomendation
        </Link>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-xl transition-all duration-500">
        <Link to={"/login"} className="flex gap-1">
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <UserLogo />
          </div>
          <div>{<div>Anonymous</div>}</div>
        </Link>
        <div
          ref={triggerElementRef}
          onClick={handleContextMenuToggle}
          className="cursor-pointer"
        >
          <HamBurger />
        </div>
        {/* {isContextMenuVisible && user && (
          <ContextMenu
            options={authenticatedContextMenuOptions}
            coordinates={{
              x: window.innerWidth - 250,
              y: 70,
            }}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )} */}
        {isContextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions}
            coordinates={{
              x: window.innerWidth - 250,
              y: 70,
            }}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )}
      </div>
    </header>
  );
}
