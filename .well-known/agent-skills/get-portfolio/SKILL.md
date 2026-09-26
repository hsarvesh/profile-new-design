# Get Portfolio Details

## Role & Purpose
This skill allows an autonomous AI agent to retrieve and parse structured details about Sarvesh Huddedar's work experience, enterprise AI architecture competencies, AI ROI calculators, Chrome on-device AI showcases, credentials, publications, and contact coordinates.

## Endpoints for Agent Retrieval
- **LLM Summary**: https://sarvesh.website/llms.txt
- **Full Dossier**: https://sarvesh.website/llms-full.txt
- **WebMCP Tool**: Available via window modelContext `getPortfolioSummary({ section: 'services' | 'experience' | 'projects' | 'certifications' | 'contact' | 'all' })`
- **Markdown Content Negotiation**: Send `Accept: text/markdown` when requesting https://sarvesh.website/ to receive clean, token-efficient Markdown without HTML markup.

## Core Capabilities
- Enterprise Generative AI Strategy & Governance
- Autonomous Agentic Workflows & Multi-Agent Cognitive Automation
- Production Retrieval-Augmented Generation (RAG)
- Mathematical AI ROI Modeling & Auditing
- On-Device / Local LLM Inference (Chrome Built-in AI Gemini Nano)
