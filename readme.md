You can use Capacitor’s CLI to bypass the debugging process by running the app without debugging:

`npx cap run ios --no-debug --no-build`

also we can disable the debugger on Xcode if we faced any issue:

If you want to run the app via Xcode but avoid attaching the debugger:

1. In Xcode, select your target scheme (e.g., App).
2. Go to Product > Scheme > Edit Scheme.
3. In the Run section:
   • Uncheck Debug executable.
4. Build and run the app:
   • Use Product > Run (or press Cmd + R).

This allows the app to launch without attempting to attach the debugger.

Manually build and run your project in Xcode instead of using `npx cap run ios`.
`npx cap open ios`

### Build and run the app for Android and iOS

You can build and run the app using Ionic CLI or npm/npx commands.

**Using Ionic CLI:**

Enable automatic updates of the Android/IOS build when you make changes to your app
`ionic capacitor run android --livereload`
`ionic capacitor run ios --livereload`

**Using npm/npx CLI:**

1. Build the web app: `ionic build` | `npm run build`
2. Build the app for Android: `ionic cap build android` | `npx cap build android`
3. Build the app for iOS: `ionic cap build ios` | `npx cap build ios`
4. Run the app for Android: `ionic cap run android` | `npx cap run android`
5. Run the app for iOS: `ionic cap run ios` | `npx cap run ios`
6. Open the project in Android Studio: `ionic cap open android` | `npx cap open android`
7. Open the project in Xcode: `ionic cap open ios` | `npx cap open ios`
8. Run the app for iOS with livereload: `ionic cap run ios --livereload --external`
9. Run the app for Android with livereload: `ionic cap run android --livereload --external`

# openapi-generator

- we will need swagger to be setup on BE
- the generator will need also java to be installed (you can use docker for it)
- also we need to add all related swagger annotations needed on BE e.g. @ApiResponse, @ApiProp, @ApiResponse which make
  the def doc correct
-

**Using Docker for open api generator tool (Optional) otherwise install `@openapitools/openapi-generator-cli`**

``
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/3_0/petstore.yaml \
    -g typescript-axios \
    -o /local/generated
``

**Install OpenJDK 17**
(we may need java v17 to make the generator works fine)

## macOS (Homebrew)

`brew install openjdk@17`
and then follow this steps provided by the cli:
For the system Java wrappers to find this JDK, symlink it with
`sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk`

openjdk@17 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have openjdk@17 first in your PATH, run:
`echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"'` >> ~/.zshrc

For compilers to find openjdk@17 you may need to set:
`export CPPFLAGS="-I/opt/homebrew/opt/openjdk@17/include"`
``

**Start the frontend app:**

1. Restart the DB docker container `npm run db:dev:restart`
2. Start the backend app `npm run start:dev`
3. Check backend api is reachable and BE is running
4. Check the swagger doc is reachable and correct `http://localhost:3000/api/docs-json`
5. Run the openapi generator to generate the api client `npm run api`
6. Start the FE app in the browser: `ionic serve`

## Scripts

### Start Frontend App

- `npm run api`: Generate the API client using the OpenAPI Generator.
- `ionic serve`: Start the application in development mode with hot-reloading.
- `npm run build`: Build the application.
- `ìonic cap run android`: Run the application on an Android device or emulator.
- `ionic cap run ios`: Run the application on an iOS device or emulator.
