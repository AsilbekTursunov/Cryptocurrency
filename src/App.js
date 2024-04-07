import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { HomeOutlined, BulbOutlined, FundOutlined } from "@ant-design/icons";

import { News, CryptoDetails, Cryptocurrencies, Homepage } from "./components";
import icon from "./images/cryptocurrency.png";
import "./App.css";
const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "CryptoCurrencies", href: "/cryptocurrencies", current: false },
  { name: "News", href: "/news", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const App = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/" className="flex items-center">
                        {" "}
                        <img
                          className="h-10 w-10"
                          src={icon}
                          alt="Your Company"
                        />{" "}
                        {"  "}{" "}
                        <span className="text-4xl text-cyan-500 ml-4 font-semibold">
                          Cryptoverse
                        </span>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4"></div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                      </button>

                      {/* Profile dropdown */}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {activeMenu && (
          <header className="bg-white shadow">
            <div className=" mx-auto max-w-7xl pl-4  p-3 sm:px-6 lg:px-2 ">
              <Menu
                as={"div"}
                theme="dark"
                mode="horizontal"
                className={"flex justify-evenly text-center"}
              >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link
                    to={"/"}
                    style={{ width: "100%" }}
                    className=" font-semibold text-2xl"
                  >
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FundOutlined />}>
                  <Link
                    to={"/cryptocurrencies"}
                    style={{ width: "100%" }}
                    className=" font-semibold text-2xl"
                  >
                    Cryptocurrencies
                  </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<BulbOutlined />}>
                  <Link
                    to={"/news"}
                    style={{ width: "100%" }}
                    className=" font-semibold text-2xl"
                  >
                    News
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </header>
        )}
        <main className="p-4 md:p-6 lg:p-8">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route
              exact
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-3">
          &copy; Copyright 2014 - {new Date().getFullYear()} CoinTracker
        </footer>
      </div>
    </>
  );
};

export default App;
