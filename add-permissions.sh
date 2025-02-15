#!/bin/bash

# Path to AndroidManifest.xml
MANIFEST_PATH="android/app/src/main/AndroidManifest.xml"

# Function to add permission before </manifest>
add_permission() {
  local permission=$1
  if ! grep -q "$permission" "$MANIFEST_PATH"; then
    echo "Adding $permission..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS `sed` requires an empty string after `-i`
      sed -i '' "/<\/manifest>/i\\
    \\
    <uses-permission android:name=\"$permission\"/>\\
    " "$MANIFEST_PATH"
    else
      # Linux version
      sed -i "/<\/manifest>/i \\
    <uses-permission android:name=\"$permission\"/>\\
    " "$MANIFEST_PATH"
    fi
  fi
}

# Add required permissions before </manifest>
add_permission "android.permission.READ_CONTACTS"
add_permission "android.permission.WRITE_CONTACTS"

echo "Permissions added successfully!"
