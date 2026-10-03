//your JS code here. If required.
// Selecting HTML elements
const form = document.getElementById("form");
const fontSize = document.getElementById("fontsize");
const fontColor = document.getElementById("fontcolor");

// Cookie expiration time: 1 day in seconds
const maxAge = 60 * 60 * 24 ;


// FUNCTION 1: Apply font preferences to the page
function applyPreferences(size, color) {

    // Update CSS custom properties on the root HTML element
    document.documentElement.style.setProperty("--fontsize", `${size}px`);

    document.documentElement.style.setProperty("--fontcolor", color);
}


// FUNCTION 2: Save preferences when the form is submitted
form.addEventListener("submit", (event) => {

    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get values entered or selected by the user
    const fontSizeValue = fontSize.value;
    const fontColorValue = fontColor.value;

    // Save font size in a cookie for 1 year
    document.cookie = `fontsize=${fontSizeValue}; max-age=${maxAge}; path=/`;

    // Save font color in a cookie for 1 year
    document.cookie = `fontcolor=${fontColorValue}; max-age=${maxAge}; path=/`;

    // Apply the selected preferences immediately
    applyPreferences(fontSizeValue, fontColorValue);

});


// FUNCTION 3: Read saved preferences when the page loads
function loadPreferences() {

    // Get all cookies as a single string
    const cookies = document.cookie.split(";");

    // Variables to hold saved values
    let savedFontSize;
    let savedFontColor;

    // Iterate through each cookie
    cookies.forEach((item) => {

        // Separate cookie name and value
        const [key, value] = item.trim().split("=");

        // Check which cookie is being read
        if (key === "fontsize") {
            savedFontSize = value;
        }

        if (key === "fontcolor") {
            savedFontColor = value;
        }
    });

    // If both preferences exist, restore them
    if (savedFontSize && savedFontColor) {

        // Apply saved styles
        applyPreferences(savedFontSize, savedFontColor);

        // Restore values inside the input fields
        fontSize.value = savedFontSize;
        fontColor.value = savedFontColor;
    }
}


// Execute when the JavaScript file loads
loadPreferences();