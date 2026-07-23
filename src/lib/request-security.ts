export function isSameOriginRequest(request: Request) {
  const originValue = request.headers.get("origin");
  const hostValue =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!originValue || !hostValue) {
    return false;
  }

  try {
    const origin = new URL(originValue);
    const requestUrl = new URL(request.url);
    const expectedHost = hostValue.split(",")[0]?.trim();
    const forwardedProtocol = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      ?.trim();
    const expectedProtocol = forwardedProtocol
      ? `${forwardedProtocol}:`
      : requestUrl.protocol;

    return (
      Boolean(expectedHost) &&
      origin.host === expectedHost &&
      origin.protocol === expectedProtocol
    );
  } catch {
    return false;
  }
}
