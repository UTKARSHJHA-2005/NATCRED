import React from 'react'
import Navbar from '../components/Navbar'
import CreditProjects from '../components/CreditProjects'
import EnergyProduct from '../components/EnergyProduct'
import Service from '../components/Service'
import Tradeforgreen from '../components/Tradeforgreen'
import Hero from '../components/Hero'
import Pricing from '../components/Pricing'

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
    </>
  )
}
