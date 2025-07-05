"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mechanisms, summary } from "@/lib/mechanisms"
import { MermaidDiagram } from "@/app/components/mermaid-diagram"

function MechanismPage({ mechanism }: { mechanism: (typeof mechanisms)[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">{mechanism.title}</CardTitle>
        <CardDescription className="text-md">{mechanism.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Narrative & User Flow</h3>
          <div className="prose max-w-none text-gray-700">
            <p>{mechanism.narrative}</p>
            {mechanism.formula && (
              <div className="bg-gray-100 p-4 rounded-lg my-4 text-center">
                <p className="text-sm font-mono">{mechanism.formula}</p>
              </div>
            )}
            <h4 className="font-semibold">User Flow Steps:</h4>
            <ol>
              {mechanism.userFlow.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">System Diagrams</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mechanism.diagrams.map((diagram, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white">
                <h4 className="text-center font-medium mb-2">{diagram.title}</h4>
                <div className="flex justify-center">
                  <MermaidDiagram chart={diagram.chart} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MechanismsView() {
  return (
    <Tabs defaultValue={mechanisms[0].id} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-4">
        {mechanisms.map((mech) => (
          <TabsTrigger key={mech.id} value={mech.id}>
            {mech.title}
          </TabsTrigger>
        ))}
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>

      {mechanisms.map((mech) => (
        <TabsContent key={mech.id} value={mech.id}>
          <MechanismPage mechanism={mech} />
        </TabsContent>
      ))}

      <TabsContent value="summary">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">How It All Works Together</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p>{summary.intro}</p>
            <ul>
              {summary.points.map((point, index) => (
                <li key={index}>
                  <strong>{point.title}:</strong> {point.description}
                </li>
              ))}
            </ul>
            <p>{summary.conclusion}</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
