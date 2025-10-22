--
-- PostgreSQL database dump
--

\restrict MO8Iq9wOX43dXaLmXfMVHGW0KBCq9BDMbTqX00YbCmOE1lSmiY2VDsxgYHQgAx3

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-10-22 09:16:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4974 (class 1262 OID 16392)
-- Name: Gestion_Proveedores; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Gestion_Proveedores" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE "Gestion_Proveedores" OWNER TO postgres;

\unrestrict MO8Iq9wOX43dXaLmXfMVHGW0KBCq9BDMbTqX00YbCmOE1lSmiY2VDsxgYHQgAx3
\connect "Gestion_Proveedores"
\restrict MO8Iq9wOX43dXaLmXfMVHGW0KBCq9BDMbTqX00YbCmOE1lSmiY2VDsxgYHQgAx3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 230 (class 1259 OID 16523)
-- Name: contrato; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contrato (
    id_contrato integer NOT NULL,
    fechaa_inicio date NOT NULL,
    fecha_fin date,
    monto numeric(10,2),
    condiciones text,
    estado character varying(20),
    id_proveedor integer
);


ALTER TABLE public.contrato OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16522)
-- Name: contrato_id_contrato_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contrato_id_contrato_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contrato_id_contrato_seq OWNER TO postgres;

--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 229
-- Name: contrato_id_contrato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contrato_id_contrato_seq OWNED BY public.contrato.id_contrato;


--
-- TOC entry 228 (class 1259 OID 16511)
-- Name: entrega; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entrega (
    id_entrega integer NOT NULL,
    fecha date NOT NULL,
    estado character varying(20),
    id_orden integer
);


ALTER TABLE public.entrega OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16510)
-- Name: entrega_id_entrega_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entrega_id_entrega_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entrega_id_entrega_seq OWNER TO postgres;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 227
-- Name: entrega_id_entrega_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entrega_id_entrega_seq OWNED BY public.entrega.id_entrega;


--
-- TOC entry 232 (class 1259 OID 16537)
-- Name: evaluacionproveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacionproveedor (
    id_evalucion integer NOT NULL,
    fecha date NOT NULL,
    calidad character varying(50),
    puntualidad character varying(50),
    costo character varying(50),
    observaciones text,
    id_proveedor integer
);


ALTER TABLE public.evaluacionproveedor OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16536)
-- Name: evaluacionproveedor_id_evalucion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluacionproveedor_id_evalucion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluacionproveedor_id_evalucion_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 231
-- Name: evaluacionproveedor_id_evalucion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluacionproveedor_id_evalucion_seq OWNED BY public.evaluacionproveedor.id_evalucion;


--
-- TOC entry 224 (class 1259 OID 16487)
-- Name: factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    fecha_emision date NOT NULL,
    monto numeric(10,2),
    estado character varying(20),
    id_orden integer
);


ALTER TABLE public.factura OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16486)
-- Name: factura_id_factura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.factura_id_factura_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 223
-- Name: factura_id_factura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;


--
-- TOC entry 222 (class 1259 OID 16470)
-- Name: ordencompra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordencompra (
    id_orden integer NOT NULL,
    fecha date NOT NULL,
    monto_total numeric(10,2),
    estado character varying(20),
    id_proveedor integer,
    id_usuario integer
);


ALTER TABLE public.ordencompra OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16469)
-- Name: ordencompra_id_orden_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordencompra_id_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordencompra_id_orden_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 221
-- Name: ordencompra_id_orden_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ordencompra_id_orden_seq OWNED BY public.ordencompra.id_orden;


--
-- TOC entry 226 (class 1259 OID 16499)
-- Name: pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    fecha date NOT NULL,
    monto numeric(10,2),
    estado character varying(20),
    id_factura integer
);


ALTER TABLE public.pago OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16498)
-- Name: pago_id_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pago_id_pago_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 225
-- Name: pago_id_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;


--
-- TOC entry 218 (class 1259 OID 16456)
-- Name: proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedor (
    id_proveedor integer NOT NULL,
    ruc character varying(11) NOT NULL,
    razon_social character varying(100) NOT NULL,
    direccion character varying(150),
    telefono character varying(15),
    email character varying(100),
    estado character varying(20)
);


ALTER TABLE public.proveedor OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16455)
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedor_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNER TO postgres;

--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 217
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNED BY public.proveedor.id_proveedor;


--
-- TOC entry 220 (class 1259 OID 16463)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    rol character varying(50),
    area character varying(50),
    credenciales character varying(100),
    estado character varying(20)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16462)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 4783 (class 2604 OID 16526)
-- Name: contrato id_contrato; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contrato ALTER COLUMN id_contrato SET DEFAULT nextval('public.contrato_id_contrato_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 16514)
-- Name: entrega id_entrega; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrega ALTER COLUMN id_entrega SET DEFAULT nextval('public.entrega_id_entrega_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 16540)
-- Name: evaluacionproveedor id_evalucion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacionproveedor ALTER COLUMN id_evalucion SET DEFAULT nextval('public.evaluacionproveedor_id_evalucion_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 16490)
-- Name: factura id_factura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);


--
-- TOC entry 4779 (class 2604 OID 16473)
-- Name: ordencompra id_orden; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordencompra ALTER COLUMN id_orden SET DEFAULT nextval('public.ordencompra_id_orden_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 16502)
-- Name: pago id_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 16459)
-- Name: proveedor id_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedor_id_proveedor_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 16466)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 4966 (class 0 OID 16523)
-- Dependencies: 230
-- Data for Name: contrato; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4964 (class 0 OID 16511)
-- Dependencies: 228
-- Data for Name: entrega; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4968 (class 0 OID 16537)
-- Dependencies: 232
-- Data for Name: evaluacionproveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4960 (class 0 OID 16487)
-- Dependencies: 224
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4958 (class 0 OID 16470)
-- Dependencies: 222
-- Data for Name: ordencompra; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4962 (class 0 OID 16499)
-- Dependencies: 226
-- Data for Name: pago; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4954 (class 0 OID 16456)
-- Dependencies: 218
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4956 (class 0 OID 16463)
-- Dependencies: 220
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 229
-- Name: contrato_id_contrato_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contrato_id_contrato_seq', 1, false);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 227
-- Name: entrega_id_entrega_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entrega_id_entrega_seq', 1, false);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 231
-- Name: evaluacionproveedor_id_evalucion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluacionproveedor_id_evalucion_seq', 1, false);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 223
-- Name: factura_id_factura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_id_factura_seq', 1, false);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 221
-- Name: ordencompra_id_orden_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordencompra_id_orden_seq', 1, false);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 225
-- Name: pago_id_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pago_id_pago_seq', 1, false);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 217
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedor_id_proveedor_seq', 1, false);


--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 1, false);


--
-- TOC entry 4798 (class 2606 OID 16530)
-- Name: contrato contrato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_pkey PRIMARY KEY (id_contrato);


--
-- TOC entry 4796 (class 2606 OID 16516)
-- Name: entrega entrega_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrega
    ADD CONSTRAINT entrega_pkey PRIMARY KEY (id_entrega);


--
-- TOC entry 4800 (class 2606 OID 16544)
-- Name: evaluacionproveedor evaluacionproveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacionproveedor
    ADD CONSTRAINT evaluacionproveedor_pkey PRIMARY KEY (id_evalucion);


--
-- TOC entry 4792 (class 2606 OID 16492)
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);


--
-- TOC entry 4790 (class 2606 OID 16475)
-- Name: ordencompra ordencompra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordencompra
    ADD CONSTRAINT ordencompra_pkey PRIMARY KEY (id_orden);


--
-- TOC entry 4794 (class 2606 OID 16504)
-- Name: pago pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);


--
-- TOC entry 4786 (class 2606 OID 16461)
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (id_proveedor);


--
-- TOC entry 4788 (class 2606 OID 16468)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4806 (class 2606 OID 16531)
-- Name: contrato contrato_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor);


--
-- TOC entry 4805 (class 2606 OID 16517)
-- Name: entrega entrega_id_orden_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrega
    ADD CONSTRAINT entrega_id_orden_fkey FOREIGN KEY (id_orden) REFERENCES public.ordencompra(id_orden);


--
-- TOC entry 4807 (class 2606 OID 16545)
-- Name: evaluacionproveedor evaluacionproveedor_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacionproveedor
    ADD CONSTRAINT evaluacionproveedor_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor);


--
-- TOC entry 4803 (class 2606 OID 16493)
-- Name: factura factura_id_orden_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_orden_fkey FOREIGN KEY (id_orden) REFERENCES public.ordencompra(id_orden);


--
-- TOC entry 4801 (class 2606 OID 16476)
-- Name: ordencompra ordencompra_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordencompra
    ADD CONSTRAINT ordencompra_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor);


--
-- TOC entry 4802 (class 2606 OID 16481)
-- Name: ordencompra ordencompra_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordencompra
    ADD CONSTRAINT ordencompra_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4804 (class 2606 OID 16505)
-- Name: pago pago_id_factura_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);


-- Completed on 2025-10-22 09:16:10

--
-- PostgreSQL database dump complete
--

\unrestrict MO8Iq9wOX43dXaLmXfMVHGW0KBCq9BDMbTqX00YbCmOE1lSmiY2VDsxgYHQgAx3

