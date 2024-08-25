
## Weather Man

Weather man is your everyday go to app for learning about current weather precisely for your location and also locations around the world.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Pre-requesites

1. Java Development Kit
2. JRE
3. node latest version
4. npm, npx latest version

## Get started

1. Install dependencies

   ```bash
   npx npm install
   ```

2. Start the app for android

   ```bash
    npx expo run:andriod
   ```
3. Connect the emulator or device via usb and make sure internet is available the build will automatically be run with latest bundle

4. To build a local android APK you can use eas build (but requires expo vendor login to linked to local)
   Below command created local development apk

   ```bash
   eas build -p android --profile preview --local
   ```

## App information


Weather apps providing weather and air quality information based on current location and location search options as well.
Information includes current temperature, humidity, dew, air quality etc. as provided from https://www.weatherapi.com/docs/ open source APIs.

### Architecture

The app is built using expo + react native. expo is the official framework recommended by Facebook for building hybrid apps as of 2024.
Expo provides support for all the libraries and capabilities of base react native, iOS, android, and web platforms.

1. Navigation: expo-router is used. it is leveraging file + directory-based routing where the file system definitions determine the screens. Here I have just used a simple drawer navigation with some settings in a custom drawer screen.

2. Design: using nativewind - a wrapper around tailwindcss which provides the same capabilities as tailwind but for multiplatform. development is much easier to start with since most of the styles are predefined classes, which helps in easily learning about the classes and using it. 

3. State management - using Zustand which is lightweight state management lib similar to redux but abstracts most of the boilerplate for developers. also used AsyncStorage (android) for caching the last updated data.

4. API -> using inbuilt fetch API which abstracts the corresponding native layer of network calls and provides results. Also added mappers to transform the response to the application needs.
added loading and error states for specific use cases.

5. Tests -> using jest for testing UI components with snapshot testing. mapper/transformers - added unit tests

6. Other inclusions
    -> Add Chart lib to show an hourly timeline of temperature for the current day
    -> Add settings option to switch between Celsius, kph units / Fahrenheit, mph units
    -> Add settings option to browse app in offline-only mode

### Assumptions

I have worked in both Android and web platforms so starting an app from scratch will really determine how stable the app is and how quickly development iteration and bug fixes can be done on top of that. With this in mind, I have tried to make sure that this app can be scaled production-ready in the future by taking time to set up the basics and skeleton of the app.

### Limitations/misses

1. Focused only on Android as a target platform due to time constraints. Ios and web can be supported if needed with minimal changes, Mainly limited by the developer lock-ins of apple developer platform and assumed that web is not really in scope.
2. Tried to implement dark theme but faced issue due to nativewind compatibilty issues and the time to fix will be dragged a bit. Granted this can be fixed with time.
3. Storing secrets like API keys needs to be present in some config file. right now its hardcoded in the app due to eas build issues and expo vendor lock-in preventing me from building an Android app in the traditional way to APK builds.
