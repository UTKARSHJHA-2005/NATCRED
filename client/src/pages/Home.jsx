import React from 'react'
import Navbar from '../components/navbar'
import CreditProjects from '../components/CreditProjects'
import EnergyProduct from '../components/EnergyProduct'
import Blog from '../components/Blog'
import Service from '../components/Service'
import Tradeforgreen from '../components/Tradeforgreen'
import Hero from '../components/Hero'
import Pricing from '../components/Pricing'
import NewsLetter from '../components/Newsletter'

export default function () {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Service/>
    <CreditProjects/>
    <Tradeforgreen/>
    <EnergyProduct/>
    <Pricing/>
    <Blog/>
    <NewsLetter/>
    </>
  )
}
