# Victor Omolasoye Portfolio Architecture Map

## 📂 Project Structure Map
```text
portfolio-root/
├── public/
│   └── images/
│       └── victor-profile.jpg        <-- Existing Profile Picture Location
├── data/
│   ├── profile.json                  <-- Shared Core Global Copy Configuration
│   └── projects/                     <-- Isolated Case Study Data Folder
│       └── bunkie.json
├── src/
│   ├── context/
│   │   └── PortfolioContext.tsx      <-- Application State & Strongly-Typed Framework Context
│   ├── components/
│   │   ├── SkillBars.tsx
│   │   └── FAQAccordion.tsx
│   └── app/
│       ├── layout.tsx
│       └── page.tsx                  <-- Interactive Global Landing Page