# Head Hunter - Job Market Platform

A modern job market platform built with Next.js, TypeScript, and Tailwind CSS. Connect job seekers with employers through an intuitive and feature-rich interface.

## Features

### 🔐 Authentication & User Management

- User registration and login
- Role-based access control (User, Job Seeker, Employer)
- Protected routes and role guards
- User profile management

### 👨‍💼 Job Seeker Features

- Professional profile creation
- Job search and filtering
- Job application tracking
- Resume upload and management
- Saved jobs functionality

### 🏢 Employer Features

- Company profile management
- Job posting and management
- Candidate application review
- Interview scheduling
- Candidate search and filtering

### 🎯 Smart Matching

- AI-powered job-candidate matching
- Skill-based recommendations
- Location and experience filtering

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + Hooks
- **Authentication**: Custom JWT-based system
- **Database**: Ready for integration (MongoDB, PostgreSQL, etc.)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── dashboard/     # Main dashboard
│   │   ├── job-seeker/    # Job seeker specific routes
│   │   └── employer/      # Employer specific routes
│   ├── jobs/              # Public job listings
│   ├── companies/         # Company profiles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── shared/           # Shared utilities
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
└── store/                # State management
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd head-hunter
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Job Seekers

1. Register an account and select "Job Seeker" role
2. Complete your professional profile
3. Upload your resume
4. Browse and apply to jobs
5. Track your applications

### For Employers

1. Register an account and select "Employer" role
2. Set up your company profile
3. Post job openings
4. Review applications
5. Schedule interviews

## Role System

- **User**: Basic access, can browse jobs and companies
- **Job Seeker**: Can apply to jobs, manage profile, track applications
- **Employer**: Can post jobs, review applications, manage company profile
- **Admin/Superadmin**: Platform management (future feature)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Video interviews
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Payment integration
- [ ] Email notifications
- [ ] Social media integration

## Support

For support and questions, please open an issue in the repository or contact the development team.
