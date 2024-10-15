package com.nes.unityxwebbrowser;

import com.unity3d.player.UnityPlayerActivity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

public class CustomActivity extends UnityPlayerActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("____________onCreate", "____________onCreate");
        handleIntent(getIntent()); // Handle any intent that started this activity
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d("____________onNewIntent", "____________onNewIntent");
        handleIntent(intent); // Handle new intents
    }

    private void handleIntent(Intent intent) {
        Uri data = intent.getData();
        if (data != null) {
            String url = data.toString();
            // Call the Unity method to handle the redirect
            UnityPlayer.UnityPlayerActivity.UnityPlayer.UnitySendMessage("LoginHandler", "HandleRedirect", url);
        }
    }
}
