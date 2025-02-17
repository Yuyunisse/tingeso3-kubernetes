-- Conectar a ka base de datos postgres
\c postgres;

-- Crear la nueva base de datos
CREATE DATABASE "reparaciones-db";

-- Conectar a la nueva base de datos
\c "reparaciones-db";
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: reparaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reparaciones (
    id integer NOT NULL,
    descripcion character varying(255),
    diesel integer,
    electrico integer,
    gasolina integer,
    hibrido integer,
    nombre character varying(255)
);


ALTER TABLE public.reparaciones OWNER TO postgres;

--
-- Name: reparaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reparaciones ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.reparaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: reparaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reparaciones (id, descripcion, diesel, electrico, gasolina, hibrido, nombre) FROM stdin;
7	Incluyen la reparación o reemplazo de componentes  de la transmisión manual o automática, cambios de líquido y solución de problemas  de cambios de marcha	210000	300000	210000	300000	Reparaciones de la Transmisión
9	Incluye el reemplazo del silenciador, tubos de  escape, catalizador y la solución de problemas relacionados con las emisiones	120000	0	100000	450000	Reparaciones del Sistema de Escape
10	Reparación de pinchazos, reemplazo de  neumáticos, alineación y balanceo de ruedas	100000	100000	100000	100000	Reparación de Neumáticos y Ruedas
12	Incluye la recarga de  refrigerante, reparación o reemplazo del compresor, y solución de problemas del  sistema de calefacción	150000	180000	150000	180000	Reparación del Sistema de Aire Acondicionado y Calefacción
13	Limpieza o reemplazo de inyectores de  combustible, reparación o reemplazo de la bomba de combustible y solución de  problemas de suministro de combustible	140000	0	130000	220000	Reparaciones del Sistema de Combustible
14	Reparación de pequeñas grietas  en el parabrisas o reemplazo completo de parabrisas y ventanas dañadas	80000	80000	80000	80000	Reparación y Reemplazo del Parabrisas y Cristales
11	Reemplazo de amortiguadores, brazos  de control, rótulas y reparación del sistema de dirección asistida	180000	250000	180000	210000	Reparaciones de la Suspensión y la Dirección
15	bvbvm 	0	0	0	0	gchggcjgg
4	Incluye el reemplazo de pastillas de freno, discos,  tambores, líneas de freno y reparación o reemplazo del cilindro maestro de frenos	120000	219998	119999	180000	Reparaciones del Sistema de Frenos
5	Reparación o reemplazo de radiadores, bombas  de agua, termostatos y mangueras, así como la solución de problemas de  sobrecalentamiento	129998	230000	130000	190000	Servicio del Sistema de Refrigeración
6	Desde reparaciones menores como el reemplazo de bujías y  cables, hasta reparaciones mayores como la reconstrucción del motor o la reparación  de la junta de la culata	450000	800000	350000	700000	Reparaciones del Motor
8	Solución de problemas y reparación de alternadores,  arrancadores, baterías y sistemas de cableado, así como la reparación de componentes  eléctricos como faros, intermitentes y sistemas de entretenimiento	150000	250000	150000	200000	Reparación del Sistema Eléctrico
\.


--
-- Name: reparaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reparaciones_id_seq', 15, true);


--
-- Name: reparaciones reparaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reparaciones
    ADD CONSTRAINT reparaciones_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

