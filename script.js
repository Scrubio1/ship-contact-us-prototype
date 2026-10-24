
const teamMemberOptions = document.querySelectorAll(
    'input[name="team-member"]'
);

const inquiryOptions = document.querySelectorAll(
    'input[name="inquiry-type"]'
);

const teamQuestion = document.getElementById(
    "team-member-question"
);

const inquiryQuestion = document.getElementById(
    "inquiry-question"
);

const teamContact = document.getElementById("team-contact");
const publicContact = document.getElementById("public-contact");
const medicareHelp = document.getElementById("medicare-help");

const contactFormSection = document.getElementById("contact-form-section");
const contactName = document.getElementById("contact-name");
const nameLabel = document.getElementById("name-label");
const publicAcknowledgment = document.getElementById("public-acknowledgment");
const acknowledgmentCheckbox = document.getElementById("contact-acknowledgment");
const submitButton = document.getElementById("submit-button");

const decisionIntro = document.getElementById("decision-intro");

const submissionConfirmation = document.getElementById(
    "submission-confirmation"
);

const startOverButton = document.getElementById("start-over");




let currentAudience = null;


function hideResults() {
    teamContact.hidden = true;
    publicContact.hidden = true;
    medicareHelp.hidden = true;
    contactFormSection.hidden = true;
    decisionIntro.hidden = false;
    submissionConfirmation.hidden = true;


}

function showFieldError(field, errorId, message) {
    const error = document.getElementById(errorId);

    error.textContent = message;
    error.hidden = false;

    field.setAttribute("aria-invalid", "true");
}

function clearFieldError(field, errorId) {
    const error = document.getElementById(errorId);

    error.textContent = "";
    error.hidden = true;

    field.removeAttribute("aria-invalid");
}


function validateContactForm() {
    let isValid = true;
    let firstInvalidField = null;

    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const state = document.getElementById("contact-state");
    const question = document.getElementById("contact-question");
    
clearFieldError(name, "name-error");
clearFieldError(email, "email-error");
clearFieldError(state, "state-error");
clearFieldError(question, "question-error");


    function markInvalid(field, errorId, message) {
        showFieldError(field, errorId, message);
        isValid = false;

        if (!firstInvalidField) {
            firstInvalidField = field;
        }
    }

    if (name.required && !name.value.trim()) {
        markInvalid(name, "name-error", "Enter your name.");
    }

    if (!email.value.trim()) {
        markInvalid(email, "email-error", "Enter your email address.");
    } else if (!email.validity.valid) {
        markInvalid(email, "email-error", "Enter a valid email address.");
    }

    if (!state.value) {
        markInvalid(state, "state-error", "Select your state.");
    }

    if (!question.value.trim()) {
        markInvalid(question, "question-error", "Enter your question.");
    }

    if (!isValid) {
        firstInvalidField.focus();
    }

    return isValid;
}

function focusDestination(section) {
    decisionIntro.hidden = true;
    section.querySelector("h2").focus();
}


function showContactForm(audience) {
    currentAudience = audience;

    const isTeamMember = audience === "team";

    contactFormSection.hidden = false;

    contactName.required = isTeamMember;
    nameLabel.textContent = isTeamMember ? "Name *" : "Name";
    if (!isTeamMember) {
    clearFieldError(contactName, "name-error");
}

    publicAcknowledgment.hidden = isTeamMember;
    acknowledgmentCheckbox.required = !isTeamMember;
    submitButton.disabled =
    !isTeamMember && !acknowledgmentCheckbox.checked;
}


teamMemberOptions.forEach(option => {
    option.addEventListener("change", () => {
        const answer = option.value;

        hideResults();

        if (answer === "yes") {
            teamQuestion.hidden = true;
            inquiryQuestion.hidden = true;
            
teamContact.hidden = false;
showContactForm("team");
focusDestination(teamContact);

        } else {
            inquiryQuestion.hidden = false;
        }
    });
});

inquiryOptions.forEach(option => {
    option.addEventListener("change", () => {
        hideResults();

        teamQuestion.hidden = true;
        inquiryQuestion.hidden = true;

        if (option.value === "medicare") {
            medicareHelp.hidden = false;
            focusDestination(medicareHelp);
        } else {
            
publicContact.hidden = false;
showContactForm("public");
focusDestination(publicContact);
        }
    });
});

const backButtons = document.querySelectorAll(".back-button");
const backToTeam = document.getElementById("back-to-team");


backButtons.forEach(button => {
    button.addEventListener("click", () => {
        const returnToTeamQuestion =
            currentAudience === "team" ||
            !teamContact.hidden;

        hideResults();

        teamQuestion.hidden = false;

        if (returnToTeamQuestion) {
            inquiryQuestion.hidden = true;

            teamQuestion.querySelector(
                'input:checked'
            )?.focus();
        } else {
            inquiryQuestion.hidden = false;

            inquiryQuestion.querySelector(
                'input:checked'
            )?.focus();
        }
    });
});


backToTeam.addEventListener("click", () => {
    inquiryQuestion.hidden = true;
    teamQuestion.hidden = false;

    teamQuestion.querySelector(
        'input:checked'
    )?.focus();
});
acknowledgmentCheckbox.addEventListener("change", () => {
    submitButton.disabled = !acknowledgmentCheckbox.checked;
});

const states = [
    "Alabama", "Alaska", "Arizona",
    "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "District of Columbia", "Florida", "Georgia",
    "Guam", "Hawaii", "Idaho", "Illinois", "Indiana",
    "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico",
    "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont",
    "Virgin Islands", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
];

const stateDropdown = document.getElementById("contact-state");

states.forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
});

const contactForm = document.getElementById("contact-form");


contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = validateContactForm();

    if (isValid) {
        hideResults();

        submissionConfirmation.hidden = false;
        focusDestination(submissionConfirmation);
    }
});


const validationFields = [
    ["contact-name", "name-error"],
    ["contact-email", "email-error"],
    ["contact-state", "state-error"],
    ["contact-question", "question-error"]
];

validationFields.forEach(([fieldId, errorId]) => {
    const field = document.getElementById(fieldId);

    function checkCorrection() {
        const value = field.value.trim();

        if (
            (fieldId === "contact-name" && (!field.required || value)) ||
            (fieldId === "contact-email" && value && field.validity.valid) ||
            (fieldId === "contact-state" && value) ||
            (fieldId === "contact-question" && value)
        ) {
            clearFieldError(field, errorId);
        }
    }

    field.addEventListener("input", checkCorrection);
    field.addEventListener("change", checkCorrection);
});

startOverButton.addEventListener("click", () => {
    hideResults();

    contactForm.reset();
    currentAudience = null;

    teamMemberOptions.forEach(option => {
        option.checked = false;
    });

    inquiryOptions.forEach(option => {
        option.checked = false;
    });

    teamQuestion.hidden = false;
    inquiryQuestion.hidden = true;
    decisionIntro.hidden = false;

    teamQuestion.querySelector("legend").setAttribute(
        "tabindex", "-1"
    );

    teamQuestion.querySelector("legend").focus();
});
