/**
 * Simple helpers to mock fetch responses per endpoint.
 */
export function mockListOnce(items = []) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => items,
  });
}

export function mockAddOnce(item) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => item,
  });
}

export function mockToggleOnce(item) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => item,
  });
}

export function mockDeleteOnce() {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => ({}),
  });
}
