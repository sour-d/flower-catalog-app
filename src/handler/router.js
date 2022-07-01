class Router {
  #routes;
  #defaultHandler;

  constructor(defaultHandler) {
    this.#routes = {
      GET: []
    };
    this.#defaultHandler = defaultHandler;
  }

  GET(url, handler,) {
    this.#routes.GET.push({ method: 'GET', url, handler });
  }

  #findRoute(url, method) {
    return this.#routes[method].filter(route => route.url === url);
  }

  handle(request, response) {
    const routes = this.#findRoute(request.url.pathname, request.method);
    for (const route of routes) {
      if (route.method === request.method) {
        return route.handler(request, response);
      }
    }

    this.#defaultHandler(request, response);
  }
}

module.exports = { Router };
