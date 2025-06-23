┌─────────────────────────────┐
 │     Mobile Frontend (PWA)   │
 │  - React/Next.js             │
 │  - Capacitor Native Wrapper │
 │  - UI for Input & Feedback   │
 └────────────┬────────────────┘
              │ REST/WebSocket
              ▼
 ┌─────────────────────────────┐
 │       API Gateway Layer      │
 │  - Express/Flask/Django      │
 │  - Handles Auth, Rate Limiting│
 └────────────┬────────────────┘
              │ REST/WebSocket
              ▼
 ┌──────────────────────────────┐
 │ IAI-IPS Gem Core (Orchestrator)│
 │  - Manages task queuing       │
 │  - Controls core node alpha   │
 └────────────┬─────────────────┘
              │ Task Queue (Kafka/SQS)
              ▼
 ┌──────────────────────────────┐
 │ Neural Network Pool (Docker) │
 │  - PyTorch/TensorFlow models │
 │  - Scaled via Kubernetes     │
 └──────────────────────────────┘
