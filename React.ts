// React + Tailwind debug tools for IAI-IPS import { useState, useEffect } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Slider } from "@/components/ui/slider"; import { motion } from "framer-motion";

const DebugUI = () => { const [queue, setQueue] = useState([]); const [log, setLog] = useState([]); const [alpha, setAlpha] = useState(0.5); const [contradiction, setContradiction] = useState(0);

const addLog = (message) => { setLog((prev) => [...prev.slice(-99), { message, time: new Date().toLocaleTimeString() }]); };

const generateSubmission = () => { const submission = { id: Date.now(), image: fruit_${Math.floor(Math.random() * 100)}.jpg, ripe_score: Math.random(), }; setQueue((prev) => [...prev, submission]); addLog(Queued submission: ${submission.image} with score ${submission.ripe_score.toFixed(2)}); };

const simulateContradiction = () => { const newContradiction = Math.random(); const newAlpha = 1 - newContradiction; setContradiction(newContradiction); setAlpha(newAlpha); addLog(Simulated contradiction: ${newContradiction.toFixed(2)}, alpha adjusted to ${newAlpha.toFixed(2)}); };

const flushQueue = () => { queue.forEach((item) => { addLog(Flushed submission: ${item.image}); }); setQueue([]); };

return ( <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2"> {/* Test Submission Generator */} <Card> <CardContent className="space-y-4"> <h2 className="text-xl font-bold">Test Submission</h2> <Button onClick={generateSubmission}>Generate Submission</Button> <Button onClick={flushQueue} variant="secondary">Flush Queue</Button> <p className="text-sm text-muted">Current Queue: {queue.length}</p> </CardContent> </Card>

{/* Simulated Core Node Behavior */}
  <Card>
    <CardContent className="space-y-4">
      <h2 className="text-xl font-bold">Simulated Core Node</h2>
      <Button onClick={simulateContradiction}>Simulate Contradiction</Button>
      <div className="flex items-center justify-between">
        <p>Alpha: {alpha.toFixed(2)}</p>
        <Slider value={[alpha]} max={1} min={0} step={0.01} disabled />
      </div>
      <motion.div
        className="w-full h-4 rounded bg-gradient-to-r from-green-400 to-yellow-400"
        initial={{ scaleX: contradiction }}
        animate={{ scaleX: contradiction }}
        style={{ transformOrigin: "left" }}
      />

