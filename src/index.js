// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { notAllowed } from './handler/res-handler'
import { respondRequest } from './handler/req-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { method, url } = request

  const path = new URL(url).pathname // Get the pathname from the URL

  if (method === 'POST') {

    const respond = await respondRequest(request, path, true, false, false, false);
    return respond;
  }

  else if (method === 'GET') {

    const respond = await respondRequest(request, path, false, true, false, false);
    return respond;
  }
  
  else if (method === 'PUT') {

    const respond = await respondRequest(request, path, false, false, true, false);
    return respond;
  }
  
  else if (method === 'DELETE') {

    const respond = await respondRequest(request, path, false, false, false, true);
    return respond;
  }
  
  else {
    return notAllowed();
  }
}