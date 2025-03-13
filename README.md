This is a simple Currency converter App built using complete MERN stack. Here is a breif flow of the project and the technologies used to implement it:

TECHNOLOGIES:
Front-End : - React.js - for UI - JavaScript - ES6+ for dynamic UI - MUI - prebuilt customisable UI components

Back-End : - Node.js - for backend - Express.js - API endpoints - MongoDB Atlas - cloud DB - ExchangeRate API - to fetch real time exchange rates - Nodemon - automatic server restarts

Version Control : - Git - for source code management - vercel - for deployment

Here is the structure of the project :

currency-converter/
├── backend/
│ ├── controllers/
│ │ └── transferController.js // Handles API requests for transfers
│ ├── models/
│ │ └── Transfer.js // Mongoose schema for transfer records
│ ├── routes/
│ │ └── transfers.js // Defines the API routes (GET, POST, DELETE)
│ ├── utils/
│ │ └── currencyConverter.js // Utility to fetch conversion rates from ExchangeRate-API
│ ├── server.js // Main server file (sets up Express, connects to MongoDB)
│ ├── package.json // Backend dependencies and scripts
│ └── .env // Environment variables (MongoDB URI, API key; gitignored)
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── CurrencyConverterApp.js // Main container component assembling the app
│ │ │ ├── HeaderSection.js // Renders the black header with inverted arc
│ │ │ ├── ConversionCard.js // Contains from/to fields, amount input, convert button, and dynamic conversion result
│ │ │ ├── TransactionHistorySection.js // Displays the list of transfer records
│ │ │ └── DeleteConfirmationDialog.js // Modal for confirming deletion of a record
│ │ ├── utils/
│ │ │ └── helpers.js // Helper functions (numberToWords, getCurrencySymbol, getCurrencyName)
│ │ ├── App.js // Root component that renders CurrencyConverterApp
│ ├── package.json // Frontend dependencies and scripts
│ └── ...other configuration files...  
└── README.md // Project overview and run instructions

Here is a step-by-step instructions to run this project :

1. First clone the repository -
   git clone https://github.com/PrayonFernando/Currency-Converter.git
   cd currency-converter

2. Set up the back-end and start the backend -
   cd backend
   npm install

   create a .env file and add this mongoURL and the exchange rate api key to it
   MONGO_URI=<your_mongodb_atlas_connection_string>
   EXCHANGE_RATE_API_KEY=<your_exchangerate_api_key>
   PORT=5000

3. set up the fron end -
   cd frontend
   npm install
   npm start

## 🚀 Live Demo

You can test the fully deployed application here:  
🔗 **Frontend:** [https://currency-converter-seven-omega.vercel.app/](https://currency-converter-seven-omega.vercel.app/)  
🔗 **Backend API:** [https://backend-sepia-eight-78.vercel.app/api/transfers](https://backend-sepia-eight-78.vercel.app/api/transfers)

Note: If the backend API doesn't work, please wait a few seconds and try again. The backend may take a moment to start.

------------------------------------------------------------------------- THANK YOU -----------------------------------------------------------------------------------
