import React, { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onVerify, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const siteKey = (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

  useEffect(() => {
    const isDev = (import.meta as any).env?.DEV;
    // If no sitekey in local dev, provide dev token fallback immediately
    if (isDev && siteKey === '1x00000000000000000000AA') {
      onVerify('dev-turnstile-token-verified');
    }

    // Check if turnstile script is already present
    if (window.turnstile) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    if (loaded && window.turnstile && containerRef.current && !widgetIdRef.current) {
      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token: string) => {
            onVerify(token);
          },
          'expired-callback': () => {
            onVerify('');
          },
          'error-callback': () => {
            // Fallback for dev mode
            if ((import.meta as any).env?.DEV) {
              onVerify('dev-turnstile-token-verified');
            }
          }
        });
        widgetIdRef.current = id;
      } catch (e) {
        console.warn("Turnstile render warning:", e);
        if ((import.meta as any).env?.DEV) {
          onVerify('dev-turnstile-token-verified');
        }
      }
    }
  }, [loaded, siteKey]);

  return (
    <div className={`my-2 flex flex-col items-center justify-center ${className}`}>
      <div ref={containerRef} className="cf-turnstile min-h-[65px]" />
    </div>
  );
};
