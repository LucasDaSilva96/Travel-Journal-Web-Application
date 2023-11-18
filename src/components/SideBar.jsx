import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./SideBar.module.css";
import React from "react";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>

      <Outlet />

      <Footer></Footer>
    </div>
  );
}

function Footer() {
  return (
    <React.Fragment>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Lucas Da Silva{" "}
        </p>
      </footer>
    </React.Fragment>
  );
}

export default SideBar;
