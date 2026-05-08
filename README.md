# Auto-Math-Review-Pipeline

An enterprise-grade automated pipeline that leverages Large Language Models (LLMs) and Google Apps Script to audit Mathematics educational materials against the Vietnam 2018 General Education Curriculum (GDPT 2018).

## 🚀 Usage & Demo

### 1. Input: Segmented JSON Data
Paste the raw JSON output from the LLM into Column A of the Google Sheet. The system supports batch processing for up to 10 files simultaneously.
![Input JSON in Google Sheets](<img width="1907" height="855" alt="Image" src="https://github.com/user-attachments/assets/c6c9f4f1-433f-4a68-bd8a-66598e61011f" />)

### 2. Output: Automated Report Links
The Google Apps Script triggers automatically, parsing the JSON and generating clean, professional Google Docs report links in Column B.
![Processed Result Links](https://your-image-link-here.com/output-screenshot.png)

### 3. Full Pipeline Video Demo
Watch the end-to-end process from prompt execution to document generation.
[![Video Demo](https://img.shields.io/badge/YouTube-Watch%20Demo-red?style=for-the-badge&logo=youtube)](https://your-video-link-here.com)

## ✨ Key Features
* **Automated Compliance Check:** Validates math concepts against the 120-page GDPT 2018 framework.
* **Reverse Burden of Proof:** Forces the AI to justify every question with curriculum references.
* **Batch Processing:** Uses `===CUT_HERE===` tokens to handle multiple documents in one run.
* **Professional Formatting:** Auto-generates structured tables and pedagogical advice in Google Docs.

## 🛠️ System Architecture
1. **Ingestion:** LLM processes documents using `Master_Prompt.md`.
2. **Segmentation:** Structured JSON is generated for each file.
3. **Automation:** `Code.gs` parses the data and handles document creation and sharing permissions.

## 📂 Repository Structure
* `Code.gs`: Core automation engine (Google Apps Script).
* `Master_Prompt.md`: Highly-constrained prompt for educational audit.

---
*Developed for Digital Transformation in Education.*
