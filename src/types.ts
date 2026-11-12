export type ItemStatus = 'Active' | 'Blocked' | 'Pending' | 'Approved' | 'Rejected' | 'Completed';

export interface AdminItem {
  id: string;
  name: string;
  description: string;
  amount?: string;
  rawAmount?: number;
  method?: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | string;
  status: ItemStatus;
  date?: string;
  phone?: string;
  email?: string;
  trxId?: string;
  accountNumber?: string;
  nidNumber?: string;
  documentType?: 'National ID' | 'Passport' | 'Driving License';
  userId?: string;
}

export interface InvestmentPlan {
  id: string;
  title: string;
  rate: string;
  periodDays: number;
  dailyPercent: number;
  minAmount: string;
  maxAmount: string;
  tag: string;
  isActive: boolean;
}

export interface InvestmentTier {
  id: string;
  investAmount: number;
  dailyProfit: number;
  totalProfit10Days: number;
  durationDays: number;
  labelBangla: string;
}

export interface UserActivePlan {
  id: string;
  planTitle: string;
  investedAmount: number;
  dailyProfit: number;
  totalProfit10Days: number;
  daysCompleted: number;
  totalDays: number;
  startDate: string;
  nextPayout: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  walletBalance: number;
  totalInvested: number;
  totalProfit: number;
  kycStatus: 'Unverified' | 'Pending' | 'Approved' | 'Rejected';
  nidNumber?: string;
  is2FAEnabled: boolean;
  isLoggedIn: boolean;
  activePlans: UserActivePlan[];
}

export interface MerchantNumbers {
  bkashMerchant: string;
  bkashType: 'Merchant' | 'Personal' | 'Agent';
  nagadMerchant: string;
  nagadType: 'Merchant' | 'Personal';
  rocketMerchant: string;
  noticeBangla: string;
  noticeEnglish: string;
  minDeposit: number;
  minWithdraw: number;
}

export interface SecurityLog {
  id: string;
  event: string;
  level: 'info' | 'warning' | 'alert';
  timestamp: string;
  ip: string;
  location: string;
  device: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  targetId?: string;
  details?: string;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'support' | 'system';
  text: string;
  timestamp: string;
}

export type TabType = 
  | 'Overview'
  | 'Users'
  | 'KYC'
  | 'Deposit'
  | 'Withdrawal'
  | 'Transactions'
  | 'MerchantNumbers'
  | 'Gmail'
  | 'Security'
  | 'Audit'
  | 'Plans';

export type AppMode = 'user' | 'admin';
