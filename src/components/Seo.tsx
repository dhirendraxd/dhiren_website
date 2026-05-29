import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

const SITE_NAME = "Dhirendra Singh Dhami Portfolio";
const BASE_URL = "https://dhirendrasinghdhami.com.np";

const setTag = (selector: string, attributes: Record<string, string>) => {
  const existing = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  const tag = existing ?? document.createElement(selector.startsWith("link") ? "link" : "meta");

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });

  if (!existing) {
    document.head.appendChild(tag);
  }
};

const normalizeUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const inferImageType = (url: string) => {
  if (url.startsWith("data:image/svg+xml")) {
    return "image/svg+xml";
  }

  if (url.includes(".webp")) {
    return "image/webp";
  }

  if (url.includes(".png")) {
    return "image/png";
  }

  if (url.includes(".jpg") || url.includes(".jpeg")) {
    return "image/jpeg";
  }

  return "image/jpeg";
};

const removeTag = (selector: string) => {
  const existing = document.head.querySelector(selector);
  if (existing) {
    existing.remove();
  }
};

const Seo = ({ title, description, canonicalPath, image, imageAlt, type = "website", noIndex = false }: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = normalizeUrl(canonicalPath);
    const imageType = image ? inferImageType(image) : null;

    document.title = title;
    setTag('meta[name="description"]', { name: "description", content: description });
    setTag('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    });
    setTag('meta[property="og:type"]', { property: "og:type", content: type });
    setTag('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setTag('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setTag('meta[property="og:title"]', { property: "og:title", content: title });
    setTag('meta[property="og:description"]', { property: "og:description", content: description });
    setTag('meta[name="twitter:card"]', { name: "twitter:card", content: image ? "summary_large_image" : "summary" });
    setTag('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setTag('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setTag('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    setTag('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });

    if (image) {
      setTag('meta[property="og:image"]', { property: "og:image", content: image });
      setTag('meta[property="og:image:alt"]', { property: "og:image:alt", content: imageAlt ?? title });
      if (imageType) {
        setTag('meta[property="og:image:type"]', { property: "og:image:type", content: imageType });
      }
      setTag('meta[name="twitter:image"]', { name: "twitter:image", content: image });
      setTag('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: imageAlt ?? title });

      if (!image.startsWith("data:")) {
        setTag('link[data-seo="preload-image"]', {
          rel: "preload",
          as: "image",
          href: image,
          type: imageType ?? "image/jpeg",
          "data-seo": "preload-image",
        });
      }
    } else {
      removeTag('meta[property="og:image"]');
      removeTag('meta[property="og:image:alt"]');
      removeTag('meta[property="og:image:type"]');
      removeTag('meta[name="twitter:image"]');
      removeTag('meta[name="twitter:image:alt"]');
      removeTag('link[data-seo="preload-image"]');
    }
  }, [canonicalPath, description, image, imageAlt, noIndex, title, type]);

  return null;
};

export default Seo;