# HabitHero - Level Up Your Life

A gamified habit tracking Progressive Web App (PWA) for Android that makes building habits fun and rewarding!

## Features

### Core Habit Tracking
- Create custom habits with categories (Health, Fitness, Learning, etc.)
- Set difficulty levels (Easy/Medium/Hard) with XP rewards
- Flexible scheduling (Daily, Weekdays, Weekends, Custom)
- Streak tracking with bonus multipliers
- Daily completion bonuses

### Gamification System

#### XP & Leveling
- Earn XP for completing habits
- Level up from 1 to 100+
- Unlock new content at milestone levels
- Streak bonuses up to +100% XP

#### Pet Collection
- 20+ collectible pets
- Pet evolution system (e.g., Chick -> Chicken -> Phoenix)
- Feed and care for your active companion
- Pet happiness and energy stats
- Unlock rare pets through gameplay

#### Achievements
- 20+ achievements to unlock
- Track progress across categories
- Earn achievement points and gold

### Shop & Economy

#### Currencies
- **Gold** - Earned through gameplay
- **Gems** - Premium currency (ads or purchase)

#### Shop Items
- Consumables (XP Potions, Streak Shields, Pet Treats)
- Themes (Forest, Ocean, Space, Sunset, Neon)
- Power-ups (Mega XP Boost, Lucky Charm)
- Exclusive pets

### Battle Pass
- Seasonal content with free and premium tracks
- Exclusive pets and rewards
- 10 tiers of progression

### Premium Features (HabitHero Pro)
- Unlimited habits (Free: 5 max)
- Ad-free experience
- 2x XP multiplier
- Exclusive legendary pets
- Premium themes
- Advanced analytics

## Installation

### As PWA (Recommended)
1. Open `index.html` in Chrome on Android
2. Tap the menu (3 dots)
3. Select "Add to Home Screen"
4. The app will install and work offline!

### Local Development
```bash
# Serve with any HTTP server
npx serve .
# or
python -m http.server 8000
```

## Technology Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage:** LocalStorage for offline data persistence
- **PWA:** Service Worker for offline support
- **Fonts:** Google Fonts (Fredoka One, Nunito)

## File Structure

```
habitquest/
├── index.html          # Main app HTML
├── styles.css          # Complete styling (3000+ lines)
├── app.js              # Game logic and state management
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── MONETIZATION.md     # Business model documentation
├── README.md           # This file
└── assets/
    └── icon.svg        # App icon
```

## Monetization

See [MONETIZATION.md](./MONETIZATION.md) for detailed business model including:
- In-app purchases (gems)
- Subscription (HabitHero Pro)
- Rewarded video ads
- Battle Pass seasons

## Converting to Native Android

To convert this PWA to a native Android app:

### Option 1: TWA (Trusted Web Activity)
```bash
# Use Bubblewrap CLI
npm install -g @anthropic/anthropic
npx @nickolasjadams/pwabuilder-pwa2apk
```

### Option 2: Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npx cap init HabitHero com.habithero.app
npx cap add android
npx cap open android
```

### Option 3: Full Native Rewrite
For best performance and Play Store optimization, consider rewriting in:
- Kotlin + Jetpack Compose
- Flutter
- React Native

## Future Enhancements

- [ ] Cloud sync with Firebase
- [ ] Social features (friends, challenges)
- [ ] Widgets for Android home screen
- [ ] Apple Watch / WearOS companion
- [ ] Habit templates library
- [ ] AI-powered habit suggestions
- [ ] Integration with fitness trackers

## License

MIT License - Free to use and modify

---

**Made with dedication by the HabitHero team**
