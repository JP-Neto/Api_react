import Nav from 'react-bootstrap/Nav';
import React from "react";
import './header.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../img/logo.jpeg'
import Logo2 from '../../img/logo2.jpg'

const Header = () => {
    return (
        <>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                
                <img src={Logo} alt="logo rickandmorty" className="header__logo" />]
                <div className="menudiv">
                <Container>
                
                    <Navbar.Brand  href="/">RICK AND MORTY API</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                    <div class="menudiv2">    
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        
                            <Nav.Link href="characters">Personagens</Nav.Link>
                            <Nav.Link href="episodes">Episódios</Nav.Link>
                            <Nav.Link href="location">Localização</Nav.Link>

                        </Nav>
                        
                    </Navbar.Collapse>

                    </div> 
                </Container>
                
                </div>
                <img src={Logo2} alt="logo rickandmorty" className="header__logo" />
            </Navbar>

        </>
    )
}

export default Header