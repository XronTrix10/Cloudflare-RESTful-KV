<!-- copyright 2023 © Xron Trix | https://github.com/Xrontrix10 -->

<h1 align='center'>Serverless RESTful API</h1>

<p align='center'>Built for <i>Cloudflare Workers</i>. uses <i>Cloudflare KV</i> as Database</p>
<p align='center'><strong>Blazing Fast Serverless 🔥</strong></p>

---

<h2> Features 🚀</h2>

<ul>
   <li>TOKEN based Authentication System</li>
   <li>Every type Error Handling</li>
   <li>Real time http response code</li>
</ul>

<details>

   <summary>
      <h3>Authentication</h3>
   </summary>

   Need to pass `Authorization` header along with AUTH_TOKEN. Otherwise it will return `Unauthorized (http - 401)`


   <h4>Example</h4>

   <pre>
      curl -x POST https://backend.workers.dev/faculty
         -H 'Authorization: AUTH_TOKEN'  
         -d '{name: "Xron Trix"}'</pre>

</details>

<details>
   <summary>
      <h3>Available HTTP Responses</h3>
   </summary>

   <ul>
      <li><code>200</code> - OK</li>
      <li><code>204</code> - No Content</li>
      <li><code>400</code> - Bad Request</li>
      <li><code>401</code> - Unauthorized</li>
      <li><code>404</code> - Not Found</li>
      <li><code>405</code> - Method not Allowed</li>
      <li><code>409</code> - Data conflicts</li>
      <li><code>422</code> - Unprocessable Entity</li>
      <li><code>500</code> - Server error</li>
   </ul>
</details>


<details>

   <summary>
      <h3>Allowed HTTP Methods</h3>
   </summary>

   - `GET`
   - `POST`
   - `PUT`
   - `DELETE`

</details>


<details>

   <summary>
      <h3>Api Routes</h3>
   </summary>

   - `/` - Check if Server is Online
   - `/faculty` - Access Faculty Members Data
   - `/member` - Access Regular Members Data
   - `/event` - Access Event Data

</details>


<details>

   <summary>
      <h3>JSON Data Formats</h3>
   </summary>

   <h4>Unique ID Will be Auto Added on Creation on Each Data</h4>
   <h4>Each Field is Required on POST request</h4>

   - Faculty

      <pre>
      {
         name: "String",
         role: "String",
         image: "String",
         mobile: "String"
      }</pre>

   - Member

      <pre>
      {
         name: "String",
         role: "String",
         image: "String",
         mobile: "String",
         roll: "String"
      }</pre>

   - Event

      <pre>
      {
         title: "String",
         page: "String",
         image: "String",
         teams: [Array]   # Optional in Creation
      }</pre>

</details>


<details>

   <summary>
      <h3>CRUD Operation</h3>
   </summary>

   <h4>Accepts</h4>

   - `POST /<API_ROUTE> {json in body}` - Create Single Data
   - `GET /<API_ROUTE>` - Read All Data
   - `GET /<API_ROUTE>/<ID>` - Read Single Data
   - `PUT /<API_ROUTE>/<ID>` - Update Single Data
   - `DELETE /<API_ROUTE>` - Delete All Data
   - `DELETE /<API_ROUTE>/<ID>` - Delete Single Data

   <h4>Returns</h4>

   - Create

      - Returns `http - 200` ID and Collection of new data in JSON on Success  
      - Returns `http - 409` on Data Conflict
      - Returns `http - 422` on Unprocessable Entity
      - Returns `http - 500` on Creation error

   - Read

      - Returns `http - 200` requested data in JSON on Success 
      - Returns `http - 404` on Not Found

   - Update

      - Returns `http - 200` Request Permitted! on Success 
      - Returns `http - 404` on Not Found
      - Returns `http - 422` on Unprocessable Entity
      - Returns `http - 500` on Update error

   - Delete

      - Returns `http - 200` Request Permitted! on Success 
      - Returns `http - 404` on Not Found
      - Returns `http - 500` on Update error

</details>

---

<h2> Deploy Step by Step 🦀 </h2>

<details>

   <summary>
      <h3>1. Set up Cloudflare</h3>
   </summary>

   - Create a Cloudflare Account if haven't already 🙂
   - Create a subdomain for your workers pages.

      Your Projects will be visible as `https://project.SUB_DOMAIN.workers.dev`

</details>

<details>

   <summary>
      <h3>2. Set up Project</h3>
   </summary>

   - Install node.js if haven't already 🙂
   - Install Wrangler as

      <pre>npm install wrangler --save-dev</pre>

   - Login with Cloudflare Account

      <pre>wrangler login</pre>

   - Clone This Repository

      <pre>git clone https://github.com/XronTrix10/Cloudflare-RESTful-KV.git</pre>

   - Rename `wrangler.example.toml` file to `wrangler.toml`
   - Rename `example.dev.vars` file to `.dev.vars`
   - Put a secret Auth Token in `.dev.vars` file. This Token will be used to Authenticate You with Your API
   - Put the auth token in Wrangler as well

      <pre>wrangler secret put AUTH_TOKEN</pre>

      Enter The Same Token you Placed inside `.dev.vars` file

   - Install dependencies

      <pre>npm install</pre>

   - Create a KV Namespace in Cloudflare

      <pre>wrangler kv:namespace create YOUR_NAMESPACE</pre>
      
      <p><strong>NOTE:</strong> Replace your own desired Database Name with <code>YOUR_NAMESPACE</code></p>
      
      <p>On Hitting Enter, an ID of the created namespace will be returned.</p>

   - Put Binding in `wrangler.toml` file

      - Replace <NAMESPACE_ID> with the ID you got on namespace Creation

      <p><strong>NOTE:</strong> ❌ Don't Edit the Binding Name <code>binding = "DATABASE"</code></p>

</details>

<details>

   <summary>
      <h3>3. Deploy Project</h3>
   </summary>

   - To Deploy/Test in Local

      <pre>wrangler dev</pre>

   - To Deploy in Cloudflare

      <pre>wrangler deploy</pre>

      You can change the project name by editing the `name` field from `wrangler.toml` file before deploying your project


</details>

---

<h2>Hosted Demo 🐬</h2>

Live @[Cloudflare](https://restapi-kv-demo.xrontrix.workers.dev)

### Test

<pre>curl https://restapi-kv-demo.xrontrix.workers.dev</pre>

### Returns

<pre>Server is up and running!</pre>