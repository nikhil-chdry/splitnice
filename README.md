Splitnice
Splitnice is a modern shared-expense management application designed to make splitting bills, tracking balances, managing groups, and settling payments simple and comfortable.
The project is inspired by expense-sharing applications such as Splitwise, while introducing its own visual identity, group-approval workflow, built-in calculator, automatic expense categories, and reminder system.
Splitnice is currently under active development. The present version is a frontend prototype using temporary local data with localStorage persistence.
Table of Contents
Project Overview
Current Status
Implemented Features
Application Sections
Add Expense Workflow
Expense Calculator
Automatic Categories
Automatic Group Icons
Expense Splitting
Settlements
Technology Stack
Project Structure
Getting Started
Available Commands
Design System
Current Data Flow
Known Limitations
Planned Features
Future Backend Architecture
Development Roadmap
Project Overview
Managing shared expenses can become complicated when friends, roommates, couples, or travel groups repeatedly pay for one another.
Splitnice aims to provide a clear place where users can:
Create expense groups
Request permission to join groups
Approve or reject new group members
Add shared expenses
Select who paid
Choose who participated
Split expenses using different methods
Track who owes whom
Record settlements
Send payment reminders
Review recent activity
Calculate amounts directly inside the expense form
The final application will contain both a public landing page and a logged-in expense-management application.
Current Status
The current version is a frontend prototype with localStorage persistence.
It includes:
A responsive dashboard
Summary balance cards with live calculations
Quick-action buttons (all functional)
Recent activity with add/delete
Group cards with auto-detected icons
Individual friend balances with settlement
A settlement call-to-action
An interactive Add Expense modal
A built-in calculator
Automatic expense category detection
Automatic group icon detection
Equal, exact, percentage, and shares expense splitting
Dynamic "Paid by" based on selected group
Complete form validation
localStorage data persistence
Data survives page refreshes but is stored locally in the browser. A backend will be introduced in a later phase.
Implemented Features
Responsive navigation
The sticky navigation bar provides links to:
Dashboard
Groups
Activity
People
Profile
New Expense
The navigation uses a translucent background and backdrop blur to remain visible while scrolling.
Dashboard summary
The dashboard displays live financial information including:
Total balance (calculated from people data)
Amount the user owes
Amount owed to the user
Number of involved people
Settle Up action
Quick actions
The dashboard includes functional buttons for:
Adding an expense (opens Add Expense modal)
Creating a group (opens Create Group modal with auto-detected icon)
Scanning a receipt (visual placeholder)
Recent activity
Recent Activity displays:
Expense category icon
Expense description
Group name
Payer information
Date and time
Balance status
Newly submitted expenses are placed at the top of the activity list without refreshing the page.
The activity container has a maximum height and becomes internally scrollable when many expenses are added.
Groups
The group section displays sample and user-created groups.
Each card includes:
Group icon (auto-detected from name keywords)
Group name
Number of members
Number of expenses
Current user balance
People and balances
The People section displays individual balances between the current user and their friends.
Possible states include:
Owes you
You owe
Settled up
Functional actions include:
Remind (placeholder)
Settle (opens Settlement modal)
View (placeholder)
Settlement section
The settlement call-to-action summarizes the user's outstanding balance and provides a button to record payments.
Create Group modal
Users can create new groups with:
Group name input
Automatic icon detection from keywords (e.g., "Goa" -> 🏖️, "Flat" -> 🏠)
Default icon 📝 when no keywords match
Settlement modal
Users can record payments with:
Selection of person to pay
Amount input (validated against owed amount)
Live balance updates in People section
Settlement activity added to Recent Activity
Application Sections
The current single-page dashboard follows this order:
Text
Navigation
│
├── Dashboard hero
│   ├── Balance summary (live calculated)
│   └── Quick actions (all functional)
│
├── Recent activity
│
├── Your groups
│
├── Friends and balances
│
├── Settle Up section
│
└── Modals
    ├── Add Expense
    ├── Create Group
    └── Settlement
Smooth anchor scrolling is used to navigate between the major sections.
Add Expense Workflow
The Add Expense modal allows users to:
Enter an expense description
Automatically detect an expense category
Enter the total amount
Open the built-in calculator
Select a group
Select who paid (dynamic based on group members)
Select a splitting method
Select participating members
Review calculated shares
Save the expense
After an expense is saved:
The modal closes
Form values are cleared
Split values are cleared
The category icon is retained in the activity
The new expense appears at the beginning of Recent Activity
The modal can be closed using:
The close button
Clicking outside the modal
Successfully saving an expense
Validation prevents saving when:
Description is empty
Amount is zero or negative
No members are selected
Exact amounts don't total the expense amount
Percentages don't total exactly 100%
Total shares are zero
Expense Calculator
The Add Expense modal contains a collapsible calculator.
Supported operations include:
Addition
Subtraction
Multiplication
Division
Percentage calculation
Decimal values
Delete last digit
Clear calculation
The calculated result can be transferred directly into the Amount field using the Use result button.
The Amount input uses a decimal text input instead of a native number field. This prevents the value from changing accidentally when the user scrolls the mouse wheel.
Automatic Categories
Splitnice detects an expense category by examining words in the description.
Examples:
Table
Description	Detected category	Icon
Dinner	Food	🍽️
Drinks	Drinks	🥤
Coffee	Drinks	🥤
Taxi	Transport	🚕
Petrol	Transport	🚕
Rent	Home	🏠
Internet	Home	🏠
Flight	Travel	✈️
Hotel	Travel	✈️
Shopping	Shopping	🛍️
Movie	Entertainment	🎬
Unknown description	General	🧾
Category matching is currently performed through a frontend keyword map.
A later version may use a backend classification system or AI-powered categorization.
Automatic Group Icons
When creating a group, Splitnice detects an appropriate icon by examining words in the group name.
Examples:
Table
Group name	Detected icon
Goa Trip	🏖️
Flatmates	🏠
Office Team	💼
Movie Night	🎬
Gym Buddies	🏋️
Random name	📝 (default)
Icon matching is performed through a frontend keyword map.
Expense Splitting
Equal split
The Equal split method allows users to:
View members belonging to the selected group
Include or exclude individual members
See the amount per person update instantly
Prevent saving when no members are selected
Example:
Text
Expense: ₹1,200
Selected members: 4
Amount per person: ₹300
Exact amounts
The Exact split method allows users to enter a specific amount for each selected member.
The interface displays:
Total amount entered
Remaining amount
Excess amount
Fully allocated state
The expense can only be saved when the exact shares equal the total expense.
Example:
Text
Expense total: ₹1,000

Nikhil: ₹400
Priya:  ₹350
Arjun:  ₹250

Total allocated: ₹1,000
Status: Fully allocated
Percentage split
The Percentage split method allows users to assign a percentage to each selected member.
The interface displays:
Total percentage entered
Remaining percentage
Excess percentage
Fully allocated state
The expense can only be saved when percentages total exactly 100%.
Example:
Text
Expense total: ₹1,000

Nikhil: 40% -> ₹400
Priya:  35% -> ₹350
Arjun:  25% -> ₹250

Total: 100%
Status: Fully allocated
Shares split
The Shares split method allows users to assign proportional shares to each selected member.
The interface displays:
Total shares
Individual share counts with +/- buttons
Calculated amount per member
Example:
Text
Expense total: ₹1,200

Nikhil: 2 shares -> ₹600
Priya:  1 share  -> ₹300
Arjun:  1 share  -> ₹300

Total shares: 4
Settlements
Users can record payments to settle debts:
Click "Settle" on a person or the "Settle your balances" button
Select the person to pay
Enter the payment amount (cannot exceed owed amount)
Submit to record the payment
After settlement:
The person's balance is reduced
If fully paid, status changes to "Settled up"
A settlement record appears in Recent Activity
Dashboard balances update automatically
Technology Stack
Frontend
React
JavaScript
JSX
Tailwind CSS
Vite
HTML5
CSS3
Planned backend
Node.js
Express
PostgreSQL
Prisma ORM
Secure cookie or token-based authentication
Email notification service
Scheduled background jobs
The backend technology may be adjusted as development progresses.
Project Structure
Text
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
│   │   │   ├── CreateGroupModal.jsx
│   │   │   ├── DashboardHero.jsx
│   │   │   ├── ExpenseCalculator.jsx
│   │   │   ├── GroupsSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PeopleSection.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── SettlementModal.jsx
│   │   │   └── SettleUpSection.jsx
│   │   │
│   │   ├── data/
│   │   │   └── initialData.js
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
The structure will expand when routing, authentication, backend services, tests, and database functionality are introduced.
Getting Started
Prerequisites
Install the following before running the project:
Node.js
npm
Git
Confirm that Node.js and npm are available:
bash
node -v
npm -v
Clone the repository
bash
git clone https://github.com/YOUR_USERNAME/splitnice.git
Replace YOUR_USERNAME with the repository owner's GitHub username.
Enter the frontend folder
bash
cd splitnice/frontend
Install dependencies
bash
npm install
Start the development server
bash
npm run dev
Vite will display a local URL similar to:
Text
http://localhost:5173
Open that address in a browser.
Run from the repository root
Alternatively, run:
bash
npm --prefix frontend run dev
Available Commands
Run these commands inside the frontend folder.
Development server
bash
npm run dev
Starts the Vite development server with hot module replacement.
Production build
bash
npm run build
Creates an optimized production build.
Preview production build
bash
npm run preview
Runs the production build locally for verification.
Lint the project
bash
npm run lint
Checks the code for common errors and style problems.
Design System
Splitnice uses a finance-focused visual system with generous spacing and editorial typography.
Primary colors
Table
Purpose	Color
Cream background	#f4f2eb
Main ink	#102a2a
Brand green	#123f3a
Accent lime	#c8f45d
Positive balance	#198754
Negative balance	#d9534f
Design principles
Clear financial information
Large balance typography
Generous whitespace
Rounded cards and controls
Minimal navigation
Strong visual hierarchy
Smooth scrolling
Responsive layouts
Restrained animations
Green for positive balances
Red for debts
The visual direction is inspired by premium editorial websites, but all Splitnice branding, financial layouts, content, and functionality are original to the project.
Current Data Flow
At present, expense data is managed inside React state with localStorage persistence.
Text
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
Save to localStorage
        │
        ▼
Recent Activity re-renders
This provides an interactive frontend experience without requiring a backend.
Because data is stored in localStorage:
Data survives page refreshes
Expenses are not shared between devices
Users cannot log in
Groups are not persistent across browsers
Notifications cannot be sent
These limitations will be resolved after the backend and database are introduced.
Known Limitations
The current prototype does not yet provide:
User registration
User authentication
Persistent database storage
Real-time collaboration
Search or filtering
Editing existing expenses
Deleting existing expenses
Receipt uploads
Receipt scanning
Currency conversion
Real payment processing
Email reminders
Push notifications
Routing between pages
Group detail views
Profile page
Notification center
Buttons connected to these future features may currently act as visual placeholders.
Planned Features
Authentication
Create account
Log in and log out
Forgot password
Profile management
Preferred currency
Profile photo
Group permissions
Create private groups
Generate invitation links or codes
Request to join a group
Approve or reject requests
Assign group leaders and administrators
Remove members
Transfer group ownership
Expense management
Equal splits
Exact splits
Percentage splits
Share-based splits
Multiple payers
Edit expenses
Delete expenses
Attach notes
Upload receipts
Add expense dates
Support recurring expenses
Balances and settlements
Calculate who owes whom
Simplify group debts
Record full settlements
Record partial settlements
Maintain payment history
Confirm received payments
Reminders
Manual reminder button
In-app notifications
Email reminders
Scheduled automatic reminders
Reminder preferences
Reminder history
Anti-spam protections
Stop reminders after settlement
Reporting
Group spending summaries
Personal spending summaries
Category charts
Date filters
Search
Export statements
Downloadable reports
Future Backend Architecture
The planned backend will likely contain these primary entities:
Text
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
Expected relationships:
Text
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
Financial amounts should be stored in the smallest currency unit.
For Indian rupees:
Text
₹10.50 -> 1050 paise
This avoids floating-point rounding problems in financial calculations.
Development Roadmap
Phase 1 - Frontend foundation
[x] Create React application
[x] Configure Tailwind CSS
[x] Create design system
[x] Build responsive navigation
[x] Build dashboard hero
Phase 2 - Dashboard sections
[x] Add balance cards
[x] Add quick actions
[x] Add Recent Activity
[x] Add Groups section
[x] Add People section
[x] Add Settle Up section
Phase 3 - Add Expense workflow
[x] Build Add Expense modal
[x] Add controlled amount input
[x] Add built-in calculator
[x] Add automatic category detection
[x] Add automatic group icon detection
[x] Add expenses to Recent Activity
[x] Implement equal splitting
[x] Implement exact splitting
[x] Implement percentage splitting
[x] Implement share-based splitting
[x] Support dynamic payer selection
[x] Add complete expense validation
Phase 4 - Frontend application behavior
[ ] Add routing
[ ] Create group details view
[ ] Create profile view
[x] Add group creation modal
[ ] Add join-request interface
[ ] Add leader approval interface
[ ] Add notification center
[x] Add settlement modal
[ ] Add editing and deletion
Phase 5 - Backend and database
[ ] Create backend project
[ ] Configure PostgreSQL
[ ] Design database schema
[ ] Add authentication
[ ] Add group APIs
[ ] Add expense APIs
[ ] Add settlement APIs
[ ] Add permission checks
[ ] Connect frontend to backend
Phase 6 - Notifications and reminders
[ ] Add manual reminders
[ ] Add email service
[ ] Add scheduled reminder jobs
[ ] Add in-app notifications
[ ] Add reminder preferences
Phase 7 - Advanced functionality
[ ] Receipt uploads
[ ] Receipt scanning
[ ] Multiple currencies
[ ] Recurring expenses
[ ] Real-time group updates
[ ] Reports and exports
[ ] Payment-provider integration
Phase 8 - Testing and deployment
[ ] Unit tests
[ ] Expense calculation tests
[ ] Component tests
[ ] Accessibility testing
[ ] Mobile testing
[ ] Security testing
[ ] Production deployment
[ ] Error monitoring
[ ] Database backups
Contributing
Splitnice is currently an early-stage personal project.
Before contributing:
Fork the repository
Create a feature branch
Make focused changes
Test the application
Commit with a clear message
Open a pull request
Example:
bash
git checkout -b feature/percentage-split
git add .
git commit -m "Implement percentage expense splitting"
git push origin feature/percentage-split
Disclaimer
Splitnice currently records and displays expense information only.
It does not process real payments, hold money, provide banking services, or offer financial advice.
Real payment-provider integration will only be considered after proper authentication, security controls, data protection, and compliance requirements are implemented.
License
A license has not yet been selected for this project.
All rights are reserved until a license file is added.
Project Vision
Splitnice should make shared expenses feel clear rather than uncomfortable.
The long-term goal is to create an application where users can confidently answer:
What did we spend?
Who paid?
Who participated?
Who owes money?
Has the payment been completed?
Does someone need a reminder?
The experience should remain simple, transparent, and-most importantly-nice.