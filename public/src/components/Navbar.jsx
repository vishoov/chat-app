import React from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.png"


const NavContainer = styled.nav`
  height: 50px;
  backdrop-filter: blur(8px); /* Adding blur effect */
  .brand{
    display:flex;
    align-items:center;
    img{
        padding-left:75px;
        padding-top:10px;
        height:45px
    }
    h1{
        color:white;
        font-size:1.2rem;
        padding-left:20px
    }
  }
 
`;

const Nav = () => {
  return (
    <NavContainer>
       <div className='brand'>
          <img src={Logo} alt="Logo"/>
          <h1> goodspace</h1>

        </div>
    </NavContainer>
  );
};

export default Nav;
