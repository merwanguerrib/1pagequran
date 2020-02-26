import React from "react";
import Head from "next/head";
import Form from "../components/form";
import "../styles/index.css";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Form />
  </div>
);

export default Home;
