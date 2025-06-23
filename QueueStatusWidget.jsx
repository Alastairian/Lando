// QueueStatusWidget.jsx import React, { useEffect, useState } from 'react'; import { flushQueue, getQueueStatus } from './offlineQueue';

const QueueStatusWidget = () => { const [queueSize, setQueueSize] = useState(0); const [isOnline, setIsOnline] = useState(navigator.onLine); const [visible, setVisible] = useState(true);

const refreshStatus = () => { const { pending } = getQueueStatus(); setQueueSize(pending); setVisible(pending > 0); };

useEffect(() => { refreshStatus();

const handleOnline = () => {
  setIsOnline(true);
  refreshStatus();
};
const handleOffline = () => {
  setIsOnline(false);
};

window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

const interval = setInterval(refreshStatus, 3000);

return () => {
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
  clearInterval(interval);
};

}, []);

if (!visible) return null;

return ( <div style={styles.widget}> <p style={styles.status}> <strong>Status:</strong> {isOnline ? '🟢 Online' : '🔴 Offline'}<br /> <strong>Pending:</strong> {queueSize} </p> <button onClick={flushQueue} style={styles.button}>Flush Now</button> </div> ); };

const styles = { widget: { position: 'fixed', top: '16px', right: '16px', padding: '12px', borderRadius: '12px', backgroundColor: '#282c34', color: 'white', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontSize: '0.9rem', }, status: { marginBottom: '8px', }, button: { padding: '6px 12px', border: 'none', borderRadius: '6px', backgroundColor: '#61dafb', cursor: 'pointer', color: '#000', fontWeight: 'bold' } };

export default QueueStatusWidget;

