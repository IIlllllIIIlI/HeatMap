# HabitHero Monetization Strategy

## Overview

HabitHero uses a **freemium model** with multiple revenue streams designed to maximize user engagement while providing fair value. The strategy balances free user experience with compelling premium offerings.

---

## Revenue Streams

### 1. In-App Purchases (IAP)

#### Gem Packages (Premium Currency)
| Package | Gems | Price | Bonus | USD/Gem |
|---------|------|-------|-------|---------|
| Starter | 50 | $0.99 | 0 | $0.020 |
| Popular | 150 | $2.99 | +20 | $0.018 |
| **Best Value** | 500 | $7.99 | +100 | $0.013 |
| Mega | 1200 | $14.99 | +300 | $0.010 |

**Expected Revenue:** $3-5 ARPU for paying users

#### Gold (Soft Currency)
- Earned through gameplay (completing habits)
- Can purchase with gems at 100 gold = 10 gems
- Creates gem sink while maintaining free-to-play viability

---

### 2. Subscription Model - HabitHero Pro

#### Pricing Tiers
| Plan | Price | Annual Savings |
|------|-------|----------------|
| Monthly | $4.99/month | - |
| **Yearly** | $29.99/year | 50% ($30 savings) |
| Lifetime | $79.99 one-time | - |

#### Pro Benefits
- **Unlimited Habits** (Free: 5 max)
- **Ad-Free Experience**
- **2x XP Multiplier**
- **Exclusive Legendary Pets** (Dragon, Robot, Alien)
- **Premium Themes** (5 exclusive themes)
- **Advanced Analytics**
  - Weekly/monthly progress reports
  - Habit correlation insights
  - Best time-of-day analysis
- **Cloud Sync** across devices
- **Priority Support**

**Target Conversion:** 5-10% of active users
**Expected Revenue:** $2-4 ARPU across all users

---

### 3. Rewarded Video Ads

#### Implementation
- **Placement:** Gem Shop, post-habit completion bonus
- **Reward:** 5 gems per ad watched
- **Daily Limit:** 5 ads (25 gems max)
- **Cooldown:** 30 seconds between ads

#### Ad Networks (Priority Order)
1. **Google AdMob** - Primary network
2. **Unity Ads** - Gaming-focused backup
3. **AppLovin MAX** - Mediation for best CPM

#### Expected Metrics
- eCPM: $8-15 (gaming/lifestyle category)
- Ads/DAU: 2-3 average
- **Revenue:** $0.02-0.05 per DAU

---

### 4. Battle Pass (Seasonal Content)

#### Structure
- **Duration:** 30 days per season
- **Free Track:** Basic rewards (gold, consumables)
- **Premium Track:** 500 gems ($4-5 value)

#### Premium Pass Rewards
| Tier | Free Reward | Premium Reward |
|------|-------------|----------------|
| 1 | 50 gold | 10 gems |
| 2 | 100 gold | Pet treats x3 |
| 3 | XP Potion | 20 gems |
| 4 | 200 gold | Streak Shield |
| 5 | Mystery Box | 50 gems |
| 6 | 300 gold | **Exclusive Pet** |
| 7 | Pet treats x5 | 75 gems |
| 8 | 500 gold | Mega XP Boost |
| 9 | Streak Shield | 100 gems |
| 10 | Golden Egg | **Legendary Pet** |

**Expected Revenue:** 15-20% of active users purchase
**Price:** 500 gems (~$5 value)

---

### 5. One-Time Purchases

#### Starter Pack (First-time offer)
- 200 gems + 1000 gold + Exclusive pet
- **Price:** $2.99 (70% discount)
- **Conversion target:** 20-30% of new users

#### Limited-Time Bundles
- Holiday themed pets/items
- Seasonal exclusive content
- **Price range:** $4.99-$14.99

---

## Pricing Psychology

### Anchor Pricing
- Show "regular value" vs discounted bundle price
- Best Value badge on $7.99 gem package

### Scarcity
- Limited-time pets create urgency
- Season pass countdown timer
- Daily ad limits

### Social Proof
- "X players unlocked this pet"
- Leaderboards for streaks

### Loss Aversion
- Streak Shield prevents losing progress
- Pet happiness decay encourages daily play

---

## User Segmentation

### Free Users (Minnows) - 85%
- Revenue: Ads only (~$0.03/day)
- Goal: Engagement, social sharing
- Conversion path: Starter pack offer

### Light Spenders (Dolphins) - 12%
- Revenue: Occasional gem purchases ($1-10/month)
- Goal: Battle pass, convenience items
- Conversion path: Pro subscription trial

### Heavy Spenders (Whales) - 3%
- Revenue: Subscription + large gem packs ($20+/month)
- Goal: Exclusive content, completionist
- Retention focus: Limited edition pets

---

## Revenue Projections

### Monthly Targets (per 10,000 DAU)

| Revenue Stream | % Users | ARPU | Monthly |
|----------------|---------|------|---------|
| Ads | 85% | $0.90 | $7,650 |
| Gem IAP | 8% | $6.00 | $4,800 |
| Subscription | 5% | $4.00 | $2,000 |
| Battle Pass | 15% | $1.50 | $2,250 |
| **Total** | - | - | **$16,700** |

### Blended ARPU: $1.67/DAU/month

---

## Implementation Checklist

### Phase 1: Core Monetization
- [x] Gem currency system
- [x] Gold economy
- [x] Shop infrastructure
- [x] Premium subscription UI
- [ ] Google Play Billing integration
- [ ] AdMob SDK integration

### Phase 2: Engagement Features
- [x] Battle Pass system
- [x] Pet collection
- [x] Achievement rewards
- [ ] Push notification scheduling
- [ ] Daily login bonus calendar

### Phase 3: Optimization
- [ ] A/B test pricing
- [ ] Cohort analysis
- [ ] Churn prediction
- [ ] Personalized offers
- [ ] Referral program

---

## Ad Integration Guidelines

### AdMob Setup
```java
// Initialize AdMob in MainActivity
MobileAds.initialize(this, initializationStatus -> {});

// Rewarded ad loading
RewardedAd.load(this, "ca-app-pub-XXXX/XXXX",
    new AdRequest.Builder().build(),
    new RewardedAdLoadCallback() {
        @Override
        public void onAdLoaded(@NonNull RewardedAd ad) {
            rewardedAd = ad;
        }
    });
```

### Unity Ads Fallback
```java
UnityAds.initialize(this, "gameId", testMode,
    new IUnityAdsInitializationListener() {
        @Override
        public void onInitializationComplete() {
            // Load rewarded ad
        }
    });
```

---

## Google Play Billing

### Subscription Products
```json
{
  "productId": "habithero_pro_monthly",
  "type": "SUBSCRIPTION",
  "price": "4.99",
  "billingPeriod": "P1M"
}
```

### Consumable Products
```json
{
  "productId": "gems_500",
  "type": "CONSUMABLE",
  "price": "7.99"
}
```

---

## Key Metrics to Track

### Engagement
- DAU/MAU ratio (target: 25%+)
- Session length (target: 5+ min)
- Habits completed/day
- Streak retention

### Monetization
- ARPU (target: $1.50+)
- ARPPU (target: $15+)
- Conversion rate (target: 5%+)
- LTV:CAC ratio (target: 3:1)

### Retention
- D1: 40%+
- D7: 20%+
- D30: 10%+

---

## Ethical Considerations

### Fair Play Principles
1. **No pay-to-win** - Premium only offers cosmetics and convenience
2. **Transparent pricing** - Clear gem-to-dollar conversion
3. **Spending limits** - Monthly cap notifications
4. **Parental controls** - Age verification for purchases
5. **No gambling mechanics** - Fixed rewards, no loot boxes with random rare items

### Data Privacy
- GDPR compliant data handling
- Opt-out analytics option
- No selling user data
- Clear privacy policy

---

## Conclusion

HabitHero's monetization strategy focuses on:
1. **Value-first approach** - Free users get a complete experience
2. **Fair premium upgrades** - Pro subscription offers genuine value
3. **Sustainable engagement** - Daily limits prevent unhealthy spending
4. **Multiple revenue streams** - Diversified income reduces risk

Target monthly revenue: **$1.50-2.00 per active user**
