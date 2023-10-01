// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

export function serverError() {
    return new Response('Internal Server error', { status: 500 });
};

export function notFound() {
    return new Response('Not Found', { status: 404 });
};

export function badRequest() {
    return new Response('Bad Request', { status: 400 });
};

export function notAllowed() {
    return new Response('Method not Allowed', { status: 405 });
};

export function badEntity() {
    return new Response('Unprocessable Entity', { status: 422 });
};

export function dataConflict() {
    return new Response('Data conflicts with current resource', { status: 409 });
};

export function serverRoot() {
    return new Response('Server is up and running!', { status: 200 });
};

export function returnSuccess() {
    return new Response('Request Permitted!', { status: 200 });
};

export function returnJson(data) {
    return new Response(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};