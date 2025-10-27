'use client';

import { useEffect, useRef, useState } from 'react';
import { wsClient } from '@/lib/websocket';

export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(wsClient);

  useEffect(() => {
    const socket = socketRef.current.connect();
    
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    setConnected(socket.connected);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  return {
    connected,
    subscribeToToken: socketRef.current.subscribeToToken.bind(socketRef.current),
    unsubscribeFromToken: socketRef.current.unsubscribeFromToken.bind(socketRef.current),
    subscribeToSignals: socketRef.current.subscribeToSignals.bind(socketRef.current),
    unsubscribeFromSignals: socketRef.current.unsubscribeFromSignals.bind(socketRef.current),
    onPriceUpdate: socketRef.current.onPriceUpdate.bind(socketRef.current),
    onSignalEvent: socketRef.current.onSignalEvent.bind(socketRef.current),
    onNewReport: socketRef.current.onNewReport.bind(socketRef.current),
    offPriceUpdate: socketRef.current.offPriceUpdate.bind(socketRef.current),
    offSignalEvent: socketRef.current.offSignalEvent.bind(socketRef.current),
    offNewReport: socketRef.current.offNewReport.bind(socketRef.current),
  };
}

// Overloads: single token returns latest price data; multiple tokens invokes callback
export function useTokenSubscription(tokenAddress: string | null): any;
export function useTokenSubscription(tokenAddresses: string[], onUpdate: (update: any) => void): void;
export function useTokenSubscription(arg1: string | string[] | null, arg2?: (update: any) => void) {
  const { subscribeToToken, unsubscribeFromToken, onPriceUpdate, offPriceUpdate } = useWebSocket();

  // Single token mode: return latest price data
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    // Multiple tokens mode with callback
    if (Array.isArray(arg1) && typeof arg2 === 'function') {
      const tokenAddresses = arg1;
      const onUpdate = arg2;

      const handlePriceUpdate = (data: any) => {
        // Forward updates only for subscribed tokens
        const address = data.tokenAddress || data.address;
        if (!address || !tokenAddresses.includes(address)) return;
        onUpdate({ address, ...data });
      };

      tokenAddresses.forEach(addr => subscribeToToken(addr));
      onPriceUpdate(handlePriceUpdate);

      return () => {
        tokenAddresses.forEach(addr => unsubscribeFromToken(addr));
        offPriceUpdate(handlePriceUpdate);
      };
    }

    // Single token mode
    const tokenAddress = typeof arg1 === 'string' ? arg1 : null;
    if (!tokenAddress) return;

    const handlePriceUpdate = (data: any) => {
      const address = data.tokenAddress || data.address;
      if (address === tokenAddress) {
        setPriceData(data);
      }
    };

    subscribeToToken(tokenAddress);
    onPriceUpdate(handlePriceUpdate);

    return () => {
      unsubscribeFromToken(tokenAddress);
      offPriceUpdate(handlePriceUpdate);
    };
  }, [arg1, arg2, subscribeToToken, unsubscribeFromToken, onPriceUpdate, offPriceUpdate]);

  return priceData;
}

export function useSignalSubscription(onSignal?: (data: any) => void) {
  const { subscribeToSignals, unsubscribeFromSignals, onSignalEvent, offSignalEvent } = useWebSocket();
  const [signalEvents, setSignalEvents] = useState<any[]>([]);

  useEffect(() => {
    const handleSignalEvent = (data: any) => {
      if (onSignal) {
        onSignal(data);
      } else {
        setSignalEvents(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 events
      }
    };

    subscribeToSignals();
    onSignalEvent(handleSignalEvent);

    return () => {
      unsubscribeFromSignals();
      offSignalEvent(handleSignalEvent);
    };
  }, [subscribeToSignals, unsubscribeFromSignals, onSignalEvent, offSignalEvent, onSignal]);

  return signalEvents;
}
