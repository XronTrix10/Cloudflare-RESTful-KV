<h1 align='center'>Serverless RESTful API</h1>

<p align='center'>Built for Cloudflare Workers. uses Cloudflare <b>KV</b> as Database</p>
<p align='center'><i>Blazing Fast Serverless 🔥</i></p>

---

## Authentication

Need to pass `Authorization` header along with AUTH_TOKEN. Otherwise it will return `Unauthorized`

#### Example

<pre>
curl -x POST https://backend.workers.dev/faculty
   -H 'Authorization: AUTH_TOKEN'  
   -d '{name: "Xron Trix"}'
</pre>

## HTTP Methods Allowed

- `GET`, `POST`, `PUT`, `DELETE`

### Route /faculty

- get all faculty `GET /faculty`
- get one faculty `GET /faculty/<ID>`
- update one faculty `PUT /faculty/<ID>`
- insert new Faculty `POST /faculty`
- delete one Faculty `DELETE /faculty/<ID>`
- delete entire Faculty `DELETE /faculty`

## Demo

Live @[Cloudflare](https://cybertron-backend.vilgax.workers.dev)

### Test

<pre>curl https://cybertron-backend.vilgax.workers.dev</pre>

### Returns

<pre>Server is up and running!</pre>