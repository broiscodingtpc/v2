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

export function useTokenSubscription(tokenAddress: string | null) {
  const { subscribeToToken, unsubscribeFromToken, onPriceUpdate, offPriceUpdate } = useWebSocket();
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    if (!tokenAddress) return;

    const handlePriceUpdate = (data: any) => {
      if (data.tokenAddress === tokenAddress) {
        setPriceData(data);
      }
    };

    subscribeToToken(tokenAddress);
    onPriceUpdate(handlePriceUpdate);

    return () => {
      unsubscribeFromToken(tokenAddress);
      offPriceUpdate(handlePriceUpdate);
    };
  }, [tokenAddress, subscribeToToken, unsubscribeFromToken, onPriceUpdate, offPriceUpdate]);

  return priceData;
}

export function useSignalSubscription() {
  const { subscribeToSignals, unsubscribeFromSignals, onSignalEvent, offSignalEvent } = useWebSocket();
  const [signalEvents, setSignalEvents] = useState<any[]>([]);

  useEffect(() => {
    const handleSignalEvent = (data: any) => {
      setSignalEvents(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 events
    };

    subscribeToSignals();
    onSignalEvent(handleSignalEvent);

    return () => {
      unsubscribeFromSignals();
      offSignalEvent(handleSignalEvent);
    };
  }, [subscribeToSignals, unsubscribeFromSignals, onSignalEvent, offSignalEvent]);

  return signalEvents;
}