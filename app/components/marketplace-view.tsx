"use client"

import { CardDescription } from "@/components/ui/card"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products"
import { Coins } from "lucide-react"

export function MarketplaceView() {
  const { toast } = useToast()

  const handleBuy = (productName: string, price: number) => {
    toast({
      title: "Purchase Successful!",
      description: `You bought ${productName} for ${price} Maica.`,
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Local Marketplace</CardTitle>
        <CardDescription>Use your Maica to purchase goods from local producers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <CardHeader className="flex-grow pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-between items-center pt-2">
                <div className="flex items-center font-semibold text-lg">
                  <Coins className="w-5 h-5 mr-2 text-yellow-500" />
                  {product.price}
                </div>
                <Button onClick={() => handleBuy(product.name, product.price)}>Buy</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
