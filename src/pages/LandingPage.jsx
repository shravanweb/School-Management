import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import About from '../components/About'
import Programs from '../components/Programs'
import Features from '../components/Features'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import '../App.css'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Programs />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
