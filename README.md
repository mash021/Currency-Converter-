# Smart Currency Converter

A sophisticated currency converter application with AI capabilities, built using Next.js and TypeScript. This application provides real-time currency conversion, AI-powered assistance, and price alerts.

## Features

- Real-time currency conversion with up-to-date rates
- AI-powered assistant based on ChatGPT for currency-related queries
- Custom price alerts for desired exchange rates
- Beautiful and responsive user interface
- Support for multiple global currencies
- Automatic rate updates
- Market status monitoring
- Historical rate charts

## Technologies

- Next.js 14
- React
- TypeScript
- Material-UI
- OpenAI API
- ExchangeRate API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API keys for ExchangeRate API and OpenAI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mash021/Currency-Converter-.git
cd Currency-Converter-
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file and set up API keys:

```
NEXT_PUBLIC_EXCHANGERATE_API_KEY=your_exchangerate_api_key_here
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
currency-converter/
├── app/
│   ├── components/
│   │   ├── AIChat.tsx          # AI Assistant component
│   │   ├── CurrencyConverter.tsx # Main converter component
│   │   ├── CurrencyRates.tsx   # Current rates display
│   │   ├── MarketStatus.tsx    # Market status indicator
│   │   └── RateAlert.tsx       # Price alert system
│   ├── services/
│   │   └── ai.ts              # AI service integration
│   └── page.tsx               # Main application page
├── types/
│   └── currency.ts           # TypeScript definitions
└── package.json
```

## Features in Detail

### Currency Conversion

- Real-time exchange rates
- Support for major world currencies
- Historical rate charts
- Quick conversion between any currency pair

### AI Assistant

- Natural language processing for currency-related queries
- Market analysis and insights
- Trading suggestions
- Currency information and details

### Price Alerts

- Set custom alerts for specific exchange rates
- Browser notifications when target rates are reached
- Multiple concurrent alerts
- Alert history tracking

### Market Status

- Real-time market status monitoring
- Trading hours information
- Market volatility indicators
- Trend analysis

## API Integration

The application uses two main APIs:

1. **ExchangeRate API**

   - Provides real-time currency exchange rates
   - Updates every 5 minutes
   - Supports multiple currency pairs

2. **OpenAI API**
   - Powers the AI assistant
   - Provides natural language understanding
   - Offers market analysis and insights

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Author

Mohammad Ali Sharifi

## Acknowledgments

- ExchangeRate-API for providing reliable currency data
- OpenAI for the powerful AI capabilities
- Material-UI team for the comprehensive component library
- Next.js team for the excellent framework
