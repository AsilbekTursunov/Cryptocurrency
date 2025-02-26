import { useGetCryptosQuery } from "../services/cryptoApi";
import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { Cryptocurrencies, Loader, News } from "../components";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12} style={{ padding: "10px" }}>
          {" "}
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats.total}
          />{" "}
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          {" "}
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />{" "}
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          {" "}
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />{" "}
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          {" "}
          <Statistic
            title="Total 24 Volume"
            value={millify(globalStats.total24hVolume)}
          />{" "}
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          {" "}
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />{" "}
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
