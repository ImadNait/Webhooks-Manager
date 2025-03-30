# Webhook Event Logger

## Overview
Webhook Event Logger is a NestJS-based service designed to log, process, and forward webhook events with high efficiency. This system is built to ensure reliable event handling, notification dispatching, and seamless event forwarding. It supports Stripe webhooks and provides a structured way to manage incoming requests.
With the integration of MongoDB for storage, Express.js for webhook handling, and Twilio/Nodemailer for notifications, this project provides a robust solution for webhook event management. A future enhancement includes retrying failed webhook deliveries using Redis job queues.

## Features

* **Webhook Event Logging:** Capture and store incoming webhook events.

* **Forwarding Webhook Events:** Send webhook events to external services (in this project i used Discord).

* **Notification System:**

  * Email Notifications using Nodemailer.

  * SMS Notifications using Twilio.

* **Database Storage:** Persist webhook events using MongoDB.

* **Express API Integration:** Handles webhook events separately via Express.js.

* **Stripe Webhooks Support:** Capture and process Stripe webhook events.

### Upcoming Feature

* **Retry Failed Webhook Deliveries:** Automatically retry failed webhook deliveries using Redis Job Queues to reattempt failed events.
