using System;
using UnityEngine;
using UnityEngine.UI;

public class LoginHandler : MonoBehaviour
{
    public Button loginButton;
    public string loginUrl = "http://localhost:1939/auth/authorize";
    public string clientId = "dummy_client_id"; // Replace with your actual client ID
    public string redirectUri = "unityxwebbrowser://callback"; // Your custom URL scheme

    void Start()
    {
        loginButton.onClick.AddListener(OnLoginButtonClicked);
        // Add a listener for receiving intents
    }

    private void OnLoginButtonClicked()
    {
        // Construct the login URL with parameters
        string url = $"{loginUrl}?client_id={clientId}&redirect_uri={redirectUri}&response_type=code&scope=user.info&state=random_state_string";
        
        // Open the URL in the default web browser
        Application.OpenURL(url);
    }

    // Method to be called when a redirect occurs
    public void HandleRedirect(string url)
    {
        Uri uri = new Uri(url);
        string code = uri.GetQueryParameter("code");
        string state = uri.GetQueryParameter("state");

        // Print the received data
        Debug.Log($"___________Received Code: {code}");
        Debug.Log($"___________Received State: {state}");
    }
}

// Extension method to simplify query parameter retrieval
public static class UriExtensions
{
    public static string GetQueryParameter(this Uri uri, string key)
    {
        var query = System.Web.HttpUtility.ParseQueryString(uri.Query);
        return query[key];
    }
}
