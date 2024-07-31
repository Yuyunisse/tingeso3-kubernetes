import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">Auto Fix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/reparaciones/disponibles">Reparaciones Disponibles</Nav.Link>
            <Nav.Link as={Link} to="/boleta">Boleta</Nav.Link>
            <NavDropdown title="Reportes" id="navbarDropdown">
              <NavDropdown.Item as={Link} to="/reporte1">Reporte 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reporte2">Reporte 2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/vehiculoxhistorial">Historiales</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="TopCar" id="navbarDropdown">
              <NavDropdown.Item as={Link} to="/registroConvenio">Registrar Convenio</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Registros" id="navbarDropdown">
              <NavDropdown.Item as={Link} to="/registrarReparacion">Agregar Nueva Reparación</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registrarDetalle">Registrar Reparación</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registrarVehiculo">Registrar Vehículo</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;

