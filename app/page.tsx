import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Coins, Gift, HeartHandshake, Shield, ShieldCheck, Sprout } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/yatsugatake-sunrise-paddies.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Building a New Society from Yatsugatake
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
            An unprecedented social model for a new era. A real-world utopia where we prioritize life, community, and
            true sustainability.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Explore the technical demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Guiding Principles</h2>
            <p className="mt-4 text-lg text-gray-600">
              From material civilization to a 'Neo-Jomon' fusion of spiritual and material well-being.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Sharing Over Competing</h3>
              <p className="mt-2 text-gray-600">We build a society on collaboration and mutual support.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <Sprout className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Producing Over Consuming</h3>
              <p className="mt-2 text-gray-600">
                Our economy is centered on life and sustainable production, not just consumption.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Life-Centered Economy</h3>
              <p className="mt-2 text-gray-600">
                We use technology to create a local economy that serves human needs directly.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Consensus & Digital Trust</h3>
              <p className="mt-2 text-gray-600">
                Decisions are made collectively, secured by transparent, digital trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connecting Vision to Mechanisms */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Our Vision Comes to Life
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our philosophy is built into the code. Explore the mechanisms that power our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Coins className="h-8 w-8 mb-2 text-yellow-500" />
                <CardTitle>Maica: A Community Currency</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Maica is our internal currency, based on the value of rice we produce. It's used for all on-site
                  spending, ensuring value circulates within our local economy. This is our life-centered economy in
                  action.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Gift className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>Basic Rice-Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Every community member is entitled to 60kg of rice per year, regardless of how many days they work in
                  the fields. This is our commitment to food security and valuing existence over output.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-red-600" />
                <CardTitle>Famine Preparedness Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  In an era where having rice is more important than money, our fund provides real security. During a
                  financial crisis, Maica can be exchanged for rice, protecting our members when they need it most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ending Village Concept */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Community for Life</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We are creating a place where everyone can live out their days in peace. This means a community where people
            are cared for by a "family" of heartfelt connection, not just by blood relation. We integrate midwifery for
            new beginnings with supportive living for our elders, creating a space where all generations interact,
            learn, and support one another. True peace of mind comes from living authentically in a community that
            values you for who you are.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="text-center">
            <p className="text-gray-400">General Incorporated Association Kibbutz Yatsugatake</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link href="/dashboard" className="text-gray-400 hover:text-white">
                Technical Demo
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white">
                Our Vision
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
