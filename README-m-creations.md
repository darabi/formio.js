+# m-creations dev procedure for formio.js
+
+- Use mc-dev branch for commits
+- Before release, merge into mc-3.19 (or similar)
+- In that release branch, then do:
+
+    * Bump version:
+    
+      `ec package.json`
+
+    * Build and publish:
+    
+      `./node_modules/.bin/gulp build`
+
+    * Move all untracked files to ./tmp~/ (as it is ignored in .gitignore)
+
+      `npm run tag`
+
+      `npm publish lib --registry https://nexus.m-creations.net/repository/npm-hosted/`
+
+    * Move all untracked files back from ./tmp~

