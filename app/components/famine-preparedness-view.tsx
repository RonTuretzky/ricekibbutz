"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, CheckCircle, FileText, Loader2, Newspaper, Shield, ShieldOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// --- Newspaper constants (Yamanashi Prefecture) ---
const NEWSPAPER_SOURCES = [
  {
    id: 1,
    name: "Yamanashi Nichinichi Shimbun",
    normal: "Koshu Wine Harvest Begins with High Hopes",
    crisis: "Typhoon Warning Issued for Central Honshu",
  },
  {
    id: 2,
    name: "Fuji Five Lakes Times",
    normal: "Mt. Fuji Climbing Season Sees Record Visitors",
    crisis: "Increased Seismic Activity Detected Near Mt. Fuji",
  },
  {
    id: 3,
    name: "Kofu Citizen's Report",
    normal: "Shingen-ko Festival Draws Large Crowds",
    crisis: "Fuji River Levels Rise, Flood Watch in Effect",
  },
  {
    id: 4,
    name: "Minami Alps Post",
    normal: "Peach and Plum Orchards Report Excellent Season",
    crisis: "Chuo Expressway Closed Due to Landslide",
  },
  {
    id: 5,
    name: "Yatsugatake Herald",
    normal: "Crystal Artisans Unveil New Collection",
    crisis: "Key Vineyard Suffers from Unexpected Blight",
  },
]
type AnalysisResult = { id: number; name: string; headline: string; classification: "NORMAL" | "CRISIS" }

// --- Rice Reserve constants ---
const M = 10_000_000,
  P0 = 500,
  Pt = 650,
  GAMMA = 0.05,
  DELTA = 0.8,
  MIN_STOCK_FOR_REDEMPTION = 30000

export function FaminePreparednessView() {
  const { toast } = useToast()

  // --- Shared State ---
  const [crisisMode, setCrisisMode] = useState(false)

  // --- Crisis Oracle State ---
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult[]>([])

  // --- Rice Reserve State ---
  const [riceStock, setRiceStock] = useState(35000)
  const [maicaBalance, setMaicaBalance] = useState(5000)
  const [redeemAmount, setRedeemAmount] = useState("")

  // --- Crisis Oracle Logic ---
  const handleAnalysis = () => {
    setIsAnalyzing(true)
    setResults([])
    toast({ title: "MPC Analysis Started", description: "Fetching and classifying articles..." })

    setTimeout(() => {
      const analysisResults = NEWSPAPER_SOURCES.map((source) => {
        const isCrisis = Math.random() > 0.6
        return {
          ...source,
          headline: isCrisis ? source.crisis : source.normal,
          classification: isCrisis ? "CRISIS" : "NORMAL",
        }
      })
      const crisisVotes = analysisResults.filter((r) => r.classification === "CRISIS").length
      const majorityDecision = crisisVotes >= 3 ? "CRISIS" : "NORMAL"

      setResults(analysisResults)
      setCrisisMode(majorityDecision === "CRISIS") // This links the two simulations
      setIsAnalyzing(false)
      toast({
        title: "Analysis Complete",
        description: `Majority decision is: ${majorityDecision}`,
        action: <CheckCircle className="text-green-500" />,
      })
    }, 2500)
  }

  // --- Rice Reserve Logic ---
  const redemptionEnabled = crisisMode && riceStock >= MIN_STOCK_FOR_REDEMPTION
  const swapRatio = useMemo(() => {
    if (!redemptionEnabled) return 0
    return Math.min(GAMMA * (riceStock / M), DELTA * (P0 / Pt))
  }, [riceStock, redemptionEnabled])
  const receivedKg = (Number.parseFloat(redeemAmount) || 0) * swapRatio

  const handleRedeem = () => {
    const amount = Number.parseFloat(redeemAmount)
    if (!amount || amount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a positive number.", variant: "destructive" })
      return
    }
    if (amount > maicaBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You cannot redeem more Maica than you have.",
        variant: "destructive",
      })
      return
    }
    setMaicaBalance(maicaBalance - amount)
    setRedeemAmount("")
    toast({
      title: "Redemption Successful",
      description: `You exchanged ${amount} Maica for a ${receivedKg.toFixed(2)} kg rice voucher.`,
      action: <CheckCircle className="text-green-500" />,
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Part 1: Trigger Analysis</CardTitle>
          <CardDescription>
            The Fund's status is determined by analyzing news sources. A majority 'CRISIS' vote activates the fund.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAnalysis} disabled={isAnalyzing} size="lg" className="w-full mb-6">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Fetch & Analyze News Sources"
            )}
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {results.map((result) => (
                <div key={result.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm flex items-center">
                      <Newspaper className="mr-2 h-4 w-4 text-gray-500" />
                      {result.name}
                    </span>
                    <Badge variant={result.classification === "CRISIS" ? "destructive" : "secondary"}>
                      {result.classification}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 pl-6">
                    <FileText className="inline-block mr-1 h-3 w-3" />"{result.headline}"
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center p-4 flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold">On-Chain Status</h3>
              <AlertTriangle className={`h-12 w-12 my-2 ${crisisMode ? "text-red-500" : "text-green-500"}`} />
              <Badge className="text-xl" variant={crisisMode ? "destructive" : "secondary"}>
                {crisisMode ? "CRISIS" : "NORMAL"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Part 2: Access The Fund</CardTitle>
          {!redemptionEnabled && (
            <CardDescription className="text-yellow-700 flex items-center pt-2">
              <ShieldOff className="mr-2 h-4 w-4" />
              Redemption is currently disabled. Requires CRISIS status AND sufficient Rice Stock.
            </CardDescription>
          )}
          {redemptionEnabled && (
            <CardDescription className="text-green-600 flex items-center pt-2">
              <Shield className="mr-2 h-4 w-4" />
              Redemption is ACTIVE. You can swap Maica for rice vouchers.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <Label>Rice Stock (kg)</Label>
              <div
                className={`text-2xl font-bold ${riceStock < MIN_STOCK_FOR_REDEMPTION ? "text-red-600" : "text-green-600"}`}
              >
                {riceStock.toLocaleString()}
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <Label>Your Maica Balance</Label>
              <div className="text-2xl font-bold">{maicaBalance.toFixed(2)}</div>
            </div>
          </div>
          <div>
            <Label htmlFor="redeem-amount">Amount of Maica to Redeem</Label>
            <Input
              id="redeem-amount"
              type="number"
              placeholder="e.g., 1000"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
              disabled={!redemptionEnabled}
            />
          </div>
          <div className="text-center text-lg font-medium p-4 border-dashed border-2 rounded-lg">
            You will receive ≈ <span className="font-bold text-blue-600">{receivedKg.toFixed(2)} kg</span> of rice
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRedeem} disabled={!redemptionEnabled} className="w-full">
            Redeem Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
