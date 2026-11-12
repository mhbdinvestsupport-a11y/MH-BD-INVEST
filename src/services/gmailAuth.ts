import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
];

const provider = new GoogleAuthProvider();
GMAIL_SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory token cache (never stored in localStorage or sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Google sign-in succeeded but no access token was returned.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Auth Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const googleSignOut = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Base64Url encoder compatible with UTF-8
function base64UrlEncode(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export interface GmailSendParams {
  to: string;
  subject: string;
  body: string;
  fromName?: string;
}

export async function sendGmailMessage(
  accessToken: string,
  params: GmailSendParams
): Promise<{ id: string; threadId: string }> {
  const emailContent = [
    `To: ${params.to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    params.body,
  ].join('\r\n');

  const raw = base64UrlEncode(emailContent);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to send email (${response.status})`);
  }

  return response.json();
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
}

export async function fetchGmailMessages(
  accessToken: string,
  maxResults: number = 10
): Promise<GmailMessageSummary[]> {
  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!listRes.ok) {
    throw new Error(`Failed to list messages (${listRes.status})`);
  }

  const listData = await listRes.json();
  const messageRefs: { id: string; threadId: string }[] = listData.messages || [];

  // Fetch details for the first few messages
  const messageSummaries: GmailMessageSummary[] = await Promise.all(
    messageRefs.slice(0, maxResults).map(async (ref) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${ref.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!detailRes.ok) return { id: ref.id, threadId: ref.threadId, snippet: 'No preview' };
        const data = await detailRes.json();
        const headers: { name: string; value: string }[] = data.payload?.headers || [];
        const subject = headers.find((h) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
        const from = headers.find((h) => h.name.toLowerCase() === 'from')?.value || 'Unknown';
        const to = headers.find((h) => h.name.toLowerCase() === 'to')?.value || '';
        const date = headers.find((h) => h.name.toLowerCase() === 'date')?.value || '';

        return {
          id: ref.id,
          threadId: ref.threadId,
          snippet: data.snippet || '',
          subject,
          from,
          to,
          date,
        };
      } catch {
        return { id: ref.id, threadId: ref.threadId, snippet: 'Preview unavailable' };
      }
    })
  );

  return messageSummaries;
}
