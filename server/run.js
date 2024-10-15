const express = require('express');
const path = require('path');
const app = express();
const PORT = 996; // You can change this to any port you prefer

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML page)
app.use(express.static('public'));

// Serve the login page when accessing /auth/authorize
app.get('/auth/authorize', (req, res) => {
    const { client_id, redirect_uri, response_type, scope, state } = req.query;

    console.log(`Received auth request with parameters: 
        client_id: ${client_id}, 
        redirect_uri: ${redirect_uri}, 
        response_type: ${response_type}, 
        scope: ${scope}, 
        state: ${state}`);

    // Create the login page HTML with the parameters included
    const loginPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Unity x Web Browser</title>
        </head>
        <body>
            <h1>Login with Ramper</h1>
            <button id="loginButton">Login</button>
            <script>
                document.getElementById('loginButton').addEventListener('click', function() {
                    // Simulate authentication process and fake data
                    const fakeData = {
                        code: 'dummy_code', // Fake authorization code
                        state: '${state}' // Use the original state
                    };

                    // Redirect back to the specified redirect URI with fake data
                    const redirectUrl = '${redirect_uri}?code=' + fakeData.code + '&state=' + fakeData.state;
                    window.location.href = redirectUrl; // Redirect to the original redirect URI
                });
            </script>
        </body>
        </html>
    `;

    // Send the login page as response
    res.send(loginPage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
