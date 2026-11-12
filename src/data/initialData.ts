import { 
  AdminItem, 
  InvestmentPlan, 
  InvestmentTier,
  SecurityLog, 
  AuditLog, 
  MerchantNumbers, 
  UserAccount, 
  SupportMessage 
} from '../types';

export const INITIAL_MERCHANT_NUMBERS: MerchantNumbers = {
  bkashMerchant: '01712-345678',
  bkashType: 'Merchant',
  nagadMerchant: '01819-876543',
  nagadType: 'Merchant',
  rocketMerchant: '01911-223344',
  noticeBangla: 'টাকা পাঠানোর পর ট্রানজেকশন আইডি (TrxID) ও আপনার বিকাশ/নগদ নাম্বার সঠিকভাবে ফর্মটিতে লিখে সাবমিট করুন। অ্যাডমিন অনুমোদনের পর সাথে সাথে ব্যালেন্স যোগ হবে।',
  noticeEnglish: 'After sending money, input your TrxID and Sender Number in the form below. Balance will be credited upon Admin approval.',
  minDeposit: 1000,
  minWithdraw: 500,
};

export const OFFICIAL_INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'tier-5k',
    investAmount: 5000,
    dailyProfit: 150,
    totalProfit10Days: 1500,
    durationDays: 10,
    labelBangla: '৳৫,০০০ প্ল্যান'
  },
  {
    id: 'tier-10k',
    investAmount: 10000,
    dailyProfit: 300,
    totalProfit10Days: 3000,
    durationDays: 10,
    labelBangla: '৳১০,০০০ প্ল্যান'
  },
  {
    id: 'tier-20k',
    investAmount: 20000,
    dailyProfit: 600,
    totalProfit10Days: 6000,
    durationDays: 10,
    labelBangla: '৳২০,০০০ প্ল্যান'
  },
  {
    id: 'tier-25k',
    investAmount: 25000,
    dailyProfit: 750,
    totalProfit10Days: 7500,
    durationDays: 10,
    labelBangla: '৳২৫,০০০ প্ল্যান'
  }
];

export const INITIAL_USER_ACCOUNT: UserAccount = {
  id: 'U001',
  name: 'Rahim Mia',
  phone: '01712-345678',
  email: 'rahim.mia@example.com',
  walletBalance: 15500,
  totalInvested: 10000,
  totalProfit: 1200,
  kycStatus: 'Approved',
  nidNumber: '1992269548000142',
  is2FAEnabled: true,
  isLoggedIn: true,
  activePlans: [
    {
      id: 'ACT-01',
      planTitle: '৳১০,০০০ প্ল্যান (১০ দিন)',
      investedAmount: 10000,
      dailyProfit: 300,
      totalProfit10Days: 3000,
      daysCompleted: 4,
      totalDays: 10,
      startDate: '2026-11-08',
      nextPayout: 'আজ রাত ১২:০০'
    }
  ]
};

export const INITIAL_SUPPORT_MESSAGES: SupportMessage[] = [
  {
    id: 'M1',
    sender: 'support',
    text: 'আসসালামু আলাইকুম! MH BD INVEST ২৪/৭ হেল্পডেস্কে আপনাকে স্বাগতম। ডিপোজিট, উইথড্র বা ইনভেস্ট নিয়ে কোনো সহায়তার প্রয়োজন হলে লিখুন।',
    timestamp: '09:00 AM'
  },
  {
    id: 'M2',
    sender: 'user',
    text: 'বিকাশ মার্চেন্টে টাকা পাঠানোর পর অ্যাডমিন কতক্ষণে এপ্রুভ করে?',
    timestamp: '09:05 AM'
  },
  {
    id: 'M3',
    sender: 'support',
    text: 'সাধারণত অ্যাডমিন ৫ থেকে ১৫ মিনিটের মধ্যে ট্রানজেকশন ভেরিফাই করে আপনার ওয়ালেটে ব্যালেন্স যুক্ত করে দেন।',
    timestamp: '09:06 AM'
  }
];

export const INITIAL_USERS: AdminItem[] = [
  {
    id: 'U001',
    name: 'Rahim Mia',
    description: 'Registered user · Motijheel, Dhaka',
    status: 'Active',
    phone: '+880 1712-345678',
    email: 'rahim.mia@example.com',
    date: '2026-11-01 09:30 AM',
    amount: '৳45,000',
    rawAmount: 45000,
  },
  {
    id: 'U002',
    name: 'Karim Ahmed',
    description: 'Registered user · Agrabad, Chittagong',
    status: 'Active',
    phone: '+880 1819-876543',
    email: 'karim.ahmed@example.com',
    date: '2026-11-04 02:15 PM',
    amount: '৳28,500',
    rawAmount: 28500,
  },
  {
    id: 'U003',
    name: 'Salam Uddin',
    description: 'Registered user · Zindabazar, Sylhet',
    status: 'Blocked',
    phone: '+880 1911-223344',
    email: 'salam.uddin@example.com',
    date: '2026-11-08 11:45 AM',
    amount: '৳12,000',
    rawAmount: 12000,
  }
];

export const INITIAL_KYC: AdminItem[] = [
  {
    id: 'K001',
    name: 'Demo User 01',
    description: 'Demo identity verification',
    status: 'Pending',
    date: '2026-11-11 10:20 AM',
    nidNumber: '1992269548000142',
    documentType: 'National ID',
    phone: '+880 1711-223344'
  },
  {
    id: 'K002',
    name: 'Demo User 02',
    description: 'Demo identity verification',
    status: 'Pending',
    date: '2026-11-11 03:45 PM',
    nidNumber: '1988456123000891',
    documentType: 'Passport',
    phone: '+880 1812-998877'
  }
];

export const INITIAL_DEPOSITS: AdminItem[] = [
  {
    id: 'D001',
    name: 'Rahim Mia',
    description: 'Deposit request',
    amount: '৳5,000',
    rawAmount: 5000,
    method: 'bKash',
    status: 'Pending',
    trxId: '9B7X2K4A9',
    accountNumber: '01712-345678',
    date: '2026-11-12 08:30 AM',
    userId: 'U001'
  },
  {
    id: 'D002',
    name: 'Karim Ahmed',
    description: 'Deposit request',
    amount: '৳10,000',
    rawAmount: 10000,
    method: 'Nagad',
    status: 'Pending',
    trxId: '8C4M1P0Z5',
    accountNumber: '01819-876543',
    date: '2026-11-12 09:15 AM',
    userId: 'U002'
  }
];

export const INITIAL_WITHDRAWALS: AdminItem[] = [
  {
    id: 'W001',
    name: 'Demo User 03',
    description: 'Withdrawal request',
    amount: '৳2,000',
    rawAmount: 2000,
    method: 'bKash',
    status: 'Pending',
    accountNumber: '01913-776655',
    date: '2026-11-12 07:45 AM',
    userId: 'U003'
  },
  {
    id: 'W002',
    name: 'Rahim Mia',
    description: 'Withdrawal request',
    amount: '৳1,000',
    rawAmount: 1000,
    method: 'Nagad',
    status: 'Pending',
    accountNumber: '01712-345678',
    date: '2026-11-12 08:50 AM',
    userId: 'U001'
  }
];

export const INITIAL_TRANSACTIONS: AdminItem[] = [
  {
    id: 'T001',
    name: 'Rahim Mia',
    description: 'bKash Merchant Deposit',
    amount: '৳5,000',
    rawAmount: 5000,
    method: 'bKash',
    status: 'Completed',
    trxId: 'TXN-9021482',
    date: '2026-11-10 04:30 PM'
  },
  {
    id: 'T002',
    name: 'Karim Ahmed',
    description: 'Nagad Merchant Withdrawal',
    amount: '৳2,000',
    rawAmount: 2000,
    method: 'Nagad',
    status: 'Completed',
    trxId: 'TXN-8745210',
    date: '2026-11-11 01:10 PM'
  }
];

export const INITIAL_SECURITY_LOGS: SecurityLog[] = [
  {
    id: 'SEC-101',
    event: 'Demo login activity recorded',
    level: 'info',
    timestamp: '2026-11-12 09:14:02',
    ip: '103.145.120.4',
    location: 'Dhaka, Bangladesh',
    device: 'Android Client / OTP Login'
  },
  {
    id: 'SEC-102',
    event: 'Admin security monitoring active',
    level: 'info',
    timestamp: '2026-11-12 09:00:00',
    ip: '127.0.0.1',
    location: 'Internal Subsystem',
    device: 'Automated Daemon'
  },
  {
    id: 'SEC-103',
    event: 'Demo OTP verification event',
    level: 'warning',
    timestamp: '2026-11-12 08:42:19',
    ip: '103.205.71.18',
    location: 'Chittagong, Bangladesh',
    device: 'Android Client / bKash Gateway'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-301',
    action: 'Admin dashboard opened',
    actor: 'Super Admin (mhbdinvestsupport@gmail.com)',
    timestamp: '2026-11-12 09:14:00',
    details: 'Console session initiated'
  },
  {
    id: 'AUD-302',
    action: 'Demo transaction created',
    actor: 'System Sandbox',
    timestamp: '2026-11-12 09:15:30',
    targetId: 'D002',
    details: 'Deposit ৳10,000 via Nagad queued'
  },
  {
    id: 'AUD-303',
    action: 'Demo KYC review pending',
    actor: 'Compliance Engine',
    timestamp: '2026-11-12 09:20:10',
    targetId: 'K001',
    details: 'National ID verification ready for approval'
  }
];

export const INITIAL_PLANS: InvestmentPlan[] = [
  {
    id: 'PLAN-1',
    title: '10 Days Plan',
    rate: '3% daily',
    periodDays: 10,
    dailyPercent: 3.0,
    minAmount: '৳1,000',
    maxAmount: '৳50,000',
    tag: 'Demo only',
    isActive: true
  },
  {
    id: 'PLAN-2',
    title: '21 Days Plan',
    rate: '4% daily',
    periodDays: 21,
    dailyPercent: 4.0,
    minAmount: '৳5,000',
    maxAmount: '৳200,000',
    tag: 'Demo only',
    isActive: true
  },
  {
    id: 'PLAN-3',
    title: '30 Days Plan',
    rate: '5% daily',
    periodDays: 30,
    dailyPercent: 5.0,
    minAmount: '৳10,000',
    maxAmount: '৳500,000',
    tag: 'Demo only',
    isActive: true
  }
];

export const KOTLIN_ORIGINAL_CODE = `package com.example.investmentapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

private val Navy = Color(0xFF081426)
private val NavyCard = Color(0xFF12233D)
private val Gold = Color(0xFFD6B15C)
private val Muted = Color(0xFF9EACC1)
private val Green = Color(0xFF43B581)
private val Red = Color(0xFFE46B70)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MHAdminTheme {
                AdminDashboardScreen()
            }
        }
    }
}

@Composable
fun MHAdminTheme(content: @Composable () -> Unit) {
    val colors = darkColorScheme(
        primary = Gold,
        onPrimary = Navy,
        secondary = Green,
        background = Navy,
        surface = NavyCard,
        onBackground = Color.White,
        onSurface = Color.White,
        error = Red
    )

    MaterialTheme(
        colorScheme = colors,
        content = content
    )
}

data class AdminItem(
    val id: String,
    val name: String,
    val description: String,
    val amount: String = "",
    val method: String = "",
    val status: String = "Pending"
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminDashboardScreen() {

    val tabs = listOf(
        "Overview",
        "Users",
        "KYC",
        "Deposit",
        "Withdrawal",
        "Transactions",
        "Security",
        "Audit",
        "Plans"
    )

    var selectedTab by remember { mutableIntStateOf(0) }
    var searchText by remember { mutableStateOf("") }

    val users = remember {
        mutableStateListOf(
            AdminItem("U001", "Rahim Mia", "Registered user", status = "Active"),
            AdminItem("U002", "Karim Ahmed", "Registered user", status = "Active"),
            AdminItem("U003", "Salam Uddin", "Registered user", status = "Blocked")
        )
    }

    val kyc = remember {
        mutableStateListOf(
            AdminItem("K001", "Demo User 01", "Demo identity verification"),
            AdminItem("K002", "Demo User 02", "Demo identity verification")
        )
    }

    val deposits = remember {
        mutableStateListOf(
            AdminItem("D001", "Demo User 01", "Deposit request", "৳5,000", "bKash"),
            AdminItem("D002", "Demo User 02", "Deposit request", "৳10,000", "Nagad")
        )
    }

    val withdrawals = remember {
        mutableStateListOf(
            AdminItem("W001", "Demo User 03", "Withdrawal request", "৳2,000", "bKash"),
            AdminItem("W002", "Demo User 01", "Withdrawal request", "৳1,000", "Nagad")
        )
    }

    val transactions = remember {
        mutableStateListOf(
            AdminItem("T001", "Demo User 01", "Demo deposit", "৳5,000", "bKash", "Completed"),
            AdminItem("T002", "Demo User 02", "Demo withdrawal", "৳2,000", "Nagad", "Pending")
        )
    }

    val securityLogs = listOf(
        "Demo login activity recorded",
        "Admin security monitoring active",
        "Demo OTP verification event"
    )

    val auditLogs = listOf(
        "Admin dashboard opened",
        "Demo transaction created",
        "Demo KYC review pending"
    )

    Scaffold(
        containerColor = Navy,
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            "MH BD INVEST",
                            color = Gold,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 20.sp
                        )
                        Text(
                            "ADMIN CONTROL PANEL",
                            color = Muted,
                            fontSize = 10.sp
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = NavyCard
                ),
                actions = {
                    TextButton(onClick = { searchText = "" }) {
                        Text("Reset", color = Gold)
                    }
                }
            )
        }
    ) { padding ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {

            ScrollableTabRow(
                selectedTabIndex = selectedTab,
                containerColor = Navy,
                contentColor = Gold,
                edgePadding = 12.dp
            ) {
                tabs.forEachIndexed { index, title ->
                    Tab(
                        selected = selectedTab == index,
                        onClick = {
                            selectedTab = index
                            searchText = ""
                        },
                        text = {
                            Text(
                                title,
                                fontWeight = if (selectedTab == index)
                                    FontWeight.Bold else FontWeight.Normal
                            )
                        }
                    )
                }
            }

            if (selectedTab != 0 &&
                selectedTab != 6 &&
                selectedTab != 7 &&
                selectedTab != 8
            ) {
                OutlinedTextField(
                    value = searchText,
                    onValueChange = { searchText = it },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    placeholder = { Text("Search by name or ID") },
                    singleLine = true,
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Gold,
                        unfocusedBorderColor = Muted,
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White
                    )
                )
            }

            when (selectedTab) {

                0 -> OverviewScreen(
                    users.size,
                    kyc.count { it.status == "Pending" },
                    deposits.count { it.status == "Pending" },
                    withdrawals.count { it.status == "Pending" }
                )

                1 -> UserSection(users, searchText)

                2 -> ReviewSection(
                    "KYC Verification",
                    kyc,
                    searchText
                )

                3 -> ReviewSection(
                    "Deposit Requests",
                    deposits,
                    searchText
                )

                4 -> ReviewSection(
                    "Withdrawal Requests",
                    withdrawals,
                    searchText
                )

                5 -> ReviewSection(
                    "Transaction Monitoring",
                    transactions,
                    searchText,
                    allowActions = false
                )

                6 -> InformationSection(
                    "Security Alerts",
                    securityLogs
                )

                7 -> InformationSection(
                    "Audit Reports",
                    auditLogs
                )

                8 -> InvestmentPlansSection()
            }
        }
    }
}`;
