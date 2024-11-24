import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Header = ({ title, className }) => {
  return <h2 className={classNames(className, `my-6 text-2xl font-bold bg-white-900`)}>{title}</h2>;
};

export default Header;
