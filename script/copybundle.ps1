# Copy-Item -Path "build\react\bundle\bundle_main.js" -Destination "src\electron\main.js"
Copy-Item -Path "build\react\bundle\bundle_react_scss_ui.js" -Destination "src\frontend\public\bundle_react_scss_ui.js"
Copy-Item -Path "build\react\bundle\bundle_react_scss_ui.js" -Destination "src\frontend\public\public_scss_ui\bundle_react_scss_ui.js"
Copy-Item -Path "build\react\bundle\bundle_react_material_ui.js" -Destination "src\frontend\public\bundle_react_material_ui.js"
Copy-Item -Path "build\react\bundle\bundle_react_material_ui.js" -Destination "src\frontend\public\public_material_ui\bundle_react_material_ui.js"