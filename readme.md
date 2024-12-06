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