# n8n-nodes-pulpminer

This is an n8n community node. It lets you use PulpMiner in your n8n workflows.

PulpMiner is a web scraping and data extraction platform that allows you to create custom APIs for extracting structured data from websites. This node enables you to interact with your PulpMiner-created APIs directly within n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### API Resource

The node supports the following operations for interacting with your [Saved PulpMiner APIs](https://www.pulpminer.com/api/):

- **GET**: Retrieve structured data from static websites using your saved PulpMiner GET API endpoint
- **POST**: Retrieve structured data from dynamic websites by passing variables in the request body to your saved PulpMiner POST API endpoint

Both GET and POST operations should have already created and saved in your PulpMiner dashboard.

## Credentials

To use this node, you need to authenticate with PulpMiner API key that can be obtained from [Saved APIs page](https://www.pulpminer.com/api/).

### Prerequisites

1. Sign up for a PulpMiner account at [pulpminer.com](https://pulpminer.com)
2. Create and save a custom API endpoint in your PulpMiner dashboard (either for static websites using GET or dynamic websites using POST)
3. Generate an API key from your account settings

### Setup

1. In n8n, add the PulpMiner node to your workflow
2. Click on the credentials field and select "Create New"
3. Enter your PulpMiner API key
4. Save the credentials

The API key will be automatically included in the request headers when making calls to your PulpMiner endpoints.

## Compatibility

- **Minimum n8n version**: 1.113.3
- **Tested with n8n versions**: 1.113.3+
- **Node.js version**: 23.11+

## Usage

### Basic Setup

1. Add the PulpMiner node to your workflow
2. Configure your credentials (see [Credentials](#credentials) section)
3. Enter your API ID (the numeric value found after creating and saving a PulpMiner API, which comes after the `/external/` path in the URL)
4. Select your desired operation:
   - **GET**: For static websites (no dynamic variables needed)
   - **POST**: For dynamic websites that require variables to be passed in the request body
5. For POST requests, provide the request body in JSON format with the variables needed for the dynamic website URL

### API ID

The API ID is a numeric identifier that PulpMiner assigns to each API endpoint you create and save in your dashboard. You can find this ID in your PulpMiner dashboard or in the API endpoint URL (e.g., if your endpoint is `https://api.pulpminer.com/external/123`, then your API ID is `123`).

### Static vs Dynamic Websites

- **Static Websites (GET)**: Use GET operation for websites with fixed URLs that don't require any variables or parameters to extract data.
- **Dynamic Websites (POST)**: Use POST operation for websites that require variables (like search terms, IDs, filters, etc.) to be passed in the request body. These variables are then dynamically inserted into the website URL at runtime to extract the structured data.

### Example Workflow

A typical workflow might involve:
1. Trigger (e.g., webhook or schedule)
2. PulpMiner node to fetch data from a website
3. Data processing nodes
4. Output (e.g., save to database, send email notification)

For new n8n users, you can start with the [Try it out](https://docs.n8n.io/try-it-out/) documentation to learn the basics of building workflows.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [PulpMiner documentation](https://docs.pulpminer.com/)
* [PulpMiner API keys documentation](https://docs.pulpminer.com/essentials/api-keys)
* [PulpMiner website](https://pulpminer.com)
