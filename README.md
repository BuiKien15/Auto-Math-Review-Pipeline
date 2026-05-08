# Auto-Math-Review-Pipeline

An enterprise-grade automated pipeline that leverages Large Language Models (LLMs) and Google Apps Script to audit Mathematics educational materials against the Vietnam 2018 General Education Curriculum (GDPT 2018).

## 📌 Overview
This project automates the rigorous process of reviewing math exams, lesson plans, and exercise sheets. It cross-references content with official curriculum standards to ensure pedagogical accuracy and logical consistency.

## 🚀 Demo
### System Workflow Demo
![System Workflow Interface](https://your-image-link-here.com/workflow.png)

### Automated Report Output
![Generated Google Doc Report](https://your-image-link-here.com/report-sample.png)

> **Video Demonstration:** [Watch the full pipeline in action here](https://your-video-link-here.com)

## ✨ Key Features
* **Automated Compliance Check:** Validates every mathematical concept against the "Required Achievement" (Yêu cầu cần đạt) columns in the 120-page GDPT 2018 framework.
* **Reverse Burden of Proof Logic:** Forces the AI to justify the validity of every question by locating specific curriculum references, minimizing hallucinations.
* **Exhaustive Pedagogical Audit:** Detects formatting and standard errors (e.g., unsorted MCQ options, improper decimal separators per Vietnamese standards, missing variable domains).
* **High-Throughput Batch Processing:** Handles up to 10 documents simultaneously with strict JSON output segmentation (`===CUT_HERE===`).
* **End-to-End Automation:** Seamlessly transitions from AI-generated raw data to professionally formatted Google Docs via Google Apps Script.

## 🛠️ System Architecture
1.  **Ingestion:** User uploads multiple Math documents and reference files (GDPT 2018 Framework/Textbooks).
2.  **Analysis:** The LLM (Gemini Pro/GPT-4) executes the `Master_Prompt.md` using a file-filtering algorithm to ignore reference materials and focus on test files.
3.  **Data Extraction:** The system outputs structured JSON blocks for each document.
4.  **Generation:** `Code.gs` (Google Apps Script) triggers, parses the JSON, and generates individual, shared Google Docs reports.

## 📂 Repository Structure
* `Code.gs`: The core engine for JSON parsing and Google Docs generation.
* `Master_Prompt.md`: The highly-constrained, multi-stage prompt for the LLM.

## ⚙️ Setup Instructions
1.  **Google Sheets:** Create a new sheet and open the Script Editor (*Extensions > Apps Script*).
2.  **Deploy Code:** Copy the contents of `Code.gs` into the editor.
3.  **LLM Configuration:** Use the provided `Master_Prompt.md` in your LLM interface (Gemini/ChatGPT).
4.  **Run:** Paste the AI's output into Column A of your sheet to trigger the automatic report generation.

## ⚠️ Disclaimer
This tool is designed to assist professional reviewers. While highly accurate, all AI-generated reports should undergo a final human-in-the-loop (HITL) verification before official publication.

---
*Developed for Digital Transformation in Education.*
