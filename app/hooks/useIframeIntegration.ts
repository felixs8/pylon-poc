"use client";

import { useEffect, useRef, useCallback } from 'react';

export interface IframeHeightMessage {
  type: 'pylon-configurator-height';
  height: number;
  id?: string;
}

export function useIframeIntegration() {
  const lastHeightRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect if running in iframe
  const isInIframe = typeof window !== 'undefined' && window.parent !== window;

  // Calculate total content height
  const calculateHeight = useCallback((): number => {
    if (typeof window === 'undefined') return 0;

    // Get the document height including all content
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    return height;
  }, []);

  // Send height message to parent with debouncing
  const sendHeightMessage = useCallback((height?: number) => {
    if (!isInIframe) return;

    const currentHeight = height ?? calculateHeight();
    
    // Only send if height changed significantly (avoid spam)
    if (Math.abs(currentHeight - lastHeightRef.current) < 5) return;

    lastHeightRef.current = currentHeight;

    try {
      const message: IframeHeightMessage = {
        type: 'pylon-configurator-height',
        height: currentHeight,
      };

      window.parent.postMessage(message, '*');
    } catch (error) {
      // Graceful fallback - log error but don't break functionality
      console.warn('Failed to send height message to parent:', error);
    }
  }, [isInIframe, calculateHeight]);

  // Debounced height update
  const updateHeight = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      sendHeightMessage();
    }, 100); // 100ms debounce
  }, [sendHeightMessage]);

  // Setup ResizeObserver to monitor content changes
  useEffect(() => {
    if (!isInIframe) return;

    // Send initial height immediately
    const sendInitialHeight = () => {
      const initialHeight = Math.max(calculateHeight(), 800); // Minimum 800px to avoid tiny iframe
      sendHeightMessage(initialHeight);
    };

    // Send initial height after a short delay to ensure content is rendered
    setTimeout(sendInitialHeight, 100);

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    // Observe the document body for size changes
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Initial height message
    setTimeout(() => {
      sendHeightMessage();
    }, 100);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInIframe, updateHeight, sendHeightMessage, calculateHeight]);

  // Listen for window resize events (orientation changes)
  useEffect(() => {
    if (!isInIframe) return;

    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isInIframe, updateHeight]);

  // Manual height update trigger for configuration changes
  const triggerHeightUpdate = useCallback(() => {
    if (isInIframe) {
      updateHeight();
    }
  }, [isInIframe, updateHeight]);

  // Mark as loaded for non-iframe context immediately
  useEffect(() => {
    if (!isInIframe) {
      // No loading state needed
    }
  }, [isInIframe]);

  return {
    isInIframe,
    triggerHeightUpdate,
    sendHeightMessage,
  };
}
