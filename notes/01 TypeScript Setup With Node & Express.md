```
npx tsc --init
```

```json
// tsconfig.json

"rootDir": "./src",
"outDir": "./dist",
"moduleResolution": "node",
```


```
npm init -y
npm i express
npm i -D nodemon typescript ts-node @types/node @types/express dotenv
```

```json
// package.json

"start": "node dist/server.js",
"dev": "nodemon src/server.ts",
"build": "npx tsc -p ."
```

```

```

```ts
// server.ts

import * as dotenv from 'dotenv'
import express from 'express'
const PORT = process.env.PORT || 5000

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`))
```
