class Router {
  #routes;
  #defaultHandler;

  constructor(defaultHandler) {
    this.#routes = {
      GET: [],
      POST: []
    };
    this.#defaultHandler = defaultHandler;
  }

  GET(url, handler,) {
    this.#routes.GET.push({ method: 'GET', url, handler });
  }
  POST(url, handler,) {
    this.#routes.POST.push({ method: 'POST', url, handler });
  }

  #findRoute(url, method) {
    const routes = this.#routes[method.toUpperCase()];
    return routes.filter(route => route.url === url);
  }

  handle(request, response, sessions) {
    const routes = this.#findRoute(request.url.pathname, request.method);
    for (const route of routes) {
      if (route.method === request.method) {
        return route.handler(request, response, sessions);
      }
    }

    this.#defaultHandler(request, response, sessions);
  }
}

module.exports = { Router };
