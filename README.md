# Quinex - AI-Powered Real Estate Platform

A comprehensive real estate management platform powered by AI, designed for US markets with multi-currency support, intelligent property valuation, lead scoring, and automated workflows.

## 🚀 Features

### Core Features
- **AI Property Valuation** - Powered by Google Gemini AI with 95% accuracy
- **Smart Lead Scoring** - ML-based lead qualification and prioritization
- **Property-Client Matchmaking** - Intelligent matching algorithm
- **Market Analytics** - Real-time trends and forecasting
- **Document Automation** - Generate contracts, valuations, and reports
- **Multi-Currency Support** - USD, EUR, GBP, and more
- **Global Markets** - Optimized for US real estate markets

### AI & Automation
- **Gemini AI Integration** - Advanced property analysis and insights
- **Automated Lead Scoring** - Predictive lead quality assessment
- **Smart Campaigns** - AI-powered marketing automation
- **Document Generation** - Auto-create legal documents by country
- **Market Predictions** - AI-driven market trend analysis
- **Image Management** - Cloudinary integration for property images

### User Management
- **Team Collaboration** - Multi-user support with role-based permissions
- **Client Portal** - Dedicated portal for property buyers
- **CRM Integration** - Complete customer relationship management
- **Communication Hub** - Integrated messaging and notifications

## 🛠 Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI, Framer Motion
- **State Management**: Zustand
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **AI Integration**: Google Gemini AI
- **Image Storage**: Cloudinary
- **Charts**: Recharts
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/quinex.git
cd quinex
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
CLOUDINARY_URL=cloudinary://your_cloudinary_credentials
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🌍 Market Support

Quinex supports multiple US markets:

- **East Coast**: New York, Boston, Miami
- **West Coast**: Los Angeles, San Francisco, Seattle
- **Central**: Chicago, Denver, Austin
- **Other**: Atlanta, Phoenix, Dallas

Each market includes:
- Local currency support (USD)
- Regional pricing models
- Market-specific legal documents
- Localized property types and amenities

## 🤖 AI Features

### Property Valuation
- Powered by Google Gemini AI
- Considers location, size, amenities, market conditions
- Provides confidence scores and comparable properties
- Market insights and predictions

### Lead Scoring
- Analyzes budget, preferences, urgency, and behavior
- Provides actionable recommendations
- Prioritizes high-value prospects
- Automated follow-up suggestions

### Market Analytics
- Real-time price trends
- Demand/supply analysis
- Investment opportunities
- Regional market comparisons

## 🖼️ Image Management

### Cloudinary Integration
- Secure image uploads directly to Cloudinary
- Multiple image uploads with progress tracking
- Image optimization and transformation
- Responsive image delivery

### Features
- Drag and drop interface
- Preview before upload
- Image management and organization
- Automatic image optimization

## 📊 Database Schema

### Core Models
- **Users** - Authentication and settings
- **Properties** - Property listings and details
- **Leads** - Customer information and preferences
- **Documents** - Generated files and reports
- **TeamMembers** - Team collaboration
- **Contacts** - Contact form submissions
- **NewsletterSubscribers** - Email marketing

### Features
- MongoDB with proper indexing
- Data validation and sanitization
- Audit trails and timestamps
- Soft deletes for data integrity

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Environment variable protection
- SQL injection prevention

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

### Docker
```bash
docker build -t quinex .
docker run -p 3000:3000 quinex
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property
- `POST /api/properties/[id]/images` - Add images to property

### Leads
- `GET /api/leads` - List leads
- `POST /api/leads` - Create lead
- `PUT /api/leads/[id]` - Update lead
- `DELETE /api/leads/[id]` - Delete lead

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

## 🎨 Customization

### Themes
- Light/Dark mode support
- Custom color schemes
- Responsive design
- Accessibility compliant

### Localization
- Multi-language support
- Currency formatting
- Date/time localization
- Regional preferences

## 📈 Analytics

- Property performance tracking
- Lead conversion metrics
- Market trend analysis
- User engagement insights
- Revenue tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.quinex.ai](https://docs.quinex.ai)
- **Email**: support@quinex.ai
- **Discord**: [Join our community](https://discord.gg/quinex)

## 🙏 Acknowledgments

- Google Gemini AI for advanced AI capabilities
- Cloudinary for image management
- Shadcn/ui for beautiful UI components
- Vercel for seamless deployment
- MongoDB for reliable data storage
- Framer Motion for smooth animations

---

**Quinex** - Revolutionizing real estate with AI-powered automation and market intelligence.