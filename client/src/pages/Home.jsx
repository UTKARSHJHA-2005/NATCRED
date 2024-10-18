import React from 'react'
import Navbar from '../components/navbar'
import CreditProjects from '../components/CreditProjects'
import EnergyProduct from '../components/EnergyProduct'
import Blog from '../components/Blog'
import Tradeforgreen from '../components/Tradeforgreen'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

export default function () {
  return (
    <>
    <Navbar/>
    <Hero/>
    <CreditProjects/>
    <Tradeforgreen/>
    <EnergyProduct/>
    <Blog/>
    <Footer/>
    </>
  )
}
