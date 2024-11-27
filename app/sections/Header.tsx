"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Contact from '../modals/Contact';
import Cart from '../modals/Cart';
import ShoppingCartIcon from '../components/ShoppingCartIcon';

const Header: React.FC = () => {  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);  
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  const toggleModal = () => setShowModal(!showModal);
  const toggleCartModal = () => setShowCartModal(!showCartModal);  

  useEffect(() => {
    const headerHeight = document.querySelector<HTMLDivElement>('#header')?.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

    const sections = ['homepage', 'aboutMe', 'myBook', 'myGame', 'myCode', 'myMusings'];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const navElement = document.getElementById(`${entry.target.id}Nav`);
        if (navElement) {
          if (entry.isIntersecting) navElement.classList.add('underline-nav');
          else navElement.classList.remove('underline-nav');
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth(); // Initial check
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  // Determine Header style based on viewport width
  const isBelow768 = viewportWidth < 768;
  const isBetween768And1024 = viewportWidth >= 768 && viewportWidth < 1024;
  const isBetween1024And1330 = viewportWidth >= 1024 && viewportWidth < 1330;
  const isAbove1330 = viewportWidth >= 1330;

  const headerClass = isBelow768
    ? "relative"
    : "fixed inset-x-0 top-0 z-10"; // Fixed for widths >=768px

  const navClass = isAbove1330
    ? "justify-between max-w-[1280px]" // Logo and nav links have a gap
    : isBetween1024And1330
    ? "justify-around lg:max-w-[935px]" // No gap between logo and nav links
    : "justify-center max-w-[270px]"; // Default for smaller screens

    return (
      <>
        <section id="header" className={`${headerClass} py-4 text-lg`}>
          <div
            className={`flex items-center mx-auto px-4 py-2 border-b-2 border-custom-border-color ${navClass}`}
          >
            {/* Logo */}
            <div
              className={`flex items-center ${
                isAbove1330 ? "pr-4 border-r-2 border-custom-border-color" : ""
              } ${isBelow768 || isBetween768And1024 ? 'pr-4' : ''}`}
            >
              <Link
                href="/?scrollTo=homepage"
                className="font-gopher-mono-semi text-lg"
                id="homepageNav"
              >
                benSpooner
              </Link>
            </div>
  
            {/* Cart and Contact for small screens */}
            {(isBelow768 || isBetween768And1024) && (
              <div className="flex items-center space-x-4">
                {/* Cart Icon */}
                <div
                  id="cart"
                  className="cursor-pointer"
                  onClick={toggleCartModal}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleCartModal();
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <ShoppingCartIcon />
                </div>
  
                {/* Contact */}
                <button id="contactNav" onClick={toggleModal}>
                  contactMe
                </button>
              </div>
            )}
  
            {/* Full navigation for larger screens */}
            {viewportWidth >= 1024 && (
              <nav className="flex space-x-4 font-gopher-mono">
                <Link
                  href="/?scrollTo=aboutMe"
                  className="border-l-2 border-custom-border-color pl-4 cursor-pointer"
                  id="aboutMeNav"
                >
                  aboutMe
                </Link>
                <Link
                  href="/?scrollTo=myBook"
                  className="border-l-2 border-custom-border-color pl-4 cursor-pointer"
                  id="myBookNav"
                >
                  myBook
                </Link>
                <Link
                  href="/?scrollTo=myGame"
                  className="border-l-2 border-custom-border-color pl-4 cursor-pointer"
                  id="myGameNav"
                >
                  myGame
                </Link>
                <Link
                  href="/?scrollTo=myCode"
                  className="border-l-2 border-custom-border-color pl-4 cursor-pointer"
                  id="myCodeNav"
                >
                  myCoding
                </Link>
                <Link
                  href="/?scrollTo=myMusings"
                  className="border-l-2 border-custom-border-color pl-4 cursor-pointer"
                  id="myMusingsNav"
                >
                  myMusings
                </Link>
                <div
                  id="cart"
                  className="border-l-2 border-custom-border-color pl-4 cursor-pointer"
                  onClick={toggleCartModal}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleCartModal();
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <ShoppingCartIcon />
                </div>
                <button
                  id="contactNav"
                  className="border-l-2 border-custom-border-color pl-6"
                  onClick={toggleModal}
                >
                  contactMe
                </button>
              </nav>
            )}
          </div>
        </section>
  
        {/* Modals */}
        <Contact showModal={showModal} setShowModal={setShowModal} />
        <Cart showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
      </>
    );
  };
  
  export default Header;