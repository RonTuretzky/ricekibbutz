"use client"

import { useEffect } from "react"
import mermaid from "mermaid"

// Initialize Mermaid.js to run manually on component load
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
})

export function MermaidDiagram({ chart }: { chart: string }) {
  useEffect(() => {
    // When the component mounts or the chart data changes,
    // tell Mermaid.js to find all elements with class="mermaid" and render them.
    mermaid.run()
  }, [chart])

  // The raw chart syntax is placed inside a div with the "mermaid" class.
  // Mermaid.js will then replace this with the rendered SVG diagram.
  return <div className="mermaid">{chart}</div>
}
