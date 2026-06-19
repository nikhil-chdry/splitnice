# Splitnice

Splitnice is a modern shared-expense management application designed to make splitting bills, tracking balances, managing groups, and settling payments simple and comfortable.

The project is inspired by expense-sharing applications such as Splitwise, while introducing its own visual identity, group-approval workflow, built-in calculator, automatic expense categories, and reminder system.

> Splitnice is currently under active development. The present version is a frontend prototype using temporary local data.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Current Status](#current-status)
- [Implemented Features](#implemented-features)
- [Application Sections](#application-sections)
- [Add Expense Workflow](#add-expense-workflow)
- [Expense Calculator](#expense-calculator)
- [Automatic Categories](#automatic-categories)
- [Expense Splitting](#expense-splitting)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Design System](#design-system)
- [Current Data Flow](#current-data-flow)
- [Known Limitations](#known-limitations)
- [Planned Features](#planned-features)
- [Future Backend Architecture](#future-backend-architecture)
- [Development Roadmap](#development-roadmap)

---

## Project Overview

Managing shared expenses can become complicated when friends, roommates, couples, or travel groups repeatedly pay for one another.

Splitnice aims to provide a clear place where users can:

- Create expense groups
- Request permission to join groups
- Approve or reject new group members
- Add shared expenses
- Select who paid
- Choose who participated
- Split expenses using different methods
- Track who owes whom
- Record settlements
- Send payment reminders
- Review recent activity
- Calculate amounts directly inside the expense form

The final application will contain both a public landing page and a logged-in expense-management application.

---

## Current Status

The current version is a frontend prototype.

It includes:

- A responsive dashboard
- Summary balance cards
- Quick-action buttons
- Recent activity
- Group cards
- Individual friend balances
- A settlement call-to-action
- An interactive Add Expense modal
- A built-in calculator
- Automatic category detection
- Equal expense splitting
- Exact-amount splitting

The application currently uses sample data and React state. Data is not yet saved to a database and will disappear when the browser is refreshed.

---

## Implemented Features

### Responsive navigation

The sticky navigation bar provides links to:

- Dashboard
- Groups
- Activity
- People
- Profile
- New Expense

The navigation uses a translucent background and backdrop blur to remain visible while scrolling.

### Dashboard summary

The dashboard displays sample financial information including:

- Total balance
- Amount the user owes
- Amount owed to the user
- Number of involved people
- Settle Up action

### Quick actions

The dashboard includes buttons for:

- Adding an expense
- Creating a group
- Scanning a receipt

Some quick actions are currently visual placeholders and will become functional in later phases.

### Recent activity

Recent Activity displays:

- Expense category icon
- Expense description
- Group name
- Payer information
- Date and time
- Balance status

The activity container has a maximum height and becomes internally scrollable when many expenses are added.

Newly submitted expenses are placed at the top of the activity list without refreshing the page.

### Groups

The group section currently displays sample groups such as:

- Goa Trip
- Flatmates
- Weekend Plans

Each card includes:

- Group icon
- Group name
- Number of members
- Number of expenses
- Current user balance

### People and balances

The People section displays individual balances between the current user and their friends.

Possible states include:

- Owes you
- You owe
- Settled up

It also includes placeholder actions such as:

- Remind
- Settle
- View

### Settlement section

The settlement call-to-action summarizes the user’s outstanding balance and provides a future entry point for recording payments.

---

## Application Sections

The current single-page dashboard follows this order:

```text
Navigation
│
├── Dashboard hero
│   ├── Balance summary
│   └── Quick actions
│
├── Recent activity
│
├── Your groups
│
├── Friends and balances
│
├── Settle Up section
│
└── Add Expense modal
```

Smooth anchor scrolling is used to navigate between the major sections.

---

## Add Expense Workflow

The Add Expense modal currently allows users to:

1. Enter an expense description
2. Automatically detect an expense category
3. Enter the total amount
4. Open the built-in calculator
5. Select a group
6. Select who paid
7. Select a splitting method
8. Select participating members
9. Review calculated shares
10. Save the expense

After an expense is saved:

- The modal closes
- Form values are cleared
- Exact split values are cleared
- The category icon is retained in the activity
- The new expense appears at the beginning of Recent Activity

The modal can be closed using:

- The close button
- Clicking outside the modal
- Successfully saving an expense

---

## Expense Calculator

The Add Expense modal contains a collapsible calculator.

Supported operations include:

- Addition
- Subtraction
- Multiplication
- Division
- Percentage calculation
- Decimal values
- Delete last digit
- Clear calculation

The calculated result can be transferred directly into the Amount field using the **Use result** button.

The Amount input uses a decimal text input instead of a native number field. This prevents the value from changing accidentally when the user scrolls the mouse wheel.

---

## Automatic Categories

Splitnice detects an expense category by examining words in the description.

Examples:

| Description | Detected category | Icon |
|---|---|---|
| Dinner | Food | 🍽️ |
| Drinks | Drinks | 🥤 |
| Coffee | Drinks | 🥤 |
| Taxi | Transport | 🚕 |
| Petrol | Transport | 🚕 |
| Rent | Home | 🏠 |
| Internet | Home | 🏠 |
| Flight | Travel | ✈️ |
| Hotel | Travel | ✈️ |
| Shopping | Shopping | 🛍️ |
| Movie | Entertainment | 🎬 |
| Unknown description | General | 🧾 |

Category matching is currently performed through a frontend keyword map.

A later version may use a backend classification system or AI-powered categorization.

---

## Expense Splitting

### Equal split

The Equal split method allows users to:

- View members belonging to the selected group
- Include or exclude individual members
- See the amount per person update instantly
- Prevent saving when no members are selected

Example:

```text
Expense: ₹1,200
Selected members: 4
Amount per person: ₹300
```

### Exact amounts

The Exact split method allows users to enter a specific amount for each selected member.

The interface displays:

- Total amount entered
- Remaining amount
- Excess amount
- Fully allocated state

The expense can only be saved when the exact shares equal the total expense.

Example:

```text
Expense total: ₹1,000

Nikhil: ₹400
Priya:  ₹350
Arjun:  ₹250

Total allocated: ₹1,000
Status: Fully allocated
```

### Percentage split

The Percentage option is visible in the interface but has not been implemented yet.

It will eventually require all member percentages to total exactly 100%.

### Shares split

The Shares option is visible but has not been implemented yet.

It will allow proportional splits such as:

```text
Nikhil: 2 shares
Priya:  1 share
Arjun:  1 share
```

---

## Technology Stack

### Frontend

- React
- JavaScript
- JSX
- Tailwind CSS
- Vite
- HTML5
- CSS3

### Planned backend

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Secure cookie or token-based authentication
- Email notification service
- Scheduled background jobs

The backend technology may be adjusted as development progresses.

---

## Project Structure

```text
splitnice/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AddExpenseModal.jsx
│   │   │   ├── DashboardHero.jsx
│   │   │   ├── ExpenseCalculator.jsx
│   │   │   ├── GroupsSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PeopleSection.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   └── SettleUpSection.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── getExpenseCategory.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

The structure will expand when routing, authentication, backend services, tests, and database functionality are introduced.

---

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git

Confirm that Node.js and npm are available:

```bash
node -v
npm -v
```

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/splitnice.git
```

Replace `YOUR_USERNAME` with the repository owner’s GitHub username.

### Enter the frontend folder

```bash
cd splitnice/frontend
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will display a local URL similar to:

```text
http://localhost:5173
```

Open that address in a browser.

### Run from the repository root

Alternatively, run:

```bash
npm --prefix frontend run dev
```

---

## Available Commands

Run these commands inside the `frontend` folder.

### Development server

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Production build

```bash
npm run build
```

Creates an optimized production build.

### Preview production build

```bash
npm run preview
```

Runs the production build locally for verification.

### Lint the project

```bash
npm run lint
```

Checks the code for common errors and style problems.

---

## Design System

Splitnice uses a finance-focused visual system with generous spacing and editorial typography.

### Primary colors

| Purpose | Color |
|---|---|
| Cream background | `#f4f2eb` |
| Main ink | `#102a2a` |
| Brand green | `#123f3a` |
| Accent lime | `#c8f45d` |
| Positive balance | `#198754` |
| Negative balance | `#d9534f` |

### Design principles

- Clear financial information
- Large balance typography
- Generous whitespace
- Rounded cards and controls
- Minimal navigation
- Strong visual hierarchy
- Smooth scrolling
- Responsive layouts
- Restrained animations
- Green for positive balances
- Red for debts

The visual direction is inspired by premium editorial websites, but all Splitnice branding, financial layouts, content, and functionality are original to the project.

---

## Current Data Flow

At present, expense data is managed inside React state.

```text
Add Expense form
        │
        ▼
Form validation
        │
        ▼
Create expense object
        │
        ▼
Update App component state
        │
        ▼
Recent Activity re-renders
```

This provides an interactive frontend experience without requiring a backend.

Because the data only exists in memory:

- Refreshing the page removes newly added expenses
- Expenses are not shared between devices
- Users cannot log in
- Groups are not persistent
- Notifications cannot be sent

These limitations will be resolved after the backend and database are introduced.

---

## Known Limitations

The current prototype does not yet provide:

- User registration
- User authentication
- Persistent database storage
- Real group creation
- Group join requests
- Leader approval
- Real friend management
- Percentage splits
- Share-based splits
- Multiple payers
- Recurring expenses
- Receipt uploads
- Receipt scanning
- Currency conversion
- Real payment processing
- Email reminders
- Push notifications
- Real-time collaboration
- Search or filtering
- Editing existing expenses
- Deleting existing expenses

Buttons connected to these future features may currently act as visual placeholders.

---

## Planned Features

### Authentication

- Create account
- Log in and log out
- Forgot password
- Profile management
- Preferred currency
- Profile photo

### Group permissions

- Create private groups
- Generate invitation links or codes
- Request to join a group
- Approve or reject requests
- Assign group leaders and administrators
- Remove members
- Transfer group ownership

### Expense management

- Equal splits
- Exact splits
- Percentage splits
- Share-based splits
- Multiple payers
- Edit expenses
- Delete expenses
- Attach notes
- Upload receipts
- Add expense dates
- Support recurring expenses

### Balances and settlements

- Calculate who owes whom
- Simplify group debts
- Record full settlements
- Record partial settlements
- Maintain payment history
- Confirm received payments

### Reminders

- Manual reminder button
- In-app notifications
- Email reminders
- Scheduled automatic reminders
- Reminder preferences
- Reminder history
- Anti-spam protections
- Stop reminders after settlement

### Reporting

- Group spending summaries
- Personal spending summaries
- Category charts
- Date filters
- Search
- Export statements
- Downloadable reports

---

## Future Backend Architecture

The planned backend will likely contain these primary entities:

```text
User
Group
GroupMember
JoinRequest
Expense
ExpenseParticipant
Settlement
Payment
Reminder
Notification
Activity
```

Expected relationships:

```text
Group
├── Leader
├── Administrators
├── Approved members
├── Pending join requests
├── Expenses
└── Settlements

Expense
├── Group
├── Creator
├── Payer
├── Participants
├── Category
├── Splitting method
└── Individual shares
```

Financial amounts should be stored in the smallest currency unit.

For Indian rupees:

```text
₹10.50 → 1050 paise
```

This avoids floating-point rounding problems in financial calculations.

---

## Development Roadmap

### Phase 1 — Frontend foundation

- [x] Create React application
- [x] Configure Tailwind CSS
- [x] Create design system
- [x] Build responsive navigation
- [x] Build dashboard hero

### Phase 2 — Dashboard sections

- [x] Add balance cards
- [x] Add quick actions
- [x] Add Recent Activity
- [x] Add Groups section
- [x] Add People section
- [x] Add Settle Up section

### Phase 3 — Add Expense workflow

- [x] Build Add Expense modal
- [x] Add controlled amount input
- [x] Add built-in calculator
- [x] Add automatic category detection
- [x] Add expenses to Recent Activity
- [x] Implement equal splitting
- [x] Implement exact splitting
- [ ] Implement percentage splitting
- [ ] Implement share-based splitting
- [ ] Support multiple payers
- [ ] Add complete expense validation

### Phase 4 — Frontend application behavior

- [ ] Add routing
- [ ] Create group details view
- [ ] Create profile view
- [ ] Add group creation modal
- [ ] Add join-request interface
- [ ] Add leader approval interface
- [ ] Add notification center
- [ ] Add settlement modal
- [ ] Add editing and deletion

### Phase 5 — Backend and database

- [ ] Create backend project
- [ ] Configure PostgreSQL
- [ ] Design database schema
- [ ] Add authentication
- [ ] Add group APIs
- [ ] Add expense APIs
- [ ] Add settlement APIs
- [ ] Add permission checks
- [ ] Connect frontend to backend

### Phase 6 — Notifications and reminders

- [ ] Add manual reminders
- [ ] Add email service
- [ ] Add scheduled reminder jobs
- [ ] Add in-app notifications
- [ ] Add reminder preferences

### Phase 7 — Advanced functionality

- [ ] Receipt uploads
- [ ] Receipt scanning
- [ ] Multiple currencies
- [ ] Recurring expenses
- [ ] Real-time group updates
- [ ] Reports and exports
- [ ] Payment-provider integration

### Phase 8 — Testing and deployment

- [ ] Unit tests
- [ ] Expense calculation tests
- [ ] Component tests
- [ ] Accessibility testing
- [ ] Mobile testing
- [ ] Security testing
- [ ] Production deployment
- [ ] Error monitoring
- [ ] Database backups

---

## Contributing

Splitnice is currently an early-stage personal project.

Before contributing:

1. Fork the repository
2. Create a feature branch
3. Make focused changes
4. Test the application
5. Commit with a clear message
6. Open a pull request

Example:

```bash
git checkout -b feature/percentage-split
git add .
git commit -m "Implement percentage expense splitting"
git push origin feature/percentage-split
```

---

## Disclaimer

Splitnice currently records and displays expense information only.

It does not process real payments, hold money, provide banking services, or offer financial advice.

Real payment-provider integration will only be considered after proper authentication, security controls, data protection, and compliance requirements are implemented.

---

## License

A license has not yet been selected for this project.

All rights are reserved until a license file is added.

---

## Project Vision

Splitnice should make shared expenses feel clear rather than uncomfortable.

The long-term goal is to create an application where users can confidently answer:

- What did we spend?
- Who paid?
- Who participated?
- Who owes money?
- Has the payment been completed?
- Does someone need a reminder?

The experience should remain simple, transparent, and—most importantly—nice.