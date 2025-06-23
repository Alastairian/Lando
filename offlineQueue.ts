interface Submission { id: string; inputData: any; label: 'ripe' | 'unripe'; timestamp: number; }

const QUEUE_KEY = 'offlineSubmissionQueue';

export function addToQueue(submission: Submission) {
  const queue = getQueue();
  queue.push(submission);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function getQueue(): Submission[] {
  const raw = localStorage.getItem(QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearQueue() {
  localStorage.setItem(QUEUE_KEY, JSON.stringify([]));
}

export async function flushQueue() {
  const queue = getQueue();
  const remaining: Submission[] = [];
  for (const submission of queue) {
    try {
      const res = await fetch('/api/simulated-train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      if (!res.ok) throw new Error('Failed to send');
    } catch (err) {
      console.error('Retry later:', err);
      remaining.push(submission);
    }
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
}

export function initQueueListener() {
  window.addEventListener('online', () => { flushQueue(); });
}

// UI integration (status indicator)
export function getQueueStatus() {
  const queue = getQueue();
  return { pending: queue.length, isOnline: navigator.onLine };
}

// Background sync via Service Worker registration (PWA only)
export async function registerSyncTag() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const reg = await navigator.serviceWorker.ready;
    try {
      await reg.sync.register('sync-iaiips-queue');
    } catch (err) {
      console.warn('Sync tag failed:', err);
    }
  }
}