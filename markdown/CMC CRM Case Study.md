I drafted the case study below. I also tried to capture screenshots, but two things blocked the actual files: the workspace is read-only for new screenshot output, and the internal CRM screens require an authenticated staff session. I did verify the app structure and served the built app locally, but I could not save screenshots from this environment.

**Case Study: CMC OS CRM**

Comfort Moving Chicago needed a CRM built around the way a small moving company actually works: fast lead intake, reliable follow-up, clean booking visibility, and simple operational handoff. Off-the-shelf CRMs were either too expensive, too generic, or too heavy for the team’s day-to-day workflow. CMC OS was built as a focused, low-cost internal CRM that turns website inquiries, phone calls, Meta leads, contracts, payments, and move operations into one connected workflow.

The result is a Firebase-powered React application that gives the team a practical command center for managing leads from first contact through completed move and post-move review request.

**Core Workflow**

CMC OS starts with lead intake. Public quote requests can come from the website form, manual staff entry, Meta Lead Ads, or Instagram DM-style lead signals. Website submissions use validation, honeypot fields, a simple math check, and a Cloud Function intake endpoint before being normalized into CRM leads.

Once inside the CRM, staff can manage each lead through statuses like `new`, `attempted_contact`, `quoted`, `contract_sent`, `follow_up_needed`, `booked`, `archive`, `lost`, and `spam`. The Lead Inbox shows active opportunities with client details, contact links, move dates, referral source, contract status, and quick navigation into the full lead record.

The Lead Detail page is the operational center of the system. Staff can update customer contact details, route information, move date, move size, service type, crew size, overnight hold status, quote ranges, truck/equipment fees, notes, and status history. Booking a lead creates a job, connects it to upcoming moves, and supports calendar synchronization.

**Major Features**

Lead management:
CMC OS captures website leads, Meta leads, Instagram lead signals, phone/walk-in leads, and manually created leads. Each record stores contact information, referral source, move details, quote information, lifecycle status, activity history, and deletion/archive state.

Dashboard and analytics:
The Home dashboard summarizes recent open leads, upcoming moves, recently completed moves, potential revenue, quoted-not-booked revenue, referral source breakdown, lead status breakdown, and lead/booked trend charts.

Inbox:
The Lead Inbox gives staff a clean table of active leads with status badges, contract status, contact information, referral source, move date, creation date, inline name editing, soft delete, restore, and quick access to details.

Lead detail:
The detail page combines sales and operations data in one place: contact links, route links, move information, quote calculations, status controls, notes, activity timeline, contract actions, booking actions, and final payment preparation.

Contracts:
CMC OS supports secure customer contract links, public contract review, signature capture, contract status tracking, PDF access, resend/regenerate workflows, signed PDF handling, and contract-related activity logging.

Final payments:
The system supports final payment request links, billable time calculation to the minute, hourly rate, other fees, deposit credit, tip selection, Stripe card checkout, Zelle instructions, card processing fee display, and payment activity logging.

Upcoming moves:
Booked jobs appear in Upcoming Moves with client name, move date, route, status, and calendar event visibility. Missing calendar events can be retried from the app.

Archive:
Completed moves move into Archive, keeping past jobs accessible while removing them from the active inbox. Archived records support review reminder sending and soft deletion.

Tasks:
The Tasks page supports quick task creation, team category assignment, due dates, descriptions, pending follow-ups, overdue/today indicators, and recently completed tasks.

Activity log:
A global Activity Log provides a chronological, searchable record of lead creation, notes, emails, quotes, bookings, payments, contracts, assignment changes, and status changes. It can be filtered by team and activity type.

Settings:
Settings includes profile information, role visibility, admin role management, task notification assignments, Google Calendar connection status, and system utilities such as restoring missed inbound leads.

Roles and permissions:
The app supports `admin`, `sales`, and `ops` roles. Operations users see a narrower navigation focused on Inbox, Upcoming Moves, Settings, and lead operational details, while admins can manage user roles and notification settings.

Integrations:
CMC OS includes Firebase Authentication, Firestore, Cloud Functions, Google Calendar sync, email notifications, Meta webhook ingestion, contract PDF generation/signing, Stripe checkout, Zelle payment instructions, and Google review reminder workflows.

**Impact**

CMC OS replaces scattered spreadsheets, inboxes, and manual reminders with one focused workflow. It helps Comfort Moving Chicago respond faster to quote requests, preserve context between sales and operations, reduce missed follow-ups, keep upcoming moves visible, and close the loop after completed jobs with review reminders.

The system is intentionally lightweight. Firebase keeps hosting, auth, database, and functions in one ecosystem, while React and Tailwind keep the interface fast and maintainable. The architecture avoids unnecessary infrastructure and focuses on the highest-value CRM behaviors for a local moving company.

**Future Plans**

Planned improvements include deeper lead filtering and search, stronger duplicate detection, richer quote templates, automated follow-up sequences, better mobile-first field workflows for crews, calendar conflict warnings, payment reconciliation views, expanded reporting by source and close rate, customer communication history, dispatch/crew assignment tools, and more polished customer-facing contract/payment pages.

Longer term, CMC OS could grow into a full operating layer for Comfort Moving Chicago: lead capture, quoting, booking, dispatch, payment, review generation, and performance analytics in one controlled system without the cost or complexity of a generic enterprise CRM.

**Screenshot Capture Map**

Recommended screenshots to pair with the case study:

1. `public-form-example.html`  
   Caption: Public quote intake with validation, honeypot spam protection, referral source, move size, and zip fields.

2. `/login`  
   Caption: Staff-only Firebase Authentication login.

3. `/`  
   Caption: Home dashboard with recent leads, next moves, revenue summaries, trends, referral sources, and status breakdown.

4. `/inbox`  
   Caption: Lead Inbox showing active pipeline, statuses, contract states, contact info, and move dates.

5. `/leads/new`  
   Caption: Manual lead entry for phone calls, referrals, and walk-ins.

6. `/leads/:id`  
   Caption: Full lead workspace with route, quote, contract, final payment, status, notes, and activity timeline.

7. `/moves`  
   Caption: Upcoming booked moves with route and calendar sync status.

8. `/archive`  
   Caption: Completed move archive with review reminder actions.

9. `/tasks`  
   Caption: Follow-up task management by due date and team category.

10. `/activity`  
   Caption: Searchable global activity log for notes, emails, bookings, payments, contracts, and status changes.

11. `/settings`  
   Caption: Roles, task notifications, calendar connection, and system tools.

12. `/sign/:token` and `/pay/:token`  
   Caption: Customer-facing contract signature and final payment flows.