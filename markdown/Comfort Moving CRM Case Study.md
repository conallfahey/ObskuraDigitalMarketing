# Comfort Moving CRM Case Study

## Project Overview

Comfort Moving needed a CRM that matched the speed and messiness of a real moving business: quote requests arriving from the website, phone calls, Meta leads, follow-ups, contracts, deposits, final payments, calendar handoffs, and review reminders. Generic CRMs were too broad, too expensive, or too disconnected from how the team actually books and completes moves.

I built a custom CRM that turns those scattered touchpoints into one focused operating system for the business. The app gives the team a clean command center for managing every lead from first inquiry to completed move.

![Screenshot placeholder: CRM dashboard with revenue cards, lead trends, upcoming moves, and status charts](../assets/case-studies/comfort-moving-crm/dashboard-placeholder.png)

**Animation visual:** A lead card flows from "New Inquiry" to "Quoted" to "Booked" to "Completed," with each stage lighting up as the surrounding dashboard metrics update.

## The Problem

Moving companies do not just need a contact database. They need a system that can answer practical questions quickly:

- Who needs a follow-up today?
- Which leads have been quoted but not booked?
- Which moves are coming up this week?
- Has the contract been signed?
- Has the deposit or final payment been handled?
- Where did the lead come from?
- Who on the team touched the record last?

Before the CRM, those answers were spread across inboxes, spreadsheets, calendars, payment links, notes, and manual reminders. That created friction at the exact moments where speed and clarity matter most.

## The Solution

The Comfort Moving CRM is a Firebase-powered React application built around the company's actual sales and operations workflow. It combines lead intake, pipeline management, booking, contract tracking, payment preparation, task management, activity history, and calendar visibility in one internal tool.

Instead of forcing the team into a generic CRM model, the app uses moving-company language and moving-company actions: move dates, routes, crew size, truck fees, overnight holds, quote ranges, deposits, final payment requests, completed moves, and review reminders.

![Screenshot placeholder: lead inbox table with statuses, contact links, contract badges, referral sources, and move dates](../assets/case-studies/comfort-moving-crm/inbox-placeholder.png)

**Animation visual:** Inbox rows subtly sort into status lanes while badges pulse for high-priority states like "New," "Follow Up Needed," and "Contract Sent."

## Core Workflow

Leads can enter the system through the public quote form, manual staff entry, Meta lead ingestion, or phone/walk-in sources. Each lead is normalized into the same CRM structure with customer details, route information, service type, move date, move size, referral source, quote details, status, notes, and activity history.

Staff can move leads through statuses such as `new`, `attempted_contact`, `quoted`, `contract_sent`, `follow_up_needed`, `booked`, `lost`, `spam`, and `archive`. Once a lead is booked, it becomes an upcoming move and can be tracked operationally through completion.

![Screenshot placeholder: full lead detail page showing customer info, route, quote fields, contract actions, payment actions, notes, and activity timeline](../assets/case-studies/comfort-moving-crm/lead-detail-placeholder.png)

**Animation visual:** The lead detail page opens with a split motion: customer context slides in from the left, operational details settle on the right, and the activity timeline builds upward like a living record.

## Key Features

**Lead Intake**

The public quote flow captures essential move details while protecting the form with validation, honeypot checks, and a lightweight challenge. Website submissions are processed through a Cloud Function before entering the CRM.

![Screenshot placeholder: public quote form with move details, contact fields, referral source, and spam protection](../assets/case-studies/comfort-moving-crm/public-form-placeholder.png)

**Pipeline Inbox**

The Lead Inbox gives staff a fast view of active opportunities with customer names, phone/email links, referral sources, move dates, statuses, contract state, inline editing, restore/delete controls, and quick access to each record.

**Lead Workspace**

Each lead has a full workspace for contact information, addresses, route links, move details, service type, crew size, quote ranges, truck or equipment fees, overnight hold notes, internal notes, status changes, booking actions, and activity history.

**Contracts**

The CRM supports customer-facing contract links, signature capture, contract status tracking, PDF access, resend/regenerate actions, and contract-related activity logging.

![Screenshot placeholder: contract status area with signed/pending state, resend controls, PDF link, and customer signing preview](../assets/case-studies/comfort-moving-crm/contracts-placeholder.png)

**Animation visual:** A contract card flips from "Sent" to "Signed," then drops a stamped PDF icon into the lead activity timeline.

**Payments**

Final payment tools calculate billable time, hourly rate, additional fees, deposits, optional tips, card checkout, processing fee display, and Zelle payment instructions.

**Upcoming Moves**

Booked jobs appear in an Upcoming Moves view with customer, date, route, move status, and calendar sync visibility. The team can quickly see what is coming next and whether operational handoff is complete.

![Screenshot placeholder: upcoming moves list with route details, move dates, and calendar sync indicators](../assets/case-studies/comfort-moving-crm/upcoming-moves-placeholder.png)

**Tasks and Follow-Ups**

The Tasks page gives the team a simple way to create follow-up work, assign categories, set due dates, and track overdue or recently completed items.

**Activity Log**

A searchable activity log records lead creation, notes, emails, quotes, bookings, contracts, payment events, assignment changes, and status updates. It keeps context from disappearing between team members.

![Screenshot placeholder: activity log with filters, timestamped events, notes, booking updates, and payment/contract activity](../assets/case-studies/comfort-moving-crm/activity-log-placeholder.png)

**Roles and Settings**

The app supports admin, sales, and operations roles. Admins can manage role visibility, notification assignments, Google Calendar connection status, and system utilities for recovering missed inbound leads.

## Integrations

The CRM connects the tools Comfort Moving already needs:

- Firebase Authentication for staff login
- Firestore for lead, job, task, and activity data
- Cloud Functions for secure intake and automation
- Google Calendar sync for booked moves
- Email notifications for lead and workflow events
- Meta lead ingestion for paid social campaigns
- Stripe checkout for card payments
- Zelle instructions for direct payments
- PDF generation and signing flows for contracts
- Google review reminder workflows after completed moves

![Screenshot placeholder: integration map showing website, Meta, Firebase, Google Calendar, Stripe, contracts, and review reminders feeding the CRM](../assets/case-studies/comfort-moving-crm/integration-map-placeholder.png)

**Animation visual:** Thin animated paths carry small "lead," "contract," "payment," and "review" tokens between the website, CRM, calendar, Stripe, and customer-facing pages.

## Product Design Direction

The interface is designed to feel like a working tool, not a decorative dashboard. The emphasis is on scanability, clear states, fast action, and low cognitive load.

Visual ideas for the case study page:

- Sticky pipeline rail that tracks the lead journey as the reader scrolls
- Screenshot frames that animate from wireframe placeholders into full UI captures
- Status badges that gently transition between CRM states
- Timeline entries that appear as the activity log section enters view
- Route lines that draw between pickup and drop-off cards
- Calendar blocks that slide into the Upcoming Moves section
- Contract and payment cards that complete with a satisfying check-state animation

## Impact

The CRM replaced scattered tools with one practical workflow. It helps Comfort Moving respond faster, preserve sales context, reduce missed follow-ups, track booked moves, keep contract and payment status visible, and close the loop with review requests after completed jobs.

The app is intentionally lightweight. Firebase keeps authentication, hosting, data, and functions in one ecosystem, while React keeps the interface fast and maintainable. The result is a custom operating layer with the parts the business needs and none of the clutter it does not.

## Suggested Screenshot Set

1. `dashboard.png`  
   Dashboard with recent leads, upcoming moves, potential revenue, lead trends, referral breakdown, and status charts.

2. `lead-inbox.png`  
   Active pipeline table with statuses, contract badges, contact links, referral source, and move dates.

3. `manual-lead-entry.png`  
   Staff-created lead flow for phone calls, referrals, and walk-ins.

4. `lead-detail.png`  
   Full sales and operations workspace for one customer.

5. `contract-flow.png`  
   Contract generation, sent/signed status, PDF access, and customer signing view.

6. `payment-flow.png`  
   Final payment request with time, fees, deposit credit, tip, card checkout, and Zelle instructions.

7. `upcoming-moves.png`  
   Booked moves view with route and calendar sync status.

8. `tasks.png`  
   Follow-up task board with due dates and team categories.

9. `activity-log.png`  
   Searchable timeline of notes, bookings, payments, contracts, and status changes.

10. `settings.png`  
    Role management, notifications, calendar connection, and system utilities.

## Future Enhancements

Future improvements could include deeper pipeline filtering, duplicate lead detection, automated follow-up sequences, richer quote templates, dispatch and crew assignment tools, mobile-first field workflows, calendar conflict warnings, payment reconciliation, lead source close-rate reporting, and a more polished customer portal for contracts and final payments.

Long term, the CRM can grow into a full operating system for Comfort Moving: lead capture, quoting, booking, dispatch, payment, review generation, and performance analytics in one controlled platform.
