# Product Specification Document

## 1. Product Overview
This is a static website for [Describe tu sitio, ej: a personal portfolio / a local coffee shop]. The main goal is to [Ej: display my projects / show the menu and location] and allow users to contact me.

## 2. Pages and Navigation Structure
The website consists of the following pages/sections:
* **Home:** Hero section, About Us, Services, and Testimonials.
* **Contact Page:** Contains contact details and a static contact form.
* **404 Error Page:** Custom page not found error.

## 3. Core Features to Test (End-to-End)
Please test the following interactive elements and user flows:
* **Main Navigation:** Ensure all header and footer links navigate to the correct sections or HTML pages without broken links.
* **Call to Action (CTA) Buttons:** Verify that all buttons (e.g., "Learn More", "Contact Us") are clickable and redirect to the expected URLs.
* **Static Forms:** If applicable, verify that the contact form validates required fields (Name, Email, Message) and triggers the correct submission behavior (e.g., successful form validation, redirection to a "Thank You" page).
* **External Links:** Ensure that links to external sites (like social media profiles) open in a new browser tab.

## 4. UI/UX and Responsiveness
* **Responsive Design:** The layout must adapt correctly to Mobile, Tablet, and Desktop viewport sizes.
* **Mobile Menu:** The navigation menu should collapse into a functional "hamburger" menu on mobile devices.
* **Visual Elements:** Ensure images load correctly and there are no overlapping text elements on smaller screens.

## 5. Edge Cases & Error Handling
* **404 Redirection:** Navigating to an invalid or non-existent URL must display the custom 404 Error Page with a button to return to the Homepage.