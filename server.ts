/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Shared Gemini client setup
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Gemini client successfully initialized.");
    } catch (e) {
      console.error("Failed to initialize Gemini client:", e);
    }
  } else {
    console.log("No GEMINI_API_KEY found or using standard default placeholder. Operating in intelligent local simulation engine.");
  }

  // API Route: Secure AI Compliance Chat
  app.post("/api/compliance/chat", async (req, res) => {
    const { messages, companyContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || "";

    // System instruction containing specialized UAE SME compliance database for high precision Q&A
    const systemInstruction = `
      You are ComplianceOS, the leading AI Compliance Officer designed by cyber security and legal experts in corporate operations for UAE SMEs.
      Your tone is professional, human, helpful, rigorous, and extremely knowledgeable about UAE laws (Corporate Tax, VAT, Trade Licenses, MoHRE Labour Laws, and Emiratisation).
      
      UAE SME COMPLIANCE FACT SHEET AND DATABASE:
      1. Corporate Tax (CT):
         - Registered with Federal Tax Authority (FTA).
         - Rate: 0% for taxable income up to AED 375,000; 9% for taxable income above AED 375,000.
         - Small Business Relief (SBR): Applicable for resident taxable persons with revenue under AED 3,000,000 in the relevant tax period (valid until Dec 31, 2026). If SBR applies, 0% rate is applicable but filing is still mandatory.
         - First tax period starts on or after June 1, 2023. Annual deadline is 9 months after the end of the financial year.
      2. Value Added Tax (VAT):
         - Rate: 5% standard rate.
         - Voluntary Registration Threshold: AED 187,500 annual taxable revenue.
         - Mandatory Registration Threshold: AED 375,000 annual taxable revenue.
         - Filing frequency: Typically quarterly (within 28 days of the end of the tax period).
      3. Trade License:
         - Main jurisdictions: Mainland (DED - Department of Economy and Tourism) and various Free Zones (e.g., DMCC, DAFZA, JAFZA, ADGM, DIFC).
         - Renewal: Required annually. Failure results in a fine of AED 200/month or even blacklisting.
      4. Employee Visas and Labour Law (MoHRE):
         - Work Permits and Quotas: Tracked via MoHRE.
         - WPS (Wage Protection System): Mandatory for mainland companies. Salaries must be paid through WPS to licensed financial entities monthly, otherwise fines apply.
         - Health Insurance: Mandatory for all employees in Dubai (DHA) and Abu Dhabi (DOH/ADA).
         - Emiratisation: SMEs with 20-49 employees in specific economic sectors must hire at least 1 UAE national in 2024 and another in 2025 (fine of AED 96,000 per year for non-compliance).
      
      Company Context context:
      ${JSON.stringify(companyContext || {})}

      Please respond to the user's compliance question using exact UAE terminology. Be highly factual. Cite articles where helpful (e.g. Decree Law No. 47 of 2022 on Corporate Tax). Keep formatting readable with clean markdown.
    `;

    // Fast-track responses if Gemini is not set up
    if (!ai) {
      return res.json({
        content: getLocalSimulationResponse(userPrompt, companyContext),
        simulated: true,
      });
    }

    try {
      const contents = messages.map((m) => {
        return {
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.3,
        },
      });

      return res.json({
        content: response.text || "I was unable to formulate a compliance response. Please rephrase your query.",
        simulated: false,
      });
    } catch (e: any) {
      console.error("Gemini Error, falling back to local database:", e.message);
      return res.json({
        content: `*(ComplianceOS Local Engine Fallback)*\n\n${getLocalSimulationResponse(userPrompt, companyContext)}`,
        simulated: true,
      });
    }
  });

  // API Route: Simulated Document Scanner / Parser for UAE compliance audit
  app.post("/api/compliance/analyze-document", async (req, res) => {
    const { docName, docType } = req.body;
    
    // Simulate real visual analysis delay and detailed response
    setTimeout(() => {
      const auditResult = generateDocumentAnalysis(docName || "Uploaded Document", docType || "License");
      res.json(auditResult);
    }, 1200);
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ComplianceOS server started on http://0.0.0.0:${PORT}`);
  });
}

// Highly comprehensive local search database for UAE SMEs to support outstanding full product simulator
function getLocalSimulationResponse(prompt: string, context: any = {}): string {
  const q = prompt.toLowerCase();
  
  if (q.includes("corporate tax") || q.includes("tax filing") || q.includes("relief")) {
    return `### UAE Corporate Tax Analysis for SMEs (Decree-Law No. 47 of 2022)

Based on UAE Federal Tax Authority (FTA) laws, here is the current guidelines on Corporate Tax relevant to your company:

1. **Tax Rates**:
   - **0%** on taxable income up to **AED 375,000** annually.
   - **9%** on taxable income exceeding **AED 375,000**.

2. **Small Business Relief (SBR)**:
   - Available to resident businesses with revenue up to **AED 3,000,000** in a tax period.
   - If SBR is elected, the business is treated as having **zero taxable income**.
   - **Important**: Tax registration and completing annual declarations are still strictly mandatory, even if SBR is claimed. This relief is currently valid for tax periods ending on or before **December 31, 2026**.

3. **Deadlines**:
   - Tax filing and payments must be completed with the FTA no later than **9 months** after the close of the corresponding Financial Year (e.g., if ending Dec 31, 2025, due by Sept 30, 2026).
   
4. **Action Required**: Your current financial records should be structured to clearly distinguish between standard trading revenue and taxable profits. Our ComplianceOS team advises registering on the EmaraTax portal immediately to obtain your Tax Registration Number (TRN) to avoid a **AED 10,000 fine** for late registration.`;
  }

  if (q.includes("vat") || q.includes("tax registration") || q.includes("quarterly")) {
    return `### UAE Value Added Tax (VAT) Operating Checklist

SMEs operating in Dubai and the wider UAE must adhere to Decree-Law No. 8 of 2017:

1. **Threshold Guidelines**:
   - **Mandatory Registration**: Revenue exceeding **AED 375,000** over the past 12 months or anticipated in the next 30 days.
   - **Voluntary Registration**: Revenue exceeding **AED 187,500**.
   - **No Registration Requirement**: Revenue below AED 187,500.

2. **Filing Windows**:
   - Tax periods are designated by the FTA (usually quarterly or monthly based on size).
   - Filings are due strictly on the **28th day** of the month following the end of the tax period.

3. **Invoicing Requirements**:
   - To claim input tax credits, invoices must explicitly state "Tax Invoice," itemize the 5% VAT portion separately, and include both your business and client TRNs (if registered).
   
ComplianceOS tracks your revenue automatically and will notify you when you are within **AED 25,000** of the mandatory VAT registration threshold.`;
  }

  if (q.includes("visa") || q.includes("employee") || q.includes("work permit") || q.includes("mohre")) {
    return `### UAE Visa & MoHRE (Labour Law) Guidance

Managing visas and staying compliant with the Ministry of Human Resources and Emiratisation (MoHRE) involves several critical items:

1. **Wage Protection System (WPS)**:
   - Mandatory for all mainland companies and select free zones.
   - At least **90%** of your workforce must be paid their designated contractual salaries via WPS monthly to avoid system blocks, bank fines, or work permit bans.

2. **Emiratisation Rules**:
   - SMEs with **20 to 49 employees** in 14 specific economic activities must hire at least one (1) UAE national in 2024 and another in 2025.
   - Non-compliant entities face custom financial contributions starting at **AED 96,000** per unhired national.

3. **Health Insurance**:
   - Strictly mandatory for all sponsor holders in Dubai (DHA) and Abu Dhabi (DOH).
   - Minimum Essential Benefit (MEB) plans must be active. Lapses carry fines of **AED 500 per month per employee**.

4. **Visa Renewal Cycles**:
   - Investor visas are typically valid for **2 years (Mainland)** or **5-10 years (Golden Visa)**.
   - Employment visas are typically valid for **2 years**.
   - Medical fitness tests and Emirates ID biometrics are mandatory for every cycle.`;
  }

  if (q.includes("trade license") || q.includes("ded") || q.includes("renewal")) {
    return `### UAE Trade License Renewal Protocol

To maintain operations legally and protect your corporate liability, please adhere to:

1. **DED / Free Zone Renewal Steps**:
   - Renew your Trade License **annually** before the written expiration date.
   - Requires a valid tenancy contract (registered under Ejari for Mainland Dubai, or Tawtheeq for Abu Dhabi).
   - Some jurisdictions offer "instant" or "virtual office" licenses for tech components, but traditional trading requires real commercial space.

2. **Penalty Scales**:
   - Operating on an expired license triggers a fine of **AED 2,000-5,000** plus **AED 200 per month** of lapse.
   - Continued expiration blocks bank accounts, freezes customs codes, and leads to blacklisting on government systems.

3. **Recommendations**:
   - ComplianceOS checks DED platforms quarterly, calculates lease expiries, and alerts you 60 days in advance to request lease renewals first.`;
  }

  if (q.includes("emiratisation") || q.includes("fine") || q.includes("penalty")) {
    return `### Emiratisation & Regulatory Penalties Summary

The UAE Ministry of Human Resources and Emiratisation (MoHRE) has strict guidelines regarding national workforce inclusion:

1. **Emiratisation Target**:
   - Private sector companies with **50 or more employees** must grow their skilled Emirati workforce by **2% annually** (1% semi-annually).
   - SMEs with **20 to 49 employees** in designated sectors must hire **at least 1 Emirati** by the target date (failing this results in an annual financial contribution of **AED 96,000**).

2. **Fraudulent Emiratisation Warning**:
   - Assigning fictitious tasks or hiring family members only for quota fulfillment can lead to immediate prosecution and fines of **AED 20,000 to AED 100,000 per employee**, plus immediate visual de-registration.

3. **WPS Penalties**:
   - Failing to pay salaries through WPS for over 15 days from due date starts a warning phase, culminating in a freezing of work permit applications on day 30.`;
  }

  return `### ComplianceOS UAE Advisory Response

Thank you for your inquiry about SME compliance in the United Arab Emirates. I can assist you with specific operational metrics:

- **Corporate Tax**: Thresholds (0% up to AED 375k, 9% above), registration cycles, and Small Business Relief.
- **Value Added Tax (VAT)**: Threshold calculations, invoicing protocols, and quarterly returns.
- **Licensing & Jurisdictions**: Dubai Mainland DED requirements, Freezone rules, Ejari registrations, and renewals.
- **Employee Safety & HR**: Wage Protection System (WPS) setup, MoHRE work contracts, and mandatory DHA health insurance.

What specific compliance workflow or deadline can I help clarify for you today?`;
}

function generateDocumentAnalysis(docName: string, docType: string): any {
  const normalized = docName.toLowerCase();
  
  if (normalized.includes("license") || docType === "License") {
    return {
      status: "action_required",
      title: "Trade License Audit Result",
      documentName: docName,
      extractedData: {
        licenseNumber: "DED-847291-EXP",
        companyName: "ABC TRADING LLC",
        licenseType: "Commercial License",
        expiryDate: "2026-07-15",
        daysRemaining: 30,
        regulatingAuthority: "Department of Economy and Tourism (DET), Dubai",
        ejariAttached: "Yes (Expiring 2026-07-14)"
      },
      auditIssues: [
        {
          severity: "high",
          message: "Tenancy lease under Ejari expires in 29 days. Trade license cannot be renewed until Ejari is uploaded first.",
          remedy: "Request renewed Ejari contract from landlord and upload into ComplianceOS."
        },
        {
          severity: "medium",
          message: "Ultimate Beneficial Owner (UBO) register is outdated. An update is required because owner details changed in October.",
          remedy: "Go to Company Profile > Shareholders & UBO to update information for DET filing."
        }
      ],
      score: 72,
      recommendation: "RequestEjari renewal today. Renewal fee estimation for DET DET-847291-EXP: AED 8,450."
    };
  }

  if (normalized.includes("tax") || docType === "Tax") {
    return {
      status: "compliant",
      title: "Corporate Tax Registration Verification",
      documentName: docName,
      extractedData: {
        trnNumber: "100293184729003",
        companyName: "ABC TRADING LLC",
        taxPeriodStart: "2025-01-01",
        taxPeriodEnd: "2025-12-31",
        registrationDate: "2024-11-20",
        reliefEligible: "Small Business Relief Eligible (Revenue < AED 3M)"
      },
      auditIssues: [],
      score: 100,
      recommendation: "TRN is officially active and valid on EmaraTax. Your financial year ends December 31, 2025. Filing is due September 30, 2026. Keep transactions updated."
    };
  }

  // HR document
  return {
    status: "compliant",
    title: "Labour Contract Alignment Audit",
    documentName: docName,
    extractedData: {
      employeeName: "Siddharth Kumar",
      jobTitle: "Senior Logistics Coordinator",
      salary: "AED 12,500 / Month",
      wpsConfigured: "Yes (Code: IBAN-9204)",
      visaCategory: "Employment Visa (Category 2)"
    },
    auditIssues: [
      {
        severity: "low",
        message: "Mandatory DHA basic health insurance card has not been digitized but status verified active.",
        remedy: "Optional: Upload Siddharth's DHA insurance card visual to complete the employee directory profile."
      }
    ],
    score: 95,
    recommendation: "Ensure wage payment matches exactly AED 12,500 on the upcoming 28th to prevent WPS warning flag."
  };
}

startServer();
