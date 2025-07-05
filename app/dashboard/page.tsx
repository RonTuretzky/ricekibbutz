"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MechanismsView } from "@/app/components/mechanisms-view"
import { MarketplaceView } from "@/app/components/marketplace-view"
import { WalletView } from "@/app/components/wallet-view"
import { FaminePreparednessView } from "@/app/components/famine-preparedness-view"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="bg-gray-50/90 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center relative">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Kibbutz Yatsugatake</h1>
          <p className="mt-2 text-lg text-gray-600">An interactive dashboard for the core economic mechanisms.</p>
          <div className="absolute top-0 right-0">
            <Button asChild variant="link">
              <Link href="/">Our Vision →</Link>
            </Button>
          </div>
        </header>

        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-4 mb-4">
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="famine-fund">Famine Preparedness Fund</TabsTrigger>
            <TabsTrigger value="mechanisms">Mechanisms</TabsTrigger>
          </TabsList>

          <TabsContent value="mechanisms">
            <MechanismsView />
          </TabsContent>
          <TabsContent value="marketplace">
            <MarketplaceView />
          </TabsContent>
          <TabsContent value="wallet">
            <WalletView />
          </TabsContent>
          <TabsContent value="famine-fund">
            <FaminePreparednessView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
