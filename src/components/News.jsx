import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "./Loader";
// import Loader from './Loader';

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;
const News = () => {
  const [newsCategory, setNewsCategory] = useState("Crypto");
  const { data, isFetching } = useGetCryptoNewsQuery(newsCategory);
  const response = useGetCryptosQuery(20);
  const cryptoNews = data?.results;
  if (isFetching) return <Loader />;
  const getHundred = (value) => {
    return value.substring(0, 200);
  };
  return (
    <>
      <Col span={24} style={{ marginBottom: "20px" }}>
        <Select
          showSearch
          className="select-news"
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="cryptocurency">Cryptocurrency</Option>
          {response?.data?.data?.coins?.map((currency) => (
            <Option value={currency.name}>{currency.name}</Option>
          ))}
        </Select>
      </Col>
      <Row gutter={[24, 24]}>
        {cryptoNews &&
          cryptoNews.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Link target="_blank" to={news.source_url}>
                <Card
                  hoverable
                  className="news-card"
                  style={{ height: "100%" }}
                >
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                      <Title
                        style={{ textAlign: "start", padding: "15px" }}
                        className="news-title"
                        level={5}
                      >
                        {news.title}
                      </Title>
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url(${
                            news?.image_url || demoImage
                          })`,
                          backgroundSize: "cover",
                        }}
                        alt="news"
                      ></div>
                    </div>
                    <p style={{ height: "100px", overflow: "auto" }}>
                      {getHundred(news.description ? news.description : "")}
                    </p>
                    <div className="provider-container">
                      <div>
                        <Avatar src={news?.source_icon || demoImage} alt="" />
                        <Text
                          className="provider-name"
                          style={{ textTransform: "capitalize" }}
                        >
                          {news.source_id}
                        </Text>
                      </div>
                      <Text>
                        {moment(news.pubDate).startOf("ss").fromNow()}
                      </Text>
                    </div>
                  </a>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default News;
