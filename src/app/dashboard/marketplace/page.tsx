"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const categories = [
  "All",
  "Rent & Accommodation",
  "Solar & Green Energy",
  "Education & School Fees",
  "Health & Medical",
  "Business Invoice & Supply Chain",
  "Device & Gadget",
] as const;

type FinancingOption = {
  id: number;
  lender: string;
  product: string;
  range: string;
  maxAmount: number | null;
  currency: "NGN" | "USD";
  minTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  category: (typeof categories)[number];
};

const financingOptions: FinancingOption[] = [
  {
    id: 1,
    lender: "Spleet",
    product: "Rent Now Pay Later",
    range: "₦200,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Rent & Accommodation",
  },
  {
    id: 2,
    lender: "AltRent",
    product: "The Alternative Bank",
    range: "₦500,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 3,
    lender: "Addosser Finance",
    product: "Pay My Rent Loan",
    range: "₦200,000 - ₦4,000,000",
    maxAmount: 4000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 4,
    lender: "Kwaba",
    product: "Rent Advance",
    range: "₦150,000 - ₦2,500,000",
    maxAmount: 2500000,
    currency: "NGN",
    minTier: "Silver",
    category: "Rent & Accommodation",
  },
  {
    id: 5,
    lender: "RentSmallSmall",
    product: "Tenant Financing",
    range: "₦300,000 - ₦4,000,000",
    maxAmount: 4000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 6,
    lender: "Monthly",
    product: "Rent Installments",
    range: "₦200,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Rent & Accommodation",
  },
  {
    id: 7,
    lender: "DLM Consumer Finance",
    product: "Rent Shield",
    range: "₦500,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 8,
    lender: "Page Financials",
    product: "Rent Loan Target",
    range: "₦200,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 9,
    lender: "Creditville",
    product: "Accommodation Asset",
    range: "₦300,000 - ₦4,000,000",
    maxAmount: 4000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 10,
    lender: "Renmoney",
    product: "Rent Cash Target",
    range: "₦100,000 - ₦6,000,000",
    maxAmount: 6000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 11,
    lender: "Rosabon Financial Services",
    product: "Consumer Lease",
    range: "₦500,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Rent & Accommodation",
  },
  {
    id: 12,
    lender: "Seedvest Microfinance Bank",
    product: "Rent Financing",
    range: "₦200,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Rent & Accommodation",
  },
  {
    id: 13,
    lender: "Fast Credit Limited",
    product: "Rent Financing",
    range: "₦150,000 - ₦2,500,000",
    maxAmount: 2500000,
    currency: "NGN",
    minTier: "Silver",
    category: "Rent & Accommodation",
  },
  {
    id: 14,
    lender: "Anchor Microfinance Bank",
    product: "Rent Financing",
    range: "₦200,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Rent & Accommodation",
  },
  {
    id: 15,
    lender: "Infinity Microfinance Bank",
    product: "Rent Financing",
    range: "₦100,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Rent & Accommodation",
  },
  {
    id: 16,
    lender: "SunKing",
    product: "Pay-As-You-Go Solar",
    range: "₦50,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Solar & Green Energy",
  },
  {
    id: 17,
    lender: "d.light Nigeria",
    product: "Asset Solar",
    range: "₦40,000 - ₦1,200,000",
    maxAmount: 1200000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Solar & Green Energy",
  },
  {
    id: 18,
    lender: "Lumos Nigeria",
    product: "Power Financing",
    range: "₦100,000 - ₦800,000",
    maxAmount: 800000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Solar & Green Energy",
  },
  {
    id: 19,
    lender: "Wema Bank",
    product: "Green Energy Finance",
    range: "₦100,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Solar & Green Energy",
  },
  {
    id: 20,
    lender: "Fidelity Bank",
    product: "Fidelity Green Energy",
    range: "₦500,000 - ₦10,000,000",
    maxAmount: 10000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 21,
    lender: "Sterling Bank",
    product: "Imperium Solar Loan",
    range: "₦500,000 - ₦15,000,000",
    maxAmount: 15000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 22,
    lender: "Stanbic IBTC",
    product: "SME Solar Solar Loan",
    range: "₦1,000,000 - ₦20,000,000",
    maxAmount: 20000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 23,
    lender: "FCMB",
    product: "Energy Finance for SMEs",
    range: "₦1,000,000 - ₦15,000,000",
    maxAmount: 15000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 24,
    lender: "Access Bank",
    product: "Green Energy Eco Loan",
    range: "₦500,000 - ₦10,000,000",
    maxAmount: 10000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 25,
    lender: "Baobab Microfinance Bank",
    product: "Solar Tech",
    range: "₦100,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Solar & Green Energy",
  },
  {
    id: 26,
    lender: "LAPO Microfinance Bank",
    product: "Eco Loan",
    range: "₦50,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Solar & Green Energy",
  },
  {
    id: 27,
    lender: "Arnergy",
    product: "Solar Lease-to-Own",
    range: "₦1,500,000 - ₦50,000,000",
    maxAmount: 50000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 28,
    lender: "Auxano Solar",
    product: "Consumer Asset Finance",
    range: "₦1,000,000 - ₦10,000,000",
    maxAmount: 10000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Solar & Green Energy",
  },
  {
    id: 29,
    lender: "Solntu",
    product: "Green Tech Finance",
    range: "₦200,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Solar & Green Energy",
  },
  {
    id: 30,
    lender: "Crevance Energy",
    product: "Alternative Power",
    range: "₦300,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Solar & Green Energy",
  },
  {
    id: 31,
    lender: "First Bank",
    product: "FirstEdu Loan",
    range: "₦100,000 - ₦35,000,000",
    maxAmount: 35000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Education & School Fees",
  },
  {
    id: 32,
    lender: "Polaris Bank",
    product: "School Advantage",
    range: "₦200,000 - ₦100,000,000",
    maxAmount: 100000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Education & School Fees",
  },
  {
    id: 33,
    lender: "Edves",
    product: "EdPay Tuition Finance",
    range: "₦50,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Education & School Fees",
  },
  {
    id: 34,
    lender: "MPOWER Financing",
    product: "International Students",
    range: "$2,001 - $100,000",
    maxAmount: null,
    currency: "USD",
    minTier: "Platinum",
    category: "Education & School Fees",
  },
  {
    id: 35,
    lender: "Prodigy Finance",
    product: "Overseas MBA/STEM",
    range: "$10,000 - $100,000",
    maxAmount: null,
    currency: "USD",
    minTier: "Platinum",
    category: "Education & School Fees",
  },
  {
    id: 36,
    lender: "GTBank",
    product: "School Fees Advance",
    range: "₦50,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Education & School Fees",
  },
  {
    id: 37,
    lender: "Zenith Bank",
    product: "School Fees Advance",
    range: "₦100,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Education & School Fees",
  },
  {
    id: 38,
    lender: "UBA",
    product: "School Fees Loan Scheme",
    range: "₦100,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Education & School Fees",
  },
  {
    id: 39,
    lender: "Ecobank",
    product: "Edu Loan Suite",
    range: "₦100,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Education & School Fees",
  },
  {
    id: 40,
    lender: "Mutual Trust Microfinance Bank",
    product: "Education Financing",
    range: "₦50,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Education & School Fees",
  },
  {
    id: 41,
    lender: "Sparkle",
    product: "Edu Credit Feature",
    range: "₦50,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Education & School Fees",
  },
  {
    id: 42,
    lender: "Carbon",
    product: "Education Personal Loan",
    range: "₦20,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Education & School Fees",
  },
  {
    id: 43,
    lender: "FairMoney",
    product: "Tuition Cash Facility",
    range: "₦20,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Education & School Fees",
  },
  {
    id: 44,
    lender: "VFD Microfinance Bank",
    product: "V Edu",
    range: "₦100,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Education & School Fees",
  },
  {
    id: 45,
    lender: "Mainstreet Microfinance Bank",
    product: "Education Financing",
    range: "₦50,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Education & School Fees",
  },
  {
    id: 46,
    lender: "MyItura",
    product: "Health Finance Wallet",
    range: "₦30,000 - ₦500,000",
    maxAmount: 500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Health & Medical",
  },
  {
    id: 47,
    lender: "Remedial Health",
    product: "Pharmacy Inventory Credit",
    range: "₦100,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Health & Medical",
  },
  {
    id: 48,
    lender: "Lipalater",
    product: "Medical Cover Finance",
    range: "₦50,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Health & Medical",
  },
  {
    id: 49,
    lender: "Diamond Shield Medical Loans",
    product: "Medical Loans",
    range: "₦200,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Health & Medical",
  },
  {
    id: 50,
    lender: "HighStreet Microfinance Bank",
    product: "Medical Advance",
    range: "₦100,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Health & Medical",
  },
  {
    id: 51,
    lender: "Advans La Fayette MFB",
    product: "Health Provider Facility",
    range: "₦500,000 - ₦20,000,000",
    maxAmount: 20000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 52,
    lender: "ACCION Microfinance Bank",
    product: "Medical Emergency",
    range: "₦50,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Health & Medical",
  },
  {
    id: 53,
    lender: "Grooming Microfinance Bank",
    product: "Medical Financing",
    range: "₦30,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Health & Medical",
  },
  {
    id: 54,
    lender: "OneFi/Health",
    product: "Emergency Care Funds",
    range: "₦50,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Health & Medical",
  },
  {
    id: 55,
    lender: "Sterling Bank",
    product: "HealthBanc Provider Fund",
    range: "₦500,000 - ₦50,000,000",
    maxAmount: 50000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 56,
    lender: "Wema Bank",
    product: "Pharma-Credit Line",
    range: "₦500,000 - ₦15,000,000",
    maxAmount: 15000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 57,
    lender: "Union Bank",
    product: "Healthcare Business Facility",
    range: "₦1,000,000 - ₦40,000,000",
    maxAmount: 40000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 58,
    lender: "Keystone Bank",
    product: "Medical Asset Finance",
    range: "₦2,000,000 - ₦50,000,000",
    maxAmount: 50000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 59,
    lender: "Providus Bank",
    product: "Medical Equipment Facility",
    range: "₦5,000,000 - ₦100,000,000",
    maxAmount: 100000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 60,
    lender: "Stanbic IBTC",
    product: "Healthcare Loan Solutions",
    range: "₦2,000,000 - ₦50,000,000",
    maxAmount: 50000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Health & Medical",
  },
  {
    id: 61,
    lender: "Float",
    product: "Invoice Discounting & PO Finance",
    range: "₦1,000,000 - ₦50,000,000",
    maxAmount: 50000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 62,
    lender: "Sycamore",
    product: "Invoice & Contract Finance",
    range: "₦500,000 - ₦20,000,000",
    maxAmount: 20000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 63,
    lender: "Parallex Bank",
    product: "Invoice Discounting Finance",
    range: "₦2,000,000 - ₦100,000,000",
    maxAmount: 100000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 64,
    lender: "First Bank",
    product: "Invoice Discounting Facility - IDF",
    range: "₦5,000,000 - ₦250,000,000",
    maxAmount: 250000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 65,
    lender: "Stanbic IBTC",
    product: "Invoice Discounting Service",
    range: "₦5,000,000 - ₦200,000,000",
    maxAmount: 200000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 66,
    lender: "Sterling Bank",
    product: "Supply Chain Financing Platform",
    range: "₦2,000,000 - ₦150,000,000",
    maxAmount: 150000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 67,
    lender: "Access Bank",
    product: "Contract Financing",
    range: "₦2,000,000 - ₦100,000,000",
    maxAmount: 100000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 68,
    lender: "Zenith Bank",
    product: "Invoice Discounting Line",
    range: "₦5,000,000 - ₦200,000,000",
    maxAmount: 200000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 69,
    lender: "FCMB",
    product: "Invoice Discounting Facility",
    range: "₦2,000,000 - ₦100,000,000",
    maxAmount: 100000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 70,
    lender: "Coronation Merchant Bank",
    product: "Factoring Desk",
    range: "₦10,000,000 - ₦500,000,000",
    maxAmount: 500000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 71,
    lender: "FBNQuest Merchant Bank",
    product: "Invoice/Working Capital",
    range: "₦20,000,000 - ₦500,000,000",
    maxAmount: 500000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 72,
    lender: "United Capital",
    product: "Invoice/Working Capital",
    range: "₦10,000,000 - ₦300,000,000",
    maxAmount: 300000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 73,
    lender: "Bridsec Capital",
    product: "Invoice Advance",
    range: "₦1,000,000 - ₦30,000,000",
    maxAmount: 30000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 74,
    lender: "Zilla",
    product: "B2B Supply & Invoice Credit",
    range: "₦500,000 - ₦10,000,000",
    maxAmount: 10000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 75,
    lender: "Moniepoint",
    product: "Working Capital Invoice",
    range: "₦200,000 - ₦20,000,000",
    maxAmount: 20000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 76,
    lender: "OPay Business",
    product: "Supplier Credit Line",
    range: "₦100,000 - ₦10,000,000",
    maxAmount: 10000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 77,
    lender: "Kuda Business",
    product: "Overdraft / Invoice Buffer",
    range: "₦100,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 78,
    lender: "Prospa",
    product: "Business Line of Credit",
    range: "₦200,000 - ₦10,000,000",
    maxAmount: 10000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 79,
    lender: "Brass",
    product: "Business Credit Operations",
    range: "₦500,000 - ₦20,000,000",
    maxAmount: 20000000,
    currency: "NGN",
    minTier: "Platinum",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 80,
    lender: "Kippa",
    product: "Invoice Advance Engine",
    range: "₦50,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Business Invoice & Supply Chain",
  },
  {
    id: 81,
    lender: "EasyBuy",
    product: "Smartphone Financing",
    range: "₦20,000 - ₦500,000",
    maxAmount: 500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 82,
    lender: "CDCare",
    product: "Pay Small Small Devices",
    range: "₦30,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 83,
    lender: "CredPal",
    product: "Pay Later Gadgets / Tech Marketplace",
    range: "₦50,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 84,
    lender: "Slot Zero",
    product: "Slot Integrated Device Finance",
    range: "₦30,000 - ₦800,000",
    maxAmount: 800000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 85,
    lender: "AltDrive / AltMall",
    product: "Alternative Gadgets",
    range: "₦100,000 - ₦2,500,000",
    maxAmount: 2500000,
    currency: "NGN",
    minTier: "Silver",
    category: "Device & Gadget",
  },
  {
    id: 86,
    lender: "Wema Bank",
    product: "Device Loan via ALAT",
    range: "₦50,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 87,
    lender: "Finata",
    product: "Device BNPL Infrastructure",
    range: "₦40,000 - ₦1,200,000",
    maxAmount: 1200000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 88,
    lender: "PayQart",
    product: "Consumer Gadget Financing",
    range: "₦50,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 89,
    lender: "Carbon Zero",
    product: "BNPL Gadget Term Contracts",
    range: "₦30,000 - ₦1,000,000",
    maxAmount: 1000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 90,
    lender: "Spectrum Microfinance",
    product: "Device Asset Portfolio",
    range: "₦50,000 - ₦1,500,000",
    maxAmount: 1500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 91,
    lender: "Newedge Finance",
    product: "Device Lending Unit",
    range: "₦20,000 - ₦600,000",
    maxAmount: 600000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 92,
    lender: "Palmpay",
    product: "Flexi Device Loan Allocation",
    range: "₦10,000 - ₦300,000",
    maxAmount: 300000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 93,
    lender: "Branch",
    product: "Tech Hardware-Targeted Cash Advance",
    range: "₦20,000 - ₦500,000",
    maxAmount: 500000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 94,
    lender: "QuickCheck",
    product: "Asset Quick Finance",
    range: "₦20,000 - ₦400,000",
    maxAmount: 400000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 95,
    lender: "Renmoney",
    product: "Device Merchant Financing Engine",
    range: "₦100,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 96,
    lender: "Page Financials",
    product: "Gadget Asset Lease",
    range: "₦150,000 - ₦2,500,000",
    maxAmount: 2500000,
    currency: "NGN",
    minTier: "Silver",
    category: "Device & Gadget",
  },
  {
    id: 97,
    lender: "Creditville",
    product: "Gadget Lease Scheme",
    range: "₦100,000 - ₦2,000,000",
    maxAmount: 2000000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
  {
    id: 98,
    lender: "Concept Nova",
    product: "Hardware Device Lease",
    range: "₦200,000 - ₦5,000,000",
    maxAmount: 5000000,
    currency: "NGN",
    minTier: "Gold",
    category: "Device & Gadget",
  },
  {
    id: 99,
    lender: "GDM Group Asset Financing",
    product: "Asset Financing",
    range: "₦100,000 - ₦3,000,000",
    maxAmount: 3000000,
    currency: "NGN",
    minTier: "Silver",
    category: "Device & Gadget",
  },
  {
    id: 100,
    lender: "Keza Africa",
    product: "Smartphone Work Financing",
    range: "₦30,000 - ₦700,000",
    maxAmount: 700000,
    currency: "NGN",
    minTier: "Bronze",
    category: "Device & Gadget",
  },
];

const tierRank = {
  Bronze: 1,
  Silver: 2,
  Gold: 3,
  Platinum: 4,
} satisfies Record<FinancingOption["minTier"], number>;

export default function MarketplacePage() {
  const userTier = "Gold";
  const safeLimit = 3200000;
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const filteredOptions = useMemo(
    () =>
      activeCategory === "All"
        ? financingOptions
        : financingOptions.filter(
            (option) => option.category === activeCategory,
          ),
    [activeCategory],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">
          Browse financing options based on your tier and limit.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto border-b pb-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="text-muted-foreground text-sm">
        Showing {filteredOptions.length} of {financingOptions.length} options.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredOptions.map((option) => {
          const qualifies = tierRank[userTier] >= tierRank[option.minTier];
          const withinLimit =
            option.currency === "USD" ||
            option.maxAmount === null ||
            option.maxAmount <= safeLimit;

          return (
            <div
              key={option.id}
              className="bg-card text-card-foreground flex min-h-64 flex-col rounded-lg border p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase">
                    {option.category}
                  </p>
                  <h3 className="mt-2 text-lg leading-tight font-semibold">
                    {option.lender}
                  </h3>
                </div>
                <span className="text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  #{option.id}
                </span>
              </div>

              <p className="text-muted-foreground mt-3 text-sm">
                {option.product}
              </p>
              <div className="mt-4 text-2xl font-bold">{option.range}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {qualifies ? (
                  <span className="inline-flex items-center rounded-full border border-transparent bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                    You qualify
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                    Need {option.minTier} tier
                  </span>
                )}
                {!withinLimit && (
                  <span className="inline-flex items-center rounded-full border border-transparent bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                    Above limit
                  </span>
                )}
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href={`/dashboard/marketplace/${option.id}`}
                  className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
