You can use Capacitor’s CLI to bypass the debugging process by running the app without debugging:
`npx cap run ios --no-debug --no-build`

also we can disable the debuuger on Xcode if we faced any issue:

3. Disable Debugger in Xcode

If you want to run the app via Xcode but avoid attaching the debugger:

1. In Xcode, select your target scheme (e.g., App).
2. Go to Product > Scheme > Edit Scheme.
3. In the Run section:
   • Uncheck Debug executable.
4. Build and run the app:
   • Use Product > Run (or press Cmd + R).

This allows the app to launch without attempting to attach the debugger.

Manually build and run your project in Xcode instead of using npx cap run ios.
`npx cap open ios`

### Build and run the app for Android and iOS

You can build and run the app using Ionic CLI or npm/npx commands.

**Using Ionic CLI:**

1. Build the web app: `ionic build`
2. Build the app for Android: `ionic cap build android`
3. Build the app for iOS: `ionic cap build ios`
4. Run the app for Android: `ionic cap run android`
5. Run the app for iOS: `ionic cap run ios`
6. Open the project in Android Studio: `ionic cap open android`
7. Open the project in Xcode: `ionic cap open ios`

Enable automatic updates of the Android build when you make changes to your app
`ionic capacitor run android --livereload`
`ionic capacitor run ios --livereload`

**Using npm/npx:**

1. Build the web app: `npm run build`
2. Build the app for Android: `npx cap build android`
3. Build the app for iOS: `npx cap build ios`
4. Run the app for Android: `npx cap run android`
5. Run the app for iOS: `npx cap run ios`
6. Open the project in Android Studio: `npx cap open android`
7. Open the project in Xcode: `npx cap open ios`

8. Run the app for iOS: `ionic cap run ios --livereload --external --verbose