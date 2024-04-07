import { useGetCryptosQuery } from "../services/cryptoApi";
import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, cryptos]);

  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[12, 12]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    style={{ width: "30px", height: "30px" }}
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="cryptoIcon"
                  />
                }
                hoverable
              >
                <p className="cryto-value">
                  <span>Price:</span> <span>${millify(currency.price)}</span>
                </p>
                <p className="cryto-value">
                  <span>Market Cap:</span>{" "}
                  <span>{millify(currency.marketCap)}</span>
                </p>
                <p className="cryto-value">
                  <span>Daily Change:</span> <span>{currency.change}%</span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
