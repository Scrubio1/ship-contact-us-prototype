# SHIP TA Center Contact Us Redesign Prototype

## Project Overview

This prototype explores a redesigned Contact Us experience for the SHIP Technical Assistance (TA) Center website.

The redesign aims to help visitors reach the appropriate resource or contact option based on their needs.

The experience distinguishes between:

- SHIP team members seeking assistance from the SHIP TA Center.
- Members of the public seeking information about the SHIP program.
- Individuals seeking help with personal Medicare questions, who are directed to their local SHIP.

The prototype uses a short series of questions to guide visitors to the appropriate destination.

## Prototype Scope

This is a front-end demonstration built with HTML, CSS, and JavaScript.

The prototype demonstrates visitor pathways, conditional form requirements, validation, keyboard navigation, and submission confirmation.

**No form submissions are transmitted or stored.**

Production implementation will require integration with the SHIP TA Center website's existing form-processing infrastructure.

## Visitor Pathways

The prototype uses progressive disclosure to guide visitors to the appropriate destination.

### Pathway 1: SHIP Team Member

Visitors who identify as SHIP team members are directed to the SHIP TA Center contact form.

The form is intended for questions about website resources, account access, and SHIP TA Center communications.

### Pathway 2: Public — Medicare Question

Visitors who are not SHIP team members and select "A Medicare question" are directed to information about free, unbiased Medicare counseling.

A prominent "Find Local Medicare Help" link directs visitors to the SHIP locator.

These visitors are not presented with the contact form.

### Pathway 3: Public — SHIP Program Information

Visitors who are not SHIP team members and select "Information about the SHIP program" are directed to the SHIP TA Center contact form.

The form includes an acknowledgment confirming that the contact option is for questions about the SHIP program, not personal Medicare coverage, enrollment, or benefits.

### Navigation

Visitors can return to previous questions using Back controls.

Previously entered form information is preserved when navigating between pathways. Selecting Start Over after a successful submission resets the form and returns visitors to the first question.

## Contact Form Requirements

Both contact pathways use the same form, with requirements adjusted based on the visitor's selection.

| Field                   | SHIP Team Member | Public Program Inquiry |
| ----------------------- | ---------------- | ---------------------- |
| Name                    | Required         | Optional               |
| Email                   | Required         | Required               |
| Location                | Required         | Required               |
| Your question           | Required         | Required               |
| Acknowledgment checkbox | Not displayed    | Required               |

### Location Options

The Location dropdown includes all 50 states, the District of Columbia, U.S. territories, and an "Outside the United States" option.

### Public Inquiry Acknowledgment

Public visitors must acknowledge that the contact form is intended for questions about the SHIP program rather than personal Medicare coverage, enrollment, or benefits.

The Submit button remains disabled until the acknowledgment checkbox is selected.

### Form Validation

The prototype uses custom form validation.

- Required fields are checked when visitors submit the form.
- Email addresses are checked for valid formatting.
- Validation errors appear beside the corresponding fields.
- An error summary provides links to fields requiring correction.
- Keyboard focus moves to the error summary when validation fails.
- Errors clear when the corresponding fields are corrected.
- Previously entered information is preserved when validation fails.

### Submission Confirmation

After successful validation, the prototype displays a confirmation message and moves keyboard focus to the confirmation heading.

The confirmation includes a notice that no message was actually sent.

Selecting Start Over clears the form and returns visitors to the beginning of the decision process.

## Email Notification Requirements

In production, validated contact form submissions should be sent to the SHIP TA Center's general inbox: info@shiphelp.org.

The prototype does not send emails. Informatics will need to connect the form to the website's existing form-processing system.

### Notification Subject Lines

The email subject should identify the visitor's inquiry type.

| Inquiry Type           | Email Subject                                     |
| ---------------------- | ------------------------------------------------- |
| SHIP Team Member       | SHIP TA Center Contact Form — Team Member Inquiry |
| Public Program Inquiry | SHIP TA Center Contact Form — Public Inquiry      |

### Notification Format

Each notification should contain:

- Inquiry type
- Name
- Email address
- Location
- Question

**Example: SHIP Team Member Inquiry**

Subject: SHIP TA Center Contact Form — Team Member Inquiry

Inquiry Type: SHIP Team Member

Name: Jane Smith

Email: jane@example.com

Location: Texas

Question:
I'm having trouble accessing the password-protected resources on the SHIP TA Center website.

### Public Inquiry Differences

For public program inquiries:

- The subject line should identify the submission as a Public Inquiry.
- The inquiry type should be "General SHIP Program Question."
- Name is optional. If no name is provided, display "Not provided" rather than leaving an unlabeled or empty field.
- The acknowledgment checkbox does not need to appear in the email notification.

### Production Implementation Notes

- Use the website's existing form-processing infrastructure.
- Validate submitted information on the server before processing.
- Format email notifications using the field labels specified above.
- Preserve line breaks in the visitor's question.
- Treat submitted content as plain text to prevent HTML or script injection.
- Do not include unnecessary personal information in notification headers.
- Only display a successful submission confirmation after the server accepts the submission.
- If submission fails, display an understandable error message and preserve the visitor's entered information.
- Implement appropriate spam prevention and submission safeguards.

**Important:** The Location field currently uses `name="state"` in the HTML. The production notification must label this information as **Location**, not Phone.

The JavaScript submission handler contains a comment identifying the intended production integration point.

## Accessibility and Testing

The prototype was developed with accessibility and usability considerations throughout the design process.

### Accessibility Features

- Semantic HTML, including headings, landmarks, fieldsets, and legends.
- Native radio buttons, checkboxes, and form controls.
- Visible keyboard focus indicators.
- Keyboard-accessible navigation and form interactions.
- Programmatic focus management when moving between visitor pathways.
- Descriptive form labels and field-specific validation messages.
- An error summary with links to invalid fields.
- Required fields identified visually.
- Responsive layouts that support smaller screens and browser zoom.
- Links that identify when they open in a new tab.

### Testing Completed

Testing conducted October 2026 included:

- Lighthouse automated accessibility audit: 17 of 17 checks passed.
- Keyboard navigation testing.
- Accessibility Insights for Web-assisted manual testing.
- Testing of all three visitor pathways.
- Form validation and error correction testing.
- Back navigation and Start Over functionality.
- Responsive layout testing across multiple viewport sizes.
- Browser zoom testing at 200% and 400%.

### Testing Limitations

Automated accessibility testing cannot identify every accessibility issue.

Screen-reader testing and testing with users who rely on assistive technologies have not been completed.

The prototype has not undergone a comprehensive WCAG conformance evaluation.

## Production Considerations

Before implementation on the live website, Informatics should:

- Integrate the interaction into the existing website design and navigation.
- Replace prototype header, navigation, and footer elements with the production website components.
- Connect the contact form to the existing submission infrastructure.
- Implement the email notification requirements documented above.
- Verify that submission confirmation and error handling reflect actual server responses.
- Test the integrated experience with assistive technologies.
- Confirm accessibility across supported browsers and devices.
- Review the Open Enrollment notice for seasonal updates or removal outside the enrollment period.

The prototype is intended to communicate interaction design and functional requirements. Production implementation may require adjustments to accommodate the existing website infrastructure.
