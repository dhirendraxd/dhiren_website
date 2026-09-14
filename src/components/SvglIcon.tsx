import { useEffect, useState, type ReactNode } from "react";

type ThemeRoute = { light: string; dark: string };
type SvglRecord = { title: string; route: string | ThemeRoute };

const API_URL = "https://api.svgl.app";
const routeCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string | undefined>>();

const getRoute = (route: string | ThemeRoute) => {
  if (typeof route === "string") return route;
  return document.documentElement.classList.contains("dark") ? route.dark : route.light;
};

const fetchRoute = async (name: string) => {
  const key = name.trim().toLowerCase();
  const cachedRoute = routeCache.get(key);
  if (cachedRoute) return cachedRoute;

  const pendingRequest = pendingRequests.get(key);
  if (pendingRequest) return pendingRequest;

  const request = fetch(`${API_URL}?search=${encodeURIComponent(name)}`)
    .then((response) => (response.ok ? response.json() : []))
    .then((records: SvglRecord[]) => {
      const match = records.find((record) => record.title.toLowerCase() === key) ?? records[0];
      if (!match) return undefined;
      const route = getRoute(match.route);
      routeCache.set(key, route);
      return route;
    })
    .catch(() => undefined)
    .finally(() => pendingRequests.delete(key));

  pendingRequests.set(key, request);
  return request;
};

type SvglIconProps = {
  name: string;
  alt?: string;
  fallback?: ReactNode;
  className?: string;
};

const SvglIcon = ({ name, alt = name, fallback, className = "h-5 w-5" }: SvglIconProps) => {
  const [route, setRoute] = useState(() => routeCache.get(name.trim().toLowerCase()));

  useEffect(() => {
    let active = true;
    fetchRoute(name).then((nextRoute) => {
      if (active && nextRoute) setRoute(nextRoute);
    });
    return () => {
      active = false;
    };
  }, [name]);

  if (!route) return <>{fallback}</>;
  return <img src={route} alt={alt} className={className} loading="lazy" decoding="async" />;
};

export default SvglIcon;