# auth.md

Welcome to the AI Agent Authentication metadata for sarvesh.website.

## Discovery
You can discover our OAuth Protected Resource Metadata at `/.well-known/oauth-protected-resource`.
The authorization server is located at `/.well-known/oauth-authorization-server`.

## Authentication Flows
We support the following registration flows for autonomous AI agents:

### Anonymous
Agents can register anonymously without a user account to obtain an API key.

- **Registration Endpoint**: `https://sarvesh.website/agent/register`
- **Claim Endpoint**: `https://sarvesh.website/agent/claim`
- **Credential Type**: `api_key`
