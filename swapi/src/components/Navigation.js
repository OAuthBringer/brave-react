import React from "react";

const NavItem = ({ name, url, ...rest }) => {
  return <b>{name}</b>;
};

const Navigation = ({ sections = [], ...rest }) => {
  return (
    <>
      {sections.map((section) => {
        return <NavItem {...section} />;
      })}
    </>
  );
};

export default Navigation;
