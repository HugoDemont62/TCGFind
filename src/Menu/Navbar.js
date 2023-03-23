import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss"
import { Route, Link, Routes } from "react-router-dom";
import { useState } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';
import Getpok from "../Pokemon/Getpok";
import Searchpok from "../Search/search";
import Sets from "../Sets/sets";
import Eachset from "../Sets/eachset";
import Eachpok from "../Pokemon/Eachpok";
import Index from "../Index/Index";

export function Menub() {
    const [showNavSecond, setShowNavSecond] = useState(false);

    return (
        <>
            <MDBNavbar expand='lg'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>TCGFind</MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavSecond(!showNavSecond)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNavSecond}>
                        <MDBNavbarNav>
                            <MDBNavbarLink aria-current='page' href='/'>
                                Home
                            </MDBNavbarLink>
                            <MDBNavbarLink><Link to="/Getpok">Cards</Link></MDBNavbarLink>
                            <MDBNavbarLink><Link to="/Sets">Sets</Link></MDBNavbarLink>
                            <MDBNavbarLink><Link to="/Searchpok">Rechercher</Link></MDBNavbarLink>
                            <MDBNavbarLink disabled href='/' tabIndex={-1} aria-disabled='true'>
                                Disabled
                            </MDBNavbarLink>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <Routes>
                <Route exact={true} path="/" element={<Index />}/>
                <Route exact={true} path="/Getpok" element={<Getpok />}/>
                <Route exact={true} path="/Searchpok" element={<Searchpok />}/>
                <Route exact={true} path="/Sets" element={<Sets />}/>
                <Route exact={true} path="/Sets/:name" element={<Eachset />}/>
                <Route exact={true} path="/Getpok/:name" element={<Eachpok />}/>
            </Routes>
        </>
    );
}