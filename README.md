# LASIAMA - Lagos State Asset Management Platform

A comprehensive web application for managing Lagos State Infrastructure and Asset Management Ministry's properties, maintenance, and issues.

## 🏗️ Features

### Core Functionality
- **Asset Management**: Complete property tracking with detailed information (doors, windows, utilities, conditions)
- **Interactive Map**: View all assets on an interactive map with filtering capabilities
- **Issue Reporting**: Tenants can report issues with status tracking and resolution management
- **Maintenance Management**: Schedule and track preventive, corrective, and emergency maintenance
- **User Management**: Role-based access control (Super Admin, Admin, Manager, Officer, Tenant)
- **Document Management**: Upload and manage property documents and certificates
- **Analytics & Reporting**: Comprehensive dashboards with performance metrics and custom reports

### Advanced Features
- **Asset Valuation Tracking**: Historical valuation records and market value tracking
- **Activity Logging**: Complete audit trail of all system activities
- **Real-time Notifications**: Status updates and alerts for critical issues
- **Mobile Responsive**: Optimized for all device sizes
- **Progressive Web App (PWA)**: Offline capabilities and mobile app-like experience

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: NextAuth.js with role-based access
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Charts**: Recharts (ready for integration)
- **Maps**: Leaflet (ready for integration)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lasiama-asset-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lasiama_assets"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: File Upload
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Optional: Email Notifications
EMAIL_SERVER_HOST=""
EMAIL_SERVER_PORT=""
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM=""

# Optional: Enhanced Maps
GOOGLE_MAPS_API_KEY=""
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database with demo data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 👥 Demo Accounts

The application comes with pre-configured demo accounts for testing:

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| Super Admin | admin@lasiama.lg.ng | admin123 | Full system access |
| Manager | manager@lasiama.lg.ng | manager123 | Asset and maintenance management |
| Officer | officer@lasiama.lg.ng | officer123 | Field operations and issue handling |
| Tenant | tenant@example.com | tenant123 | Issue reporting and basic access |

## 📱 Application Structure

### Dashboard Sections
1. **Overview**: Key metrics, recent activities, and quick actions
2. **Assets**: Comprehensive asset management with detailed property tracking
3. **Map View**: Interactive map showing all asset locations
4. **Issues**: Issue reporting, tracking, and resolution management
5. **Maintenance**: Preventive and corrective maintenance scheduling
6. **Reports**: Analytics, performance metrics, and custom report generation
7. **Users**: User management and role assignment (Admin only)

### Asset Details Tracked
- Basic information (name, type, address, status)
- Location data (coordinates, ward, LGA)
- Building specifications (floors, rooms, offices)
- Infrastructure details (doors, windows, fixtures)
- Utilities (electricity, water, gas, internet, security)
- Condition assessments (roof, walls, floors, plumbing, electrical)
- Financial information (acquisition cost, current value, valuation history)

## 🔒 Security Features

- Role-based access control with 5 user levels
- Secure authentication with NextAuth.js
- Data validation and sanitization
- Activity logging for audit trails
- Session management and security

## 📊 Database Schema

The application uses a comprehensive database schema with the following main entities:
- Users (with role-based permissions)
- Assets (with detailed property information)
- Issues (with status tracking and assignment)
- Maintenance Records (with scheduling and completion tracking)
- Documents (with categorization and file management)
- Valuation History (for asset value tracking)
- Activity Logs (for audit trails)

## 🎨 UI/UX Features

- Clean, modern interface with Lagos State branding
- Responsive design for all devices
- Intuitive navigation with role-appropriate menus
- Real-time status indicators and notifications
- Comprehensive filtering and search capabilities
- Interactive dashboards with visual analytics

## 🔧 Development

### Project Structure
```
lasiama-asset-management/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding
├── src/
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   │   ├── dashboard/        # Dashboard components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utility functions and configurations
│   └── types/               # TypeScript type definitions
└── public/                  # Static assets
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database admin interface
- `npx prisma db seed` - Seed database with demo data

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly configured for your production environment, especially:
- `DATABASE_URL` pointing to your production database
- `NEXTAUTH_SECRET` with a secure random string
- `NEXTAUTH_URL` with your production domain

## 📈 Future Enhancements

- Real-time chat system for issue communication
- Mobile app using React Native
- Advanced analytics with AI-powered insights
- Integration with IoT sensors for real-time monitoring
- Automated maintenance scheduling based on asset conditions
- Integration with Lagos State GIS systems
- Multi-language support (English, Yoruba, Hausa, Igbo)
- Advanced document OCR and processing
- Integration with financial systems for cost tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@lasiama.lg.ng
- Phone: +234 (0) 1-234-5678
- Address: Lagos State Secretariat, Ikeja, Lagos

---

Built with ❤️ for Lagos State Government by the LASIAMA Development Team