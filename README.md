# Dr. Senz Medical Platform

A comprehensive medical consultation platform built with React and Vite, featuring separate dashboards for doctors and patients.

## Features

### 🏠 Landing Page
- Professional hero section with Dr. Senz's credentials
- Feature highlights (video consultations, easy booking, secure records)
- Consultation pricing and options
- Patient testimonials and doctor credentials
- Call-to-action sections throughout

### 🔐 Modern Authentication System
- **Glassmorphism Login Modal** with backdrop blur and gradient overlays
- **Professional Branding** with Dr. Senz Medical logo and welcome message
- **Sign In/Sign Up Tabs** with smooth transitions
- **User Type Selection** (Doctor vs Patient) with medical icons
- **Demo Credentials Section** with easy auto-fill functionality
- **Social Login Options** (Apple & Google integration ready)
- **Modern Form Design** with floating labels and focus states
- **Responsive Design** that works on all screen sizes

### 📊 Modern Patient Dashboard
- **Professional Header** with notifications, settings, and user profile
- **Interactive Stats Cards** with trending indicators and mini charts
- **My Healthcare Team** section with doctor profiles and ratings
- **Vital Signs Monitoring** with medical-grade data visualization
- **Department Analytics** with progress bars and visual indicators
- **Recent Activity Timeline** with status indicators and timestamps
- **Payment History** with transaction status and filtering
- **Quick Actions Panel** for common medical tasks
- **Modern Cards Design** with hover effects and smooth transitions

### 👨‍⚕️ Doctor Dashboard
- Comprehensive overview with statistics and today's schedule
- Patient management with status indicators
- Integration with all existing features (consultations, patient records, appointments)
- Quick actions for common medical tasks
- Reports and analytics section

## Demo Credentials

### Doctor Login
- **Email:** doctor@drsenz.com
- **Password:** doctor123

### Patient Login
- **Email:** patient@example.com
- **Password:** patient123

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dr-senz-medical-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🌐 Port Forwarding & Public Access

### Using LocalTunnel (Recommended)

The application includes built-in port forwarding using LocalTunnel for easy public access:

#### Quick Start
```bash
# Start both development server and tunnel
npm run serve

# Or start tunnel only
npm run tunnel
```

#### Manual Setup
```bash
# Install localtunnel globally
npm install -g localtunnel

# Start tunnel for port 3000
npx localtunnel --port 3000 --subdomain dr-senz-medical
```

Your application will be available at:
- **Public URL:** `https://dr-senz-medical.loca.lt`
- **Local URL:** `http://localhost:3000`

### Alternative: Ngrok Setup

If you prefer using Ngrok:

1. Download and install Ngrok from [ngrok.com](https://ngrok.com)
2. Sign up for a free account to get your auth token
3. Connect your account:
```bash
ngrok config add-authtoken YOUR_TOKEN
```

4. Start the tunnel:
```bash
ngrok http 3000
```

5. Your public URL will be displayed (e.g., `https://abc123.ngrok.io`)

### 🚀 Quick Deployment Script

Create a deployment script for easy startup:

```bash
# Create a start script
cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Dr. Senz Medical Platform..."
echo "📡 Setting up port forwarding..."

# Start development server and tunnel in background
npm run dev &
DEV_PID=$!

# Wait a moment for dev server to start
sleep 3

# Start localtunnel
echo "🌐 Creating secure tunnel..."
npx localtunnel --port 3000 --subdomain dr-senz-medical &
TUNNEL_PID=$!

echo ""
echo "✅ Application is running!"
echo "🔗 Public URL: https://dr-senz-medical.loca.lt"
echo "🏠 Local URL: http://localhost:3000"
echo ""
echo "📱 Demo Credentials:"
echo "   Doctor: doctor@drsenz.com / doctor123"
echo "   Patient: patient@example.com / patient123"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "echo 'Stopping servers...'; kill $DEV_PID $TUNNEL_PID; exit" INT
wait
EOF

chmod +x start.sh
```

Then run with:
```bash
./start.sh
```

## 🚀 Production Deployment

### 🌟 Neon Database Hosting

#### Step 1: Set up Neon Database
1. **Create Neon Account**: Go to [console.neon.tech](https://console.neon.tech/)
2. **Create New Project**: Click "Create Project"
3. **Get Connection String**: Copy your PostgreSQL connection string
4. **Update Environment**: Add to `.env` file:
   ```env
   VITE_DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

#### Step 2: Deploy Database Schema
```bash
# Run the deployment script
npm run deploy:neon

# Or manually apply schema
psql "your_neon_connection_string" < database/schema.sql
```

#### Step 3: Deploy Application

##### **Vercel (Recommended for React)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

##### **Netlify**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

##### **Traditional Hosting**
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure server for SPA routing (redirect all routes to index.html)

### 🔧 Environment Variables

For production, set these environment variables:

```bash
# Database (Neon PostgreSQL)
VITE_DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
VITE_NEON_API_KEY=your_neon_api_key_here

# Application
VITE_APP_NAME=Dr. Senz Medical Platform
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production

# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_JWT_SECRET=your_jwt_secret_key_here

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXX
```

### Performance Optimization

The application includes:
- ✅ **Modern React 18** with concurrent features
- ✅ **Code splitting** and lazy loading
- ✅ **Optimized images** with WebP support
- ✅ **CSS optimization** with Tailwind CSS
- ✅ **Bundle optimization** with Vite
- ✅ **Error boundaries** for graceful error handling
- ✅ **Loading states** for better UX

### Security Features

- ✅ **Input validation** and sanitization
- ✅ **Error boundaries** prevent crashes
- ✅ **Secure authentication** flow
- ✅ **XSS protection** with React escaping
- ✅ **Content Security Policy** ready

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx          # Main landing page
│   ├── AuthModal.jsx            # Authentication modal
│   ├── PatientDashboard.jsx     # Patient dashboard
│   └── DoctorDashboard.jsx      # Doctor dashboard
├── contexts/
│   └── AuthContext.jsx          # Authentication context
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

## ✨ Modern UI/UX Features

### 🎨 Design System
- **Glassmorphism Effects** - Backdrop blur and transparent elements
- **Gradient Overlays** - Beautiful blue and purple gradients
- **Modern Typography** - Inter font with proper font weights
- **Smooth Animations** - CSS transitions and micro-interactions
- **Interactive Elements** - Hover effects and focus states
- **Professional Color Palette** - Medical blue theme with accessibility

### 📱 User Experience
- **Responsive Design** - Mobile-first approach with breakpoints
- **Loading States** - Professional spinners and skeleton screens
- **Error Boundaries** - Graceful error handling and recovery
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Performance Optimized** - Fast loading and smooth interactions
- **Modern Interactions** - Drag, drop, swipe, and touch gestures

### 🏥 Healthcare-Specific Features
- **Medical Icons** - Stethoscope, heart, activity monitors
- **Health Data Visualization** - Charts, graphs, and progress indicators
- **Professional Branding** - Clean, trustworthy medical aesthetic
- **Secure Authentication** - Modern login with social options
- **Patient Management** - Comprehensive health record system
- **Appointment Scheduling** - Interactive calendar and booking system

## Technologies Used

- **React 18** - Frontend framework with concurrent features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing with protected routes
- **Tailwind CSS** - Utility-first CSS framework with custom medical theme
- **Lucide React** - Modern icon library with 5000+ icons
- **Date-fns** - Comprehensive date utility library
- **Modern CSS** - Backdrop filters, gradients, and animations

## Features Overview

### Landing Page
- Responsive design with modern UI
- Professional hero section
- Feature highlights with icons
- Pricing plans
- Patient testimonials
- Contact information and demo credentials

### Authentication
- Modal-based authentication
- User type selection (Doctor/Patient)
- Demo credentials auto-fill
- Form validation
- Secure login/logout

### Patient Dashboard
- **Overview Tab:** Statistics, upcoming appointments, recent activity
- **Appointments Tab:** Schedule management, booking, history
- **Prescriptions Tab:** Medication tracking, refill requests
- **Lab Reports Tab:** Test results, file downloads
- **Profile Tab:** Personal information, account settings

### Doctor Dashboard
- **Overview Tab:** Statistics, today's schedule, quick actions
- **Patients Tab:** Patient management, search, filtering
- **Consultations Tab:** Recent consultations, active prescriptions
- **Reports Tab:** Analytics, demographics, monthly overview
- **Profile Tab:** Professional information, specializations

## Customization

The platform is designed to be easily customizable:

- Colors and branding can be modified in `tailwind.config.js`
- Component styles can be updated in `src/index.css`
- Mock data can be replaced with real API calls
- Additional features can be added to the dashboards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.
