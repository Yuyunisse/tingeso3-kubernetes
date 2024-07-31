import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './component/Inicio.jsx';
import TablaReparaciones from './component/TablaReparaciones.jsx';
import NewReparacion from './component/NewReparacion.jsx';
import NewVehiculo from './component/NewVehiculo.jsx';
import TablaHistoriCuatro from './component/TablaHistoriaCuatro.jsx';
import NewDetalle from './component/NewDetalle.jsx';
import TablaReporteUno from './component/TablaReporteUno.jsx';
import TablaReporteDos from './component/TablaReporteDos.jsx';
import Header from './component/Header.jsx'
import RegistrarVehiculo from './component/NewVehiculo.jsx';
import RegistrarConvenio from './component/Convenio.jsx';
import Boleta from './component/Boleta.jsx';


function App() {
  

  return (
    
    <BrowserRouter>
      <Header/>
      <Routes> 
        <Route path="/" element={<Inicio/>} />
        <Route path="/registrarReparacion" element={<NewReparacion/>}/>
        <Route path="/reparaciones/disponibles" element={<TablaReparaciones/>}/>  
        <Route path="/registrarVehiculo" element={<RegistrarVehiculo/>} />  
        <Route path="/vehiculoxhistorial" element={<TablaHistoriCuatro/>} />
        <Route path="/registrarDetalle" element={<NewDetalle/>} />  
        <Route path="/reporte1" element={<TablaReporteUno/>} />  
        <Route path="/reporte2" element={<TablaReporteDos/>} />  
        <Route path="/registroConvenio" element={<RegistrarConvenio/>} />
        <Route path="/boleta" element ={<Boleta/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
