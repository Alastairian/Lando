import { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Toggle } from "@/components/ui/toggle"; import { CheckCircle, RefreshCcw } from "lucide-react";

export default function SimulatedTrainingUI() { const [input, setInput] = useState(""); const [label, setLabel] = useState("ripe"); const [log, setLog] = useState([]); const [running, setRunning] = useState(false);

const simulateTraining = () => { setRunning(true); setTimeout(() => { const newLog = { input, label, coreAdjustment: Math.random().toFixed(2), contradictionScore: (Math.random() * 2 - 1).toFixed(2), }; setLog([newLog, ...log]); setRunning(false); }, 1200); };

return ( <div className="grid gap-4 p-4 max-w-md mx-auto"> <Card className="shadow-xl"> <CardContent className="p-4 grid gap-3"> <h2 className="text-xl font-semibold">Simulated Training</h2> <Textarea placeholder="Describe fruit state (e.g. 'green with firm skin')" value={input} onChange={(e) => setInput(e.target.value)} /> <div className="flex items-center gap-3"> <Toggle pressed={label === "ripe"} onPressedChange={() => setLabel(label === "ripe" ? "unripe" : "ripe")} > {label.toUpperCase()} </Toggle> <Button onClick={simulateTraining} disabled={running || input.trim() === ""} > {running ? <RefreshCcw className="animate-spin" /> : "Train"} </Button> </div> </CardContent> </Card>

<Card className="shadow-md">
    <CardContent className="p-4">
      <h3 className="text-lg font-medium mb-2">Training Log</h3>
      <div className="grid gap-2 max-h-60 overflow-y-auto">
        {log.map((entry, index) => (
          <div
            key={index}
            className="border rounded p-2 text-sm grid gap-1 bg-muted"
          >
            <div><strong>Input:</strong> {entry.input}</div>
            <div><strong>Label:</strong> {entry.label}</div>
            <div><strong>Contradiction Score:</strong> {entry.contradictionScore}</div>
            <div><strong>Core Adjustment:</strong> {entry.coreAdjustment}</div>
          </div>
        ))}
        {log.length === 0 && (
          <div className="text-muted-foreground text-sm text-center">No training attempts yet.</div>
        )}
      </div>
    </CardContent>
  </Card>
</div>

); }


