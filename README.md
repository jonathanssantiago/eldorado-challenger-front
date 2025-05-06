# Eldorado Challenger Frontend

LINK CLOUDFRONT: https://d2avdre68u3inw.cloudfront.net

## Overview

Angular-based frontend for managing devices and categories. Features seamless integration with REST APIs and automated AWS deployment. Built with Angular LTS and Material Design.

## Development Environment Setup with Self-Signed Certificates

### Context

The backend API uses a self-signed certificate for HTTPS connections during development. This may cause security warnings in browsers and API clients. Here's how to configure your system to use the frontend normally while trusting the backend certificate.

---

### 1. Browser Configuration (Frontend Access)

When accessing the frontend that connects to the backend with a self-signed certificate:

- URL BACKEND AWS: http://ec2-54-162-90-177.compute-1.amazonaws.com/health

#### **Google Chrome/Chromium**

1. Navigate to the backend URL: http://ec2-54-162-90-177.compute-1.amazonaws.com/health
2. Click **"Advanced"** > **"Proceed to [site] (unsafe)**
3. _(Optional)_ Type `thisisunsafe` anywhere on the page to bypass immediately

#### **Mozilla Firefox**

1. Click **"Advanced"**
2. Select **"Accept the Risk and Continue"**

#### **Microsoft Edge**

1. Click **"Details"**
2. Choose **"Go on to the webpage"**

#### **Safari**

1. Click **"Show Details"**
2. Select **"Visit this website"**

---

## Key Features

- **Device Management**  
  🖥️ Create, read, delete devices
- **CI/CD Pipeline**  
  🔄 GitHub Actions for automated testing and deployment

## Tech Stack

| Component       | Technology          |
| --------------- | ------------------- |
| Framework       | Angular 19          |
| UI Library      | Angular Material    |
| CI/CD           | GitHub Actions      |
| Cloud Hosting   | AWS S3 + CloudFront |
| Package Manager | npm                 |

## Getting Started

### Prerequisites

- Node.js LTS
- AWS CLI configured

### Installation

```bash
git clone https://github.com/jonathanssantiago/eldorado-challenger-front
cd eldorado-challenger-front
npm install
```
