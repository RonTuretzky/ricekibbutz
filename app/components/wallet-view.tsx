"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Coins, Gift, Package, PackageCheck, Wallet } from "lucide-react"

export function WalletView() {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [maicaBalance, setMaicaBalance] = useState<number>(0)
  const [claimedThisCycle, setClaimedThisCycle] = useState(0)
  const [availableToClaim, setAvailableToClaim] = useState(0)
  const { toast } = useToast()

  const handleConnect = () => {
    const mockAddress =
      "0x" +
      Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
    setUserAddress(mockAddress)
    const mockBalance = Math.random() * 5000
    setMaicaBalance(mockBalance)
    setClaimedThisCycle(30)
    setAvailableToClaim(10)
    setIsConnected(true)
    toast({
      title: "Wallet Connected",
      description: `Address: ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
    })
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setUserAddress(null)
    setMaicaBalance(0)
    setClaimedThisCycle(0)
    setAvailableToClaim(0)
    toast({ title: "Wallet Disconnected" })
  }

  const handleClaim = () => {
    const amountToClaim = availableToClaim
    setClaimedThisCycle(claimedThisCycle + amountToClaim)
    setAvailableToClaim(0)
    toast({
      title: "Claim Successful!",
      description: `${amountToClaim}kg rice voucher has been issued to your address.`,
      action: <CheckCircle className="text-green-500" />,
    })
  }

  const ANNUAL_ENTITLEMENT = 60
  const canClaim = availableToClaim > 0

  if (!isConnected) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-8 sm:p-16">
        <CardHeader>
          <Wallet className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
          <CardDescription>Connect your wallet to view your balance and interact with the ecosystem.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" onClick={handleConnect}>
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Wallet Connected</CardTitle>
          <CardDescription className="font-mono text-sm break-all">{userAddress}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-50/70">
          <CardHeader>
            <div className="flex items-center">
              <Coins className="h-6 w-6 mr-3 text-yellow-500" />
              <CardTitle>Maica Balance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{maicaBalance.toFixed(2)}</div>
            <p className="text-sm text-gray-500">Your current spendable balance.</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-50/70">
          <CardHeader>
            <div className="flex items-center">
              <Gift className="h-6 w-6 mr-3 text-blue-600" />
              <CardTitle>Basic Rice-Income</CardTitle>
            </div>
            <CardDescription>Your universal annual rice entitlement.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center text-gray-600">
                  <Package className="mr-2 h-4 w-4" /> Available to Claim:
                </span>
                <span className="font-medium">{availableToClaim} kg</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center text-gray-600">
                  <PackageCheck className="mr-2 h-4 w-4" /> Claimed This Cycle:
                </span>
                <span className="font-medium">{claimedThisCycle} kg</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center text-gray-600">
                  <Gift className="mr-2 h-4 w-4" /> Annual Entitlement:
                </span>
                <span className="font-medium">{ANNUAL_ENTITLEMENT} kg</span>
              </li>
            </ul>
            {canClaim && (
              <div className="flex items-center text-green-600 text-sm pt-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Status: Ready to Claim</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleClaim} disabled={!canClaim} className="w-full">
              Claim {availableToClaim} kg Now
            </Button>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  )
}
