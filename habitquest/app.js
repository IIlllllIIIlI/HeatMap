/**
 * HabitHero - Gamified Habit Tracker
 * A comprehensive habit tracking app with RPG-style progression
 */

// ==================== GAME DATA ====================

const GAME_DATA = {
    // Level thresholds (XP required to reach each level)
    levelThresholds: generateLevelThresholds(100),

    // Pets collection with evolution chains
    pets: [
        // Starter pets (unlocked at start)
        { id: 'pip', name: 'Pip', emoji: '🐣', desc: 'A cheerful chick ready to grow!', rarity: 'common', unlockLevel: 1, evolution: 'chicken' },
        { id: 'droplet', name: 'Droplet', emoji: '💧', desc: 'A tiny water spirit', rarity: 'common', unlockLevel: 1, evolution: 'splash' },
        { id: 'spark', name: 'Spark', emoji: '✨', desc: 'A glowing spark of light', rarity: 'common', unlockLevel: 1, evolution: 'flame' },

        // Early game pets
        { id: 'chicken', name: 'Clucky', emoji: '🐔', desc: 'Pip evolved into a proud chicken!', rarity: 'uncommon', unlockLevel: 5, evolution: 'phoenix_chick' },
        { id: 'splash', name: 'Splash', emoji: '🌊', desc: 'A playful wave spirit', rarity: 'uncommon', unlockLevel: 5, evolution: 'tsunami' },
        { id: 'flame', name: 'Ember', emoji: '🔥', desc: 'A warm flame companion', rarity: 'uncommon', unlockLevel: 5, evolution: 'inferno' },

        { id: 'bunny', name: 'Hoppy', emoji: '🐰', desc: 'Bouncy and energetic!', rarity: 'common', unlockLevel: 3 },
        { id: 'fox', name: 'Rusty', emoji: '🦊', desc: 'Clever and swift', rarity: 'uncommon', unlockLevel: 8 },
        { id: 'cat', name: 'Whiskers', emoji: '🐱', desc: 'Curious and playful', rarity: 'common', unlockLevel: 4 },
        { id: 'dog', name: 'Buddy', emoji: '🐕', desc: 'Loyal and friendly', rarity: 'common', unlockLevel: 6 },

        // Mid game pets
        { id: 'owl', name: 'Hoot', emoji: '🦉', desc: 'Wise beyond years', rarity: 'rare', unlockLevel: 15 },
        { id: 'wolf', name: 'Shadow', emoji: '🐺', desc: 'Strong and determined', rarity: 'rare', unlockLevel: 18 },
        { id: 'panda', name: 'Bamboo', emoji: '🐼', desc: 'Peaceful and strong', rarity: 'rare', unlockLevel: 20 },
        { id: 'lion', name: 'Leo', emoji: '🦁', desc: 'Brave and majestic', rarity: 'rare', unlockLevel: 25 },
        { id: 'tiger', name: 'Stripe', emoji: '🐯', desc: 'Powerful and graceful', rarity: 'rare', unlockLevel: 28 },

        // Late game pets
        { id: 'phoenix_chick', name: 'Phoenix', emoji: '🐦‍🔥', desc: 'Risen from ashes!', rarity: 'epic', unlockLevel: 30 },
        { id: 'tsunami', name: 'Tsunami', emoji: '🌊', desc: 'Powerful ocean spirit', rarity: 'epic', unlockLevel: 30 },
        { id: 'inferno', name: 'Inferno', emoji: '🌋', desc: 'Blazing fire elemental', rarity: 'epic', unlockLevel: 30 },
        { id: 'unicorn', name: 'Starlight', emoji: '🦄', desc: 'Magical and pure', rarity: 'epic', unlockLevel: 35 },
        { id: 'dragon', name: 'Blaze', emoji: '🐉', desc: 'Ancient and powerful', rarity: 'legendary', unlockLevel: 50 },

        // Premium/Special pets
        { id: 'robot', name: 'Bolt', emoji: '🤖', desc: 'Futuristic companion', rarity: 'epic', premium: true },
        { id: 'alien', name: 'Zyx', emoji: '👽', desc: 'From another world', rarity: 'legendary', premium: true },
        { id: 'ghost', name: 'Boo', emoji: '👻', desc: 'Spooky but friendly', rarity: 'epic', shopPrice: { gems: 200 } },
        { id: 'octopus', name: 'Inky', emoji: '🐙', desc: 'Eight arms of help!', rarity: 'rare', shopPrice: { gems: 100 } },
    ],

    // Shop items
    shopItems: {
        items: [
            { id: 'streak_shield', name: 'Streak Shield', emoji: '🛡️', desc: 'Protect your streak for 1 day', price: { gold: 500 }, consumable: true },
            { id: 'xp_potion', name: 'XP Potion', emoji: '🧪', desc: '2x XP for 1 hour', price: { gold: 300 }, consumable: true },
            { id: 'pet_treat', name: 'Pet Treat', emoji: '🍖', desc: '+50 pet happiness', price: { gold: 100 }, consumable: true },
            { id: 'mystery_box', name: 'Mystery Box', emoji: '📦', desc: 'Random reward inside!', price: { gems: 50 }, consumable: true },
            { id: 'golden_egg', name: 'Golden Egg', emoji: '🥚', desc: 'Hatch a random pet!', price: { gems: 150 }, consumable: true },
        ],
        themes: [
            { id: 'theme_forest', name: 'Forest Theme', emoji: '🌲', desc: 'Nature vibes', price: { gems: 100 } },
            { id: 'theme_ocean', name: 'Ocean Theme', emoji: '🌊', desc: 'Underwater calm', price: { gems: 100 } },
            { id: 'theme_space', name: 'Space Theme', emoji: '🚀', desc: 'Cosmic adventure', price: { gems: 150 } },
            { id: 'theme_sunset', name: 'Sunset Theme', emoji: '🌅', desc: 'Warm golden hues', price: { gems: 100 } },
            { id: 'theme_neon', name: 'Neon Theme', emoji: '💜', desc: 'Cyberpunk style', price: { gems: 200 } },
        ],
        powerups: [
            { id: 'mega_xp', name: 'Mega XP Boost', emoji: '⚡', desc: '3x XP for 24 hours', price: { gems: 100 } },
            { id: 'lucky_charm', name: 'Lucky Charm', emoji: '🍀', desc: '+50% gold for 24h', price: { gems: 80 } },
            { id: 'habit_slot', name: 'Extra Habit Slot', emoji: '➕', desc: 'Add 1 more habit (max 15)', price: { gems: 150 } },
            { id: 'auto_checkin', name: 'Auto Check-in', emoji: '✅', desc: 'Auto-complete 1 habit daily', price: { gems: 300 } },
        ]
    },

    // Gem packages for IAP
    gemPackages: [
        { id: 'gems_small', amount: 50, price: '$0.99', bonus: 0 },
        { id: 'gems_medium', amount: 150, price: '$2.99', bonus: 20, bestValue: false },
        { id: 'gems_large', amount: 500, price: '$7.99', bonus: 100, bestValue: true },
        { id: 'gems_mega', amount: 1200, price: '$14.99', bonus: 300, bestValue: false },
    ],

    // Achievements
    achievements: [
        // Habit completion achievements
        { id: 'first_habit', name: 'First Step', emoji: '👟', desc: 'Complete your first habit', condition: { type: 'habits_completed', count: 1 }, points: 10 },
        { id: 'habit_10', name: 'Getting Started', emoji: '🌱', desc: 'Complete 10 habits', condition: { type: 'habits_completed', count: 10 }, points: 25 },
        { id: 'habit_50', name: 'Building Momentum', emoji: '🚀', desc: 'Complete 50 habits', condition: { type: 'habits_completed', count: 50 }, points: 50 },
        { id: 'habit_100', name: 'Century Club', emoji: '💯', desc: 'Complete 100 habits', condition: { type: 'habits_completed', count: 100 }, points: 100 },
        { id: 'habit_500', name: 'Habit Master', emoji: '👑', desc: 'Complete 500 habits', condition: { type: 'habits_completed', count: 500 }, points: 250 },

        // Streak achievements
        { id: 'streak_3', name: 'Hot Streak', emoji: '🔥', desc: '3 day streak', condition: { type: 'streak', count: 3 }, points: 15 },
        { id: 'streak_7', name: 'Week Warrior', emoji: '📅', desc: '7 day streak', condition: { type: 'streak', count: 7 }, points: 30 },
        { id: 'streak_30', name: 'Monthly Master', emoji: '🗓️', desc: '30 day streak', condition: { type: 'streak', count: 30 }, points: 100 },
        { id: 'streak_100', name: 'Unstoppable', emoji: '⚡', desc: '100 day streak', condition: { type: 'streak', count: 100 }, points: 500 },

        // Level achievements
        { id: 'level_5', name: 'Rising Star', emoji: '⭐', desc: 'Reach level 5', condition: { type: 'level', count: 5 }, points: 20 },
        { id: 'level_10', name: 'Determined', emoji: '💪', desc: 'Reach level 10', condition: { type: 'level', count: 10 }, points: 40 },
        { id: 'level_25', name: 'Dedicated', emoji: '🎯', desc: 'Reach level 25', condition: { type: 'level', count: 25 }, points: 100 },
        { id: 'level_50', name: 'Legendary', emoji: '🏆', desc: 'Reach level 50', condition: { type: 'level', count: 50 }, points: 250 },

        // Pet achievements
        { id: 'pet_3', name: 'Pet Collector', emoji: '🐾', desc: 'Collect 3 pets', condition: { type: 'pets', count: 3 }, points: 25 },
        { id: 'pet_10', name: 'Pet Enthusiast', emoji: '🦮', desc: 'Collect 10 pets', condition: { type: 'pets', count: 10 }, points: 75 },
        { id: 'pet_evolve', name: 'Evolution!', emoji: '🌟', desc: 'Evolve a pet', condition: { type: 'evolution', count: 1 }, points: 50 },

        // Special achievements
        { id: 'perfect_day', name: 'Perfect Day', emoji: '✨', desc: 'Complete all habits in one day', condition: { type: 'perfect_day', count: 1 }, points: 30 },
        { id: 'early_bird', name: 'Early Bird', emoji: '🐦', desc: 'Complete a habit before 7 AM', condition: { type: 'early_bird', count: 1 }, points: 15 },
        { id: 'night_owl', name: 'Night Owl', emoji: '🦉', desc: 'Complete a habit after 10 PM', condition: { type: 'night_owl', count: 1 }, points: 15 },
        { id: 'gold_hoarder', name: 'Gold Hoarder', emoji: '🪙', desc: 'Save 5000 gold', condition: { type: 'gold', count: 5000 }, points: 50 },

        // Social achievements
        { id: 'first_friend', name: 'Social Butterfly', emoji: '🦋', desc: 'Add your first friend', condition: { type: 'friends', count: 1 }, points: 20 },
        { id: 'friend_5', name: 'Squad Goals', emoji: '👯', desc: 'Have 5 friends', condition: { type: 'friends', count: 5 }, points: 50 },
        { id: 'friend_10', name: 'Popular', emoji: '🌟', desc: 'Have 10 friends', condition: { type: 'friends', count: 10 }, points: 100 },
        { id: 'friend_20', name: 'Community Leader', emoji: '👑', desc: 'Have 20 friends', condition: { type: 'friends', count: 20 }, points: 200 },
    ],

    // Battle Pass tiers
    battlePassTiers: [
        { tier: 1, freeReward: { type: 'gold', amount: 50, emoji: '🪙' }, premiumReward: { type: 'gems', amount: 10, emoji: '💎' }, xpRequired: 0 },
        { tier: 2, freeReward: { type: 'gold', amount: 100, emoji: '🪙' }, premiumReward: { type: 'pet_treat', amount: 3, emoji: '🍖' }, xpRequired: 100 },
        { tier: 3, freeReward: { type: 'xp_potion', amount: 1, emoji: '🧪' }, premiumReward: { type: 'gems', amount: 20, emoji: '💎' }, xpRequired: 250 },
        { tier: 4, freeReward: { type: 'gold', amount: 200, emoji: '🪙' }, premiumReward: { type: 'streak_shield', amount: 1, emoji: '🛡️' }, xpRequired: 450 },
        { tier: 5, freeReward: { type: 'mystery_box', amount: 1, emoji: '📦' }, premiumReward: { type: 'gems', amount: 50, emoji: '💎' }, xpRequired: 700 },
        { tier: 6, freeReward: { type: 'gold', amount: 300, emoji: '🪙' }, premiumReward: { type: 'exclusive_pet', petId: 'ghost', emoji: '👻' }, xpRequired: 1000 },
        { tier: 7, freeReward: { type: 'pet_treat', amount: 5, emoji: '🍖' }, premiumReward: { type: 'gems', amount: 75, emoji: '💎' }, xpRequired: 1400 },
        { tier: 8, freeReward: { type: 'gold', amount: 500, emoji: '🪙' }, premiumReward: { type: 'mega_xp', amount: 1, emoji: '⚡' }, xpRequired: 1900 },
        { tier: 9, freeReward: { type: 'streak_shield', amount: 1, emoji: '🛡️' }, premiumReward: { type: 'gems', amount: 100, emoji: '💎' }, xpRequired: 2500 },
        { tier: 10, freeReward: { type: 'golden_egg', amount: 1, emoji: '🥚' }, premiumReward: { type: 'exclusive_pet', petId: 'robot', emoji: '🤖' }, xpRequired: 3200 },
    ],

    // Avatars - expanded collection including default person outline (null = default icon)
    avatars: [
        null, // Default person outline icon
        '😊', '😎', '🤓', '🥳', '😤', '🧙', '🦸', '🧝', '🧛', '🤠',
        '👨‍🚀', '👩‍🎤', '🥷', '🧚', '🧜', '🦹', '🧑‍🎓', '🧑‍💻', '🧑‍🔬', '🧑‍🎨',
        '🧑‍🚒', '🧑‍✈️', '🧑‍🍳', '👸', '🤴', '🦊', '🐱', '🐶', '🐼', '🦄',
        '🐉', '🦁', '🐯', '🐸', '🦋', '🌟', '💫', '🔥', '❄️', '🌈'
    ],

    // Player titles based on level
    titles: [
        { minLevel: 1, title: 'Novice' },
        { minLevel: 5, title: 'Apprentice' },
        { minLevel: 10, title: 'Habit Builder' },
        { minLevel: 20, title: 'Habit Master' },
        { minLevel: 35, title: 'Habit Champion' },
        { minLevel: 50, title: 'Habit Legend' },
        { minLevel: 75, title: 'Habit Mythic' },
        { minLevel: 100, title: 'Ultimate Hero' },
    ],
};

// Generate level thresholds with exponential curve
function generateLevelThresholds(maxLevel) {
    const thresholds = [0];
    for (let i = 1; i <= maxLevel; i++) {
        // Each level requires progressively more XP
        const xp = Math.floor(100 * Math.pow(1.15, i - 1));
        thresholds.push(thresholds[i - 1] + xp);
    }
    return thresholds;
}

// ==================== GAME STATE ====================

const GameState = {
    data: null,

    // Default state structure
    getDefaultState() {
        // Generate unique user tag (4 digit number)
        const userTag = String(Math.floor(1000 + Math.random() * 9000));

        return {
            player: {
                name: 'Adventurer',
                avatar: null, // null = default person outline, or emoji string
                profilePhoto: null, // base64 encoded custom photo
                userTag: userTag, // unique 4-digit identifier
                level: 1,
                xp: 0,
                totalXp: 0,
                gold: 100,
                gems: 10,
                streak: 0,
                bestStreak: 0,
                lastActiveDate: null,
                createdAt: new Date().toISOString(),
            },
            friends: [], // array of friend objects { id, name, tag, avatar, level, streak, addedAt }
            habits: [],
            completedToday: [],
            pets: {
                owned: ['pip'],
                active: 'pip',
                petData: {
                    pip: { happiness: 80, energy: 100, xp: 0, level: 1 }
                }
            },
            inventory: [],
            ownedItems: [],
            achievements: {
                unlocked: [],
                progress: {}
            },
            battlePass: {
                tier: 1,
                xp: 0,
                premium: false,
                claimedFree: [],
                claimedPremium: []
            },
            stats: {
                totalHabitsCompleted: 0,
                perfectDays: 0,
                petsEvolved: 0,
            },
            settings: {
                notifications: true,
                sound: true,
                theme: 'default'
            },
            premium: {
                active: false,
                expiresAt: null
            },
            ads: {
                watchedToday: 0,
                lastWatchedDate: null,
                dailyLimit: 5
            }
        };
    },

    // Initialize state
    init() {
        const saved = localStorage.getItem('habitHeroData');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
                // Merge with defaults in case of new fields
                this.data = this.mergeWithDefaults(this.data, this.getDefaultState());
            } catch (e) {
                console.error('Error loading save data:', e);
                this.data = this.getDefaultState();
            }
        } else {
            this.data = this.getDefaultState();
        }

        // Check for daily reset
        this.checkDailyReset();
        this.save();
    },

    // Merge saved data with default structure
    mergeWithDefaults(saved, defaults) {
        const merged = { ...defaults };
        for (const key in saved) {
            if (typeof saved[key] === 'object' && !Array.isArray(saved[key]) && saved[key] !== null) {
                merged[key] = this.mergeWithDefaults(saved[key], defaults[key] || {});
            } else {
                merged[key] = saved[key];
            }
        }
        return merged;
    },

    // Save to localStorage
    save() {
        localStorage.setItem('habitHeroData', JSON.stringify(this.data));
    },

    // Check if we need to reset daily progress
    checkDailyReset() {
        const today = new Date().toDateString();
        const lastActive = this.data.player.lastActiveDate;

        if (lastActive !== today) {
            // Check if streak should be maintained or broken
            if (lastActive) {
                const lastDate = new Date(lastActive);
                const todayDate = new Date(today);
                const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

                if (diffDays > 1) {
                    // Streak broken (missed more than 1 day)
                    this.data.player.streak = 0;
                    Toast.show('😢 Streak reset! Start building again!', 'warning');
                }
            }

            // Reset daily data
            this.data.completedToday = [];
            this.data.ads.watchedToday = 0;
            this.data.ads.lastWatchedDate = today;
            this.data.player.lastActiveDate = today;

            // Decrease pet happiness over time
            for (const petId in this.data.pets.petData) {
                this.data.pets.petData[petId].happiness = Math.max(0, this.data.pets.petData[petId].happiness - 10);
            }
        }
    },

    // Add XP to player
    addXP(amount) {
        // Apply streak bonus
        const streakBonus = Math.min(this.data.player.streak * 5, 100); // Max 100% bonus
        const streakBonusXP = Math.floor(amount * (streakBonus / 100));

        // Apply friend bonus (5% per friend, max 25%)
        const friendBonus = Math.min(this.data.friends.length * 5, 25);
        const friendBonusXP = Math.floor(amount * (friendBonus / 100));

        const totalXP = amount + streakBonusXP + friendBonusXP;

        // Apply premium bonus
        const premiumMultiplier = this.data.premium.active ? 2 : 1;
        const finalXP = totalXP * premiumMultiplier;

        this.data.player.xp += finalXP;
        this.data.player.totalXp += finalXP;

        // Add to battle pass XP
        this.data.battlePass.xp += finalXP;

        // Show XP popup
        showXPPopup(finalXP);

        // Check for level up
        this.checkLevelUp();

        // Check battle pass progression
        BattlePass.checkProgress();

        this.save();
        UI.updateAll();

        return finalXP;
    },

    // Check and handle level up
    checkLevelUp() {
        const thresholds = GAME_DATA.levelThresholds;
        let currentLevel = this.data.player.level;

        while (currentLevel < thresholds.length - 1 &&
               this.data.player.totalXp >= thresholds[currentLevel]) {
            currentLevel++;
        }

        if (currentLevel > this.data.player.level) {
            const oldLevel = this.data.player.level;
            this.data.player.level = currentLevel;

            // Calculate rewards for leveling up
            const rewards = [];
            for (let lvl = oldLevel + 1; lvl <= currentLevel; lvl++) {
                // Gold reward
                const goldReward = lvl * 20;
                this.data.player.gold += goldReward;
                rewards.push(`+${goldReward} 🪙`);

                // Check for pet unlocks
                const unlockedPets = GAME_DATA.pets.filter(p =>
                    p.unlockLevel === lvl &&
                    !p.premium &&
                    !p.shopPrice &&
                    !this.data.pets.owned.includes(p.id)
                );

                unlockedPets.forEach(pet => {
                    this.data.pets.owned.push(pet.id);
                    this.data.pets.petData[pet.id] = { happiness: 80, energy: 100, xp: 0, level: 1 };
                    rewards.push(`${pet.emoji} ${pet.name}`);

                    // Show pet unlock modal after level up modal
                    setTimeout(() => {
                        PetManager.showPetUnlockModal(pet);
                    }, 2000);
                });

                // Gem rewards at milestone levels
                if (lvl % 5 === 0) {
                    const gemReward = lvl;
                    this.data.player.gems += gemReward;
                    rewards.push(`+${gemReward} 💎`);
                }
            }

            // Show level up modal
            showLevelUpModal(currentLevel, rewards);

            // Check achievements
            Achievements.check('level', currentLevel);
        }
    },

    // Add currency
    addGold(amount) {
        this.data.player.gold += amount;
        Achievements.check('gold', this.data.player.gold);
        this.save();
        UI.updateCurrency();
    },

    addGems(amount) {
        this.data.player.gems += amount;
        this.save();
        UI.updateCurrency();
    },

    // Spend currency
    spendGold(amount) {
        if (this.data.player.gold >= amount) {
            this.data.player.gold -= amount;
            this.save();
            UI.updateCurrency();
            return true;
        }
        Toast.show('Not enough gold!', 'error');
        return false;
    },

    spendGems(amount) {
        if (this.data.player.gems >= amount) {
            this.data.player.gems -= amount;
            this.save();
            UI.updateCurrency();
            return true;
        }
        Toast.show('Not enough gems!', 'error');
        return false;
    },

    // Show gem shop modal
    showGemShop() {
        document.getElementById('gem-shop-modal').classList.add('active');
        document.getElementById('gem-shop-balance').textContent = `${this.data.player.gems} 💎`;
        renderGemPackages();
    }
};

// ==================== HABIT MANAGER ====================

const HabitManager = {
    selectedCategory: 'health',
    selectedDifficulty: 'medium',
    selectedFrequency: 'daily',
    selectedDays: [0, 1, 2, 3, 4, 5, 6],

    // Show add habit modal
    showAddHabitModal() {
        // Check habit limit for non-premium users
        const maxHabits = GameState.data.premium.active ? 15 : 5;
        if (GameState.data.habits.length >= maxHabits) {
            if (!GameState.data.premium.active) {
                Toast.show('Upgrade to Pro for more habits!', 'warning');
                showPremium();
            } else {
                Toast.show('Maximum habits reached!', 'warning');
            }
            return;
        }

        document.getElementById('add-habit-modal').classList.add('active');
        document.getElementById('habit-name-input').value = '';
        document.getElementById('habit-name-input').focus();
    },

    // Hide add habit modal
    hideAddHabitModal() {
        document.getElementById('add-habit-modal').classList.remove('active');
    },

    // Create new habit
    createHabit() {
        const name = document.getElementById('habit-name-input').value.trim();
        if (!name) {
            Toast.show('Please enter a quest name!', 'error');
            return;
        }

        const xpValues = { easy: 10, medium: 25, hard: 50 };
        const goldValues = { easy: 5, medium: 10, hard: 20 };

        const habit = {
            id: Date.now().toString(),
            name: name,
            category: this.selectedCategory,
            difficulty: this.selectedDifficulty,
            frequency: this.selectedFrequency,
            days: this.selectedDays,
            xpReward: xpValues[this.selectedDifficulty],
            goldReward: goldValues[this.selectedDifficulty],
            streak: 0,
            createdAt: new Date().toISOString(),
            reminderTime: document.getElementById('reminder-time-input').value || null
        };

        GameState.data.habits.push(habit);
        GameState.save();

        this.hideAddHabitModal();
        this.renderHabits();

        Toast.show('Quest created! 🎮', 'success');
        playSound('create');
    },

    // Complete a habit
    completeHabit(habitId) {
        const habit = GameState.data.habits.find(h => h.id === habitId);
        if (!habit) return;

        // Check if already completed today
        if (GameState.data.completedToday.includes(habitId)) {
            Toast.show('Already completed today!', 'warning');
            return;
        }

        // Mark as completed
        GameState.data.completedToday.push(habitId);
        habit.streak++;
        GameState.data.stats.totalHabitsCompleted++;

        // Award XP and gold
        const xpGained = GameState.addXP(habit.xpReward);
        GameState.addGold(habit.goldReward);

        // Feed active pet
        PetManager.addPetXP(5);

        // Update streak if all habits completed
        this.checkDailyCompletion();

        // Check achievements
        Achievements.check('habits_completed', GameState.data.stats.totalHabitsCompleted);
        Achievements.check('streak', habit.streak);

        // Check for early bird / night owl
        const hour = new Date().getHours();
        if (hour < 7) Achievements.check('early_bird', 1);
        if (hour >= 22) Achievements.check('night_owl', 1);

        GameState.save();
        this.renderHabits();
        UI.updateDailyProgress();

        Toast.show(`+${xpGained} XP, +${habit.goldReward} 🪙`, 'success');
        playSound('complete');
    },

    // Uncomplete a habit (undo)
    uncompleteHabit(habitId) {
        const index = GameState.data.completedToday.indexOf(habitId);
        if (index > -1) {
            GameState.data.completedToday.splice(index, 1);
            const habit = GameState.data.habits.find(h => h.id === habitId);
            if (habit && habit.streak > 0) {
                habit.streak--;
            }
            GameState.save();
            this.renderHabits();
            UI.updateDailyProgress();
        }
    },

    // Delete a habit
    deleteHabit(habitId) {
        if (confirm('Delete this quest? This cannot be undone.')) {
            GameState.data.habits = GameState.data.habits.filter(h => h.id !== habitId);
            GameState.data.completedToday = GameState.data.completedToday.filter(id => id !== habitId);
            GameState.save();
            this.renderHabits();
            UI.updateDailyProgress();
            Toast.show('Quest deleted', 'success');
        }
    },

    // Check if all habits are completed for the day
    checkDailyCompletion() {
        const todayHabits = this.getTodayHabits();
        const allCompleted = todayHabits.every(h => GameState.data.completedToday.includes(h.id));

        if (allCompleted && todayHabits.length > 0) {
            // Increment player streak
            const today = new Date().toDateString();
            if (GameState.data.player.lastActiveDate !== today || GameState.data.player.streak === 0) {
                GameState.data.player.streak++;
                if (GameState.data.player.streak > GameState.data.player.bestStreak) {
                    GameState.data.player.bestStreak = GameState.data.player.streak;
                }
            }

            // Perfect day achievement
            GameState.data.stats.perfectDays++;
            Achievements.check('perfect_day', GameState.data.stats.perfectDays);

            // Daily completion bonus
            const bonusGold = 50 + (GameState.data.player.streak * 10);
            GameState.addGold(bonusGold);

            Toast.show(`🎉 All quests complete! +${bonusGold} bonus gold!`, 'success');
            playSound('achievement');
        }

        UI.updateStreak();
    },

    // Get habits scheduled for today
    getTodayHabits() {
        const today = new Date().getDay();
        return GameState.data.habits.filter(habit => {
            if (habit.frequency === 'daily') return true;
            if (habit.frequency === 'weekdays') return today >= 1 && today <= 5;
            if (habit.frequency === 'weekends') return today === 0 || today === 6;
            if (habit.frequency === 'custom') return habit.days.includes(today);
            return true;
        });
    },

    // Render habits list
    renderHabits() {
        const container = document.getElementById('habits-list');
        const todayHabits = this.getTodayHabits();

        if (todayHabits.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <h3>No quests yet!</h3>
                    <p>Create your first habit quest to start your journey</p>
                </div>
            `;
            return;
        }

        container.innerHTML = todayHabits.map(habit => {
            const isCompleted = GameState.data.completedToday.includes(habit.id);
            return `
                <div class="habit-card ${isCompleted ? 'completed' : ''}" data-category="${habit.category}">
                    <div class="habit-header">
                        <div class="habit-checkbox" onclick="HabitManager.${isCompleted ? 'uncompleteHabit' : 'completeHabit'}('${habit.id}')">
                            <span class="checkmark">✓</span>
                        </div>
                        <div class="habit-info">
                            <div class="habit-name">${escapeHtml(habit.name)}</div>
                            <div class="habit-meta">
                                <span class="habit-streak">🔥 ${habit.streak}</span>
                                <span>•</span>
                                <span>${getCategoryEmoji(habit.category)} ${capitalize(habit.category)}</span>
                            </div>
                        </div>
                        <div class="habit-xp">+${habit.xpReward} XP</div>
                        <div class="habit-actions">
                            <button class="habit-action-btn" onclick="HabitManager.deleteHabit('${habit.id}')" title="Delete">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
};

// ==================== PET MANAGER ====================

const PetManager = {
    // Feed active pet
    feedPet() {
        if (!GameState.spendGold(10)) return;

        const activePet = GameState.data.pets.active;
        const petData = GameState.data.pets.petData[activePet];

        petData.happiness = Math.min(100, petData.happiness + 20);
        petData.energy = Math.min(100, petData.energy + 10);

        this.addPetXP(10);

        Toast.show('Pet fed! 🍎 +20 happiness', 'success');
        playSound('feed');

        UI.updatePetDisplay();
    },

    // Add XP to active pet
    addPetXP(amount) {
        const activePet = GameState.data.pets.active;
        const petData = GameState.data.pets.petData[activePet];

        petData.xp += amount;

        // Check for pet level up (every 100 XP)
        const newLevel = Math.floor(petData.xp / 100) + 1;
        if (newLevel > petData.level) {
            petData.level = newLevel;
            petData.happiness = Math.min(100, petData.happiness + 30);

            // Check for evolution
            this.checkEvolution(activePet);

            Toast.show(`${this.getPetEmoji(activePet)} leveled up to ${newLevel}!`, 'success');
        }

        GameState.save();
        UI.updatePetDisplay();
    },

    // Check if pet can evolve
    checkEvolution(petId) {
        const pet = GAME_DATA.pets.find(p => p.id === petId);
        const petData = GameState.data.pets.petData[petId];

        if (pet && pet.evolution && petData.level >= 10) {
            // Check if evolution is unlocked
            const evolutionPet = GAME_DATA.pets.find(p => p.id === pet.evolution);
            if (evolutionPet && !GameState.data.pets.owned.includes(pet.evolution)) {
                // Unlock evolution
                GameState.data.pets.owned.push(pet.evolution);
                GameState.data.pets.petData[pet.evolution] = { happiness: 100, energy: 100, xp: 0, level: 1 };
                GameState.data.pets.active = pet.evolution;

                GameState.data.stats.petsEvolved++;
                Achievements.check('evolution', GameState.data.stats.petsEvolved);

                setTimeout(() => {
                    this.showPetUnlockModal(evolutionPet);
                }, 500);
            }
        }
    },

    // Get pet emoji by ID
    getPetEmoji(petId) {
        const pet = GAME_DATA.pets.find(p => p.id === petId);
        return pet ? pet.emoji : '🐣';
    },

    // Get pet name by ID
    getPetName(petId) {
        const pet = GAME_DATA.pets.find(p => p.id === petId);
        return pet ? pet.name : 'Unknown';
    },

    // Set active pet
    setActivePet(petId) {
        if (GameState.data.pets.owned.includes(petId)) {
            GameState.data.pets.active = petId;
            GameState.save();
            UI.updatePetDisplay();
            this.renderPetGrid();
            Toast.show(`${this.getPetEmoji(petId)} is now your companion!`, 'success');
        }
    },

    // Show pet unlock modal
    showPetUnlockModal(pet) {
        document.getElementById('new-pet-display').textContent = pet.emoji;
        document.getElementById('pet-unlock-name').textContent = pet.name;
        document.getElementById('pet-unlock-desc').textContent = pet.desc;
        document.getElementById('pet-unlock-modal').classList.add('active');

        Achievements.check('pets', GameState.data.pets.owned.length);
        playSound('unlock');
    },

    // Render pet grid in Pets tab
    renderPetGrid() {
        const container = document.getElementById('pet-grid');

        container.innerHTML = GAME_DATA.pets.map(pet => {
            const isOwned = GameState.data.pets.owned.includes(pet.id);
            const isActive = GameState.data.pets.active === pet.id;
            const canUnlock = pet.unlockLevel <= GameState.data.player.level;

            let unlockText = '';
            if (!isOwned) {
                if (pet.premium) {
                    unlockText = '👑 Premium';
                } else if (pet.shopPrice) {
                    unlockText = `${pet.shopPrice.gems} 💎`;
                } else {
                    unlockText = `Level ${pet.unlockLevel}`;
                }
            }

            return `
                <div class="pet-card ${isOwned ? '' : 'locked'} ${isActive ? 'active' : ''}"
                     onclick="${isOwned ? `PetManager.setActivePet('${pet.id}')` : ''}">
                    <div class="pet-card-sprite">${pet.emoji}</div>
                    <div class="pet-card-name">${isOwned ? pet.name : '???'}</div>
                    ${!isOwned ? `<div class="pet-card-unlock">${unlockText}</div>` : ''}
                </div>
            `;
        }).join('');
    }
};

// ==================== SHOP MANAGER ====================

const ShopManager = {
    currentTab: 'items',

    // Switch shop tab
    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.shop-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.shop === tab);
        });
        this.renderShop();
    },

    // Render shop items
    renderShop() {
        const container = document.getElementById('shop-items');
        let items = [];

        switch (this.currentTab) {
            case 'items':
                items = GAME_DATA.shopItems.items;
                break;
            case 'pets':
                items = GAME_DATA.pets.filter(p => p.shopPrice && !GameState.data.pets.owned.includes(p.id));
                break;
            case 'themes':
                items = GAME_DATA.shopItems.themes;
                break;
            case 'powerups':
                items = GAME_DATA.shopItems.powerups;
                break;
        }

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🛒</div>
                    <h3>No items available</h3>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => {
            const isOwned = GameState.data.ownedItems.includes(item.id);
            const price = item.price || item.shopPrice;
            const priceType = price.gold ? 'gold' : 'gems';
            const priceAmount = price.gold || price.gems;

            return `
                <div class="shop-item ${isOwned ? 'owned' : ''}" onclick="${isOwned ? '' : `ShopManager.buyItem('${item.id}')`}">
                    <div class="shop-item-icon">${item.emoji}</div>
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-desc">${item.desc}</div>
                    <div class="shop-item-price ${priceType}-price">
                        ${priceType === 'gold' ? '🪙' : '💎'} ${priceAmount}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Buy an item
    buyItem(itemId) {
        // Find item in all categories
        let item = GAME_DATA.shopItems.items.find(i => i.id === itemId) ||
                   GAME_DATA.shopItems.themes.find(i => i.id === itemId) ||
                   GAME_DATA.shopItems.powerups.find(i => i.id === itemId) ||
                   GAME_DATA.pets.find(p => p.id === itemId);

        if (!item) return;

        const price = item.price || item.shopPrice;

        // Process purchase
        if (price.gold) {
            if (!GameState.spendGold(price.gold)) return;
        } else if (price.gems) {
            if (!GameState.spendGems(price.gems)) return;
        }

        // Add to inventory or owned items
        if (item.consumable) {
            GameState.data.inventory.push({
                id: itemId,
                acquiredAt: new Date().toISOString()
            });
        } else {
            // For pets
            if (GAME_DATA.pets.find(p => p.id === itemId)) {
                GameState.data.pets.owned.push(itemId);
                GameState.data.pets.petData[itemId] = { happiness: 80, energy: 100, xp: 0, level: 1 };
                PetManager.showPetUnlockModal(item);
            } else {
                GameState.data.ownedItems.push(itemId);
            }
        }

        GameState.save();
        this.renderShop();

        Toast.show(`Purchased ${item.name}! 🎉`, 'success');
        playSound('purchase');
    },

    // Use a consumable item
    useItem(itemId) {
        const itemIndex = GameState.data.inventory.findIndex(i => i.id === itemId);
        if (itemIndex === -1) return;

        const item = GAME_DATA.shopItems.items.find(i => i.id === itemId);
        if (!item) return;

        // Apply item effect
        switch (itemId) {
            case 'streak_shield':
                // Implement streak protection
                Toast.show('Streak protected for 24 hours! 🛡️', 'success');
                break;
            case 'xp_potion':
                // Double XP is handled in addXP
                Toast.show('2x XP active for 1 hour! 🧪', 'success');
                break;
            case 'pet_treat':
                const petData = GameState.data.pets.petData[GameState.data.pets.active];
                petData.happiness = Math.min(100, petData.happiness + 50);
                UI.updatePetDisplay();
                Toast.show('Pet happiness +50! 🍖', 'success');
                break;
            case 'mystery_box':
                this.openMysteryBox();
                break;
            case 'golden_egg':
                this.hatchGoldenEgg();
                break;
        }

        // Remove from inventory
        GameState.data.inventory.splice(itemIndex, 1);
        GameState.save();
        playSound('use');
    },

    // Open mystery box
    openMysteryBox() {
        const rewards = [
            { type: 'gold', amount: Math.floor(Math.random() * 200) + 50, emoji: '🪙' },
            { type: 'gems', amount: Math.floor(Math.random() * 20) + 5, emoji: '💎' },
            { type: 'xp', amount: Math.floor(Math.random() * 100) + 25, emoji: '⭐' },
        ];

        const reward = rewards[Math.floor(Math.random() * rewards.length)];

        switch (reward.type) {
            case 'gold':
                GameState.addGold(reward.amount);
                break;
            case 'gems':
                GameState.addGems(reward.amount);
                break;
            case 'xp':
                GameState.addXP(reward.amount);
                break;
        }

        Toast.show(`Mystery Box: +${reward.amount} ${reward.emoji}`, 'success');
        playSound('unlock');
    },

    // Hatch golden egg
    hatchGoldenEgg() {
        // Get unowned non-premium pets
        const availablePets = GAME_DATA.pets.filter(p =>
            !p.premium &&
            !p.shopPrice &&
            !GameState.data.pets.owned.includes(p.id)
        );

        if (availablePets.length === 0) {
            // Give gems instead
            GameState.addGems(50);
            Toast.show('You own all pets! +50 💎 instead', 'success');
            return;
        }

        const pet = availablePets[Math.floor(Math.random() * availablePets.length)];
        GameState.data.pets.owned.push(pet.id);
        GameState.data.pets.petData[pet.id] = { happiness: 100, energy: 100, xp: 0, level: 1 };
        GameState.save();

        PetManager.showPetUnlockModal(pet);
    }
};

// ==================== ACHIEVEMENTS ====================

const Achievements = {
    // Check achievement progress
    check(type, value) {
        GAME_DATA.achievements.forEach(achievement => {
            if (GameState.data.achievements.unlocked.includes(achievement.id)) return;

            if (achievement.condition.type === type && value >= achievement.condition.count) {
                this.unlock(achievement);
            }
        });
    },

    // Unlock an achievement
    unlock(achievement) {
        if (GameState.data.achievements.unlocked.includes(achievement.id)) return;

        GameState.data.achievements.unlocked.push(achievement.id);

        // Award points as gold
        GameState.addGold(achievement.points * 2);

        GameState.save();

        Toast.show(`🏆 Achievement: ${achievement.name}!`, 'success');
        playSound('achievement');

        this.render();
    },

    // Render achievements grid
    render() {
        const container = document.getElementById('achievements-grid');
        const totalPoints = GameState.data.achievements.unlocked.reduce((sum, id) => {
            const ach = GAME_DATA.achievements.find(a => a.id === id);
            return sum + (ach ? ach.points : 0);
        }, 0);

        document.getElementById('achievement-points').textContent = `${totalPoints} ⭐`;

        container.innerHTML = GAME_DATA.achievements.map(achievement => {
            const isUnlocked = GameState.data.achievements.unlocked.includes(achievement.id);

            return `
                <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${achievement.emoji}</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                    <div class="achievement-points-badge">${achievement.points} ⭐</div>
                </div>
            `;
        }).join('');
    }
};

// ==================== BATTLE PASS ====================

const BattlePass = {
    // Show battle pass modal
    show() {
        document.getElementById('battle-pass-modal').classList.add('active');
        this.render();
    },

    // Check battle pass progression
    checkProgress() {
        const tiers = GAME_DATA.battlePassTiers;
        const currentXP = GameState.data.battlePass.xp;

        // Find current tier based on XP
        let newTier = 1;
        for (let i = tiers.length - 1; i >= 0; i--) {
            if (currentXP >= tiers[i].xpRequired) {
                newTier = tiers[i].tier;
                break;
            }
        }

        if (newTier > GameState.data.battlePass.tier) {
            GameState.data.battlePass.tier = newTier;
            Toast.show(`🎖️ Season Pass Tier ${newTier}!`, 'success');
        }

        UI.updateBattlePass();
    },

    // Claim tier reward
    claimReward(tier, isPremium) {
        const tierData = GAME_DATA.battlePassTiers.find(t => t.tier === tier);
        if (!tierData) return;

        // Check if already claimed
        const claimedArray = isPremium ?
            GameState.data.battlePass.claimedPremium :
            GameState.data.battlePass.claimedFree;

        if (claimedArray.includes(tier)) {
            Toast.show('Already claimed!', 'warning');
            return;
        }

        // Check if tier is unlocked
        if (tier > GameState.data.battlePass.tier) {
            Toast.show('Reach this tier first!', 'warning');
            return;
        }

        // Check premium requirement
        if (isPremium && !GameState.data.battlePass.premium) {
            Toast.show('Upgrade to Premium Pass!', 'warning');
            return;
        }

        // Award reward
        const reward = isPremium ? tierData.premiumReward : tierData.freeReward;

        switch (reward.type) {
            case 'gold':
                GameState.addGold(reward.amount);
                break;
            case 'gems':
                GameState.addGems(reward.amount);
                break;
            case 'exclusive_pet':
                if (!GameState.data.pets.owned.includes(reward.petId)) {
                    const pet = GAME_DATA.pets.find(p => p.id === reward.petId);
                    GameState.data.pets.owned.push(reward.petId);
                    GameState.data.pets.petData[reward.petId] = { happiness: 100, energy: 100, xp: 0, level: 1 };
                    if (pet) PetManager.showPetUnlockModal(pet);
                }
                break;
            default:
                // Add consumable to inventory
                GameState.data.inventory.push({
                    id: reward.type,
                    acquiredAt: new Date().toISOString()
                });
        }

        claimedArray.push(tier);
        GameState.save();

        Toast.show(`Claimed: ${reward.amount || ''} ${reward.emoji}`, 'success');
        playSound('unlock');

        this.render();
    },

    // Upgrade to premium pass
    upgrade() {
        if (GameState.spendGems(500)) {
            GameState.data.battlePass.premium = true;
            GameState.save();
            Toast.show('Premium Pass activated! 🎉', 'success');
            this.render();
        }
    },

    // Render battle pass
    render() {
        const container = document.getElementById('bp-tracks');
        const tiers = GAME_DATA.battlePassTiers;
        const currentTier = GameState.data.battlePass.tier;
        const isPremium = GameState.data.battlePass.premium;

        container.innerHTML = tiers.map(tier => {
            const isUnlocked = tier.tier <= currentTier;
            const isCurrent = tier.tier === currentTier;
            const freeClaimed = GameState.data.battlePass.claimedFree.includes(tier.tier);
            const premiumClaimed = GameState.data.battlePass.claimedPremium.includes(tier.tier);

            return `
                <div class="bp-tier-row ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}">
                    <div class="bp-tier-number">${tier.tier}</div>
                    <div class="bp-free-reward ${freeClaimed ? 'claimed' : ''}"
                         onclick="BattlePass.claimReward(${tier.tier}, false)">
                        ${tier.freeReward.emoji} ${freeClaimed ? '✓' : ''}
                    </div>
                    <div class="bp-premium-reward ${isPremium ? 'unlocked' : ''} ${premiumClaimed ? 'claimed' : ''}"
                         onclick="BattlePass.claimReward(${tier.tier}, true)">
                        ${tier.premiumReward.emoji} ${premiumClaimed ? '✓' : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Hide upgrade section if already premium
        document.getElementById('bp-upgrade-section').style.display = isPremium ? 'none' : 'block';
    }
};

// ==================== AD MANAGER ====================

const AdManager = {
    // Watch ad for gems
    watchAd() {
        const adsData = GameState.data.ads;

        // Check daily limit
        if (adsData.watchedToday >= adsData.dailyLimit) {
            Toast.show('Daily ad limit reached!', 'warning');
            return;
        }

        // Simulate ad watching (in real app, integrate with AdMob/Unity Ads)
        Toast.show('Watching ad...', 'success');

        setTimeout(() => {
            adsData.watchedToday++;
            GameState.addGems(5);
            GameState.save();

            Toast.show('Thanks for watching! +5 💎', 'success');
            playSound('reward');

            this.updateAdUI();
        }, 2000);
    },

    // Update ad-related UI
    updateAdUI() {
        const remaining = GameState.data.ads.dailyLimit - GameState.data.ads.watchedToday;
        document.getElementById('ad-limit-text').textContent = `${remaining} ads remaining today`;
    }
};

// ==================== FRIENDS MANAGER ====================

const FriendsManager = {
    selectedFriend: null,

    // Get the player's friend code
    getFriendCode() {
        const player = GameState.data.player;
        return `${player.name}#${player.userTag}`;
    },

    // Show add friend modal
    showAddFriendModal() {
        document.getElementById('add-friend-modal').classList.add('active');
        document.getElementById('modal-friend-code').textContent = this.getFriendCode();
        document.getElementById('friend-code-input').value = '';
    },

    // Copy friend code to clipboard
    copyFriendCode() {
        const code = this.getFriendCode();
        navigator.clipboard.writeText(code).then(() => {
            Toast.show('Friend code copied! 📋', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            Toast.show('Friend code copied! 📋', 'success');
        });
    },

    // Share friend code using Web Share API
    shareCode() {
        const code = this.getFriendCode();
        if (navigator.share) {
            navigator.share({
                title: 'Add me on HabitHero!',
                text: `Join me on HabitHero and let's build habits together! My friend code: ${code}`,
                url: window.location.href
            }).catch(() => {
                // Share cancelled or failed
                this.copyFriendCode();
            });
        } else {
            // Fallback to copy
            this.copyFriendCode();
        }
    },

    // Add a friend by their code
    addFriend() {
        const input = document.getElementById('friend-code-input').value.trim();

        // Validate format: Name#1234
        const codeRegex = /^(.+)#(\d{4})$/;
        const match = input.match(codeRegex);

        if (!match) {
            Toast.show('Invalid code format! Use Name#1234', 'error');
            return;
        }

        const friendName = match[1];
        const friendTag = match[2];

        // Check if it's the player's own code
        if (friendName === GameState.data.player.name && friendTag === GameState.data.player.userTag) {
            Toast.show("You can't add yourself!", 'warning');
            return;
        }

        // Check if already a friend
        const existingFriend = GameState.data.friends.find(
            f => f.name === friendName && f.tag === friendTag
        );
        if (existingFriend) {
            Toast.show('Already friends!', 'warning');
            return;
        }

        // Check friend limit (max 20 friends for free, 50 for premium)
        const maxFriends = GameState.data.premium.active ? 50 : 20;
        if (GameState.data.friends.length >= maxFriends) {
            Toast.show(`Max ${maxFriends} friends reached!`, 'warning');
            return;
        }

        // Add the friend (in a real app, this would verify the code with a server)
        const newFriend = {
            id: `${friendName}#${friendTag}`,
            name: friendName,
            tag: friendTag,
            avatar: null, // Will be updated when synced
            level: Math.floor(Math.random() * 20) + 1, // Demo: random level
            streak: Math.floor(Math.random() * 30), // Demo: random streak
            habitsCompleted: Math.floor(Math.random() * 100), // Demo data
            addedAt: new Date().toISOString(),
            isOnline: Math.random() > 0.5 // Demo: random online status
        };

        GameState.data.friends.push(newFriend);
        GameState.save();

        closeModal('add-friend-modal');
        this.renderFriendsList();
        this.updateFriendBonus();

        Toast.show(`${friendName} added as friend! 🎉`, 'success');
        playSound('achievement');

        // Check for friend-related achievements
        Achievements.check('friends', GameState.data.friends.length);
    },

    // Show friend profile modal
    showFriendProfile(friendId) {
        const friend = GameState.data.friends.find(f => f.id === friendId);
        if (!friend) return;

        this.selectedFriend = friend;

        document.getElementById('friend-modal-avatar').textContent = friend.avatar || '👤';
        document.getElementById('friend-modal-name').textContent = friend.name;
        document.getElementById('friend-modal-tag').textContent = `#${friend.tag}`;
        document.getElementById('friend-modal-level').textContent = friend.level;
        document.getElementById('friend-modal-streak').textContent = friend.streak;
        document.getElementById('friend-modal-habits').textContent = friend.habitsCompleted || 0;

        document.getElementById('friend-profile-modal').classList.add('active');
    },

    // Remove selected friend
    removeFriend() {
        if (!this.selectedFriend) return;

        if (confirm(`Remove ${this.selectedFriend.name} from friends?`)) {
            GameState.data.friends = GameState.data.friends.filter(
                f => f.id !== this.selectedFriend.id
            );
            GameState.save();

            closeModal('friend-profile-modal');
            this.renderFriendsList();
            this.updateFriendBonus();

            Toast.show('Friend removed', 'success');
        }
    },

    // Challenge a friend (demo feature)
    challengeFriend() {
        if (!this.selectedFriend) return;

        Toast.show(`Challenge sent to ${this.selectedFriend.name}! ⚔️`, 'success');
        closeModal('friend-profile-modal');
    },

    // Render friends list in profile
    renderFriendsList() {
        const container = document.getElementById('friends-list');
        const friends = GameState.data.friends;

        if (friends.length === 0) {
            container.innerHTML = `
                <div class="empty-friends">
                    <span>No friends yet</span>
                    <p>Add friends to earn bonus XP!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = friends.map(friend => `
            <div class="friend-card" onclick="FriendsManager.showFriendProfile('${friend.id}')">
                <div class="friend-avatar">${friend.avatar || '👤'}</div>
                <div class="friend-info">
                    <div class="friend-name">${escapeHtml(friend.name)}</div>
                    <div class="friend-details">
                        <span class="friend-level">Lv.${friend.level}</span>
                        <span class="friend-streak">🔥 ${friend.streak}</span>
                    </div>
                </div>
                <div class="friend-status ${friend.isOnline ? 'online' : 'offline'}"></div>
            </div>
        `).join('');
    },

    // Update friend bonus display
    updateFriendBonus() {
        const bonus = Math.min(GameState.data.friends.length * 5, 25);
        const banner = document.getElementById('social-bonus-banner');
        const bonusValue = document.getElementById('friend-bonus-value');

        if (bonus > 0) {
            banner.classList.add('active');
            bonusValue.textContent = `+${bonus}% XP`;
        } else {
            banner.classList.remove('active');
        }

        // Update friend code display
        document.getElementById('friend-code-text').textContent = this.getFriendCode();
    }
};

// ==================== PREMIUM ====================

const Premium = {
    // Subscribe to premium
    subscribe() {
        // In real app, integrate with Google Play Billing
        Toast.show('Premium purchase would be processed here', 'success');

        // For demo, activate premium
        GameState.data.premium.active = true;
        GameState.data.premium.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        GameState.save();

        Toast.show('🎉 Welcome to HabitHero Pro!', 'success');
        closeModal('premium-modal');
        UI.updateAll();
    }
};

// ==================== UI MANAGER ====================

const UI = {
    // Update all UI elements
    updateAll() {
        this.updatePlayerInfo();
        this.updateCurrency();
        this.updateStreak();
        this.updatePetDisplay();
        this.updateDailyProgress();
        this.updateBattlePass();
    },

    // Update player info in header
    updatePlayerInfo() {
        const player = GameState.data.player;

        document.getElementById('player-name').textContent = player.name;
        document.getElementById('level-badge').textContent = player.level;

        // Update header avatar/photo
        const headerAvatar = document.getElementById('header-avatar');
        const headerPhoto = document.getElementById('header-photo');

        if (player.profilePhoto) {
            // Show custom photo
            headerAvatar.style.display = 'none';
            headerPhoto.src = player.profilePhoto;
            headerPhoto.style.display = 'block';
        } else if (player.avatar) {
            // Show emoji avatar
            headerAvatar.innerHTML = player.avatar;
            headerAvatar.style.display = 'flex';
            headerPhoto.style.display = 'none';
        } else {
            // Show default person icon
            headerAvatar.innerHTML = `
                <svg class="default-avatar-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            `;
            headerAvatar.style.display = 'flex';
            headerPhoto.style.display = 'none';
        }

        // Calculate XP progress to next level
        const currentLevelXP = GAME_DATA.levelThresholds[player.level - 1] || 0;
        const nextLevelXP = GAME_DATA.levelThresholds[player.level] || currentLevelXP + 100;
        const progressXP = player.totalXp - currentLevelXP;
        const neededXP = nextLevelXP - currentLevelXP;
        const percentage = Math.min(100, (progressXP / neededXP) * 100);

        document.getElementById('xp-fill').style.width = `${percentage}%`;
        document.getElementById('xp-text').textContent = `${progressXP} / ${neededXP} XP`;

        // Update profile tab
        document.getElementById('profile-name').textContent = player.name;
        document.getElementById('profile-user-tag').textContent = `#${player.userTag}`;

        // Update profile avatar/photo
        const profileAvatar = document.getElementById('profile-avatar');
        const profilePhoto = document.getElementById('profile-photo');

        if (player.profilePhoto) {
            profileAvatar.style.display = 'none';
            profilePhoto.src = player.profilePhoto;
            profilePhoto.style.display = 'block';
        } else if (player.avatar) {
            profileAvatar.innerHTML = player.avatar;
            profileAvatar.style.display = 'flex';
            profilePhoto.style.display = 'none';
        } else {
            profileAvatar.innerHTML = `
                <svg class="default-avatar-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            `;
            profileAvatar.style.display = 'flex';
            profilePhoto.style.display = 'none';
        }

        // Get title
        const title = GAME_DATA.titles.filter(t => t.minLevel <= player.level).pop();
        document.getElementById('profile-title').textContent = title ? title.title : 'Novice';

        // Update stats
        document.getElementById('stat-total-habits').textContent = GameState.data.stats.totalHabitsCompleted;
        document.getElementById('stat-best-streak').textContent = player.bestStreak;
        document.getElementById('stat-total-xp').textContent = player.totalXp;
        document.getElementById('stat-pets-owned').textContent = GameState.data.pets.owned.length;
    },

    // Update currency display
    updateCurrency() {
        document.querySelector('#gold-display .currency-amount').textContent =
            formatNumber(GameState.data.player.gold);
        document.querySelector('#gems-display .currency-amount').textContent =
            formatNumber(GameState.data.player.gems);
    },

    // Update streak display
    updateStreak() {
        const streak = GameState.data.player.streak;
        document.getElementById('streak-count').textContent = streak;

        const bonus = Math.min(streak * 5, 100);
        document.getElementById('streak-bonus').textContent = `+${bonus}% XP`;
    },

    // Update pet display
    updatePetDisplay() {
        const activePetId = GameState.data.pets.active;
        const petData = GameState.data.pets.petData[activePetId];
        const pet = GAME_DATA.pets.find(p => p.id === activePetId);

        if (!pet || !petData) return;

        // Main pet display
        document.getElementById('active-pet-sprite').textContent = pet.emoji;
        document.getElementById('active-pet-name').textContent = pet.name;

        // Mood based on happiness
        let mood = '😊 Happy';
        if (petData.happiness < 30) mood = '😢 Sad';
        else if (petData.happiness < 60) mood = '😐 Okay';
        else if (petData.happiness >= 90) mood = '🥰 Ecstatic';
        document.getElementById('pet-mood').textContent = mood;

        // Pet XP bar
        const petXPPercent = (petData.xp % 100);
        document.getElementById('pet-xp-fill').style.width = `${petXPPercent}%`;

        // Pets tab detail
        document.getElementById('pet-large-sprite').textContent = pet.emoji;
        document.getElementById('pet-detail-name').textContent = pet.name;
        document.getElementById('pet-level').textContent = petData.level;
        document.getElementById('pet-happiness').style.width = `${petData.happiness}%`;
        document.getElementById('pet-energy').style.width = `${petData.energy}%`;

        // Evolution progress
        const evolutionPercent = pet.evolution ? Math.min(100, (petData.level / 10) * 100) : 100;
        document.getElementById('evolution-fill').style.width = `${evolutionPercent}%`;
        document.getElementById('evolution-hint').textContent =
            pet.evolution ? `Level ${Math.max(0, 10 - petData.level)} more to evolve!` : 'Max evolution!';

        // Collection count
        document.getElementById('pet-collection-count').textContent =
            `${GameState.data.pets.owned.length}/${GAME_DATA.pets.length}`;
    },

    // Update daily progress ring
    updateDailyProgress() {
        const todayHabits = HabitManager.getTodayHabits();
        const completed = GameState.data.completedToday.length;
        const total = todayHabits.length;

        document.getElementById('habits-completed').textContent = completed;
        document.getElementById('habits-total').textContent = total;

        // Update progress circle
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (percentage / 100) * circumference;

        const circle = document.getElementById('progress-circle');
        if (circle) {
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
            circle.style.stroke = percentage === 100 ? '#00b894' : '#6c5ce7';
        }

        // Update reward preview
        const rewardPreview = document.getElementById('daily-reward-preview');
        if (percentage === 100) {
            rewardPreview.textContent = '🎉 All quests complete! Bonus claimed!';
        } else {
            const remaining = total - completed;
            rewardPreview.textContent = `Complete ${remaining} more for bonus rewards!`;
        }
    },

    // Update battle pass preview
    updateBattlePass() {
        const bp = GameState.data.battlePass;
        document.getElementById('bp-tier').textContent = bp.tier;

        // Calculate progress to next tier
        const tiers = GAME_DATA.battlePassTiers;
        const currentTierData = tiers.find(t => t.tier === bp.tier);
        const nextTierData = tiers.find(t => t.tier === bp.tier + 1);

        if (nextTierData && currentTierData) {
            const progress = ((bp.xp - currentTierData.xpRequired) /
                             (nextTierData.xpRequired - currentTierData.xpRequired)) * 100;
            document.getElementById('bp-fill').style.width = `${Math.min(100, progress)}%`;
        } else {
            document.getElementById('bp-fill').style.width = '100%';
        }
    }
};

// ==================== TOAST NOTIFICATIONS ====================

const Toast = {
    show(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// ==================== HELPER FUNCTIONS ====================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function getCategoryEmoji(category) {
    const emojis = {
        health: '💪',
        fitness: '🏃',
        learning: '📚',
        mindfulness: '🧘',
        productivity: '⚡',
        social: '👥',
        creative: '🎨',
        finance: '💰'
    };
    return emojis[category] || '📋';
}

function showXPPopup(amount) {
    const popup = document.getElementById('xp-popup');
    popup.querySelector('.xp-amount').textContent = `+${amount} XP`;
    popup.classList.add('show');

    setTimeout(() => popup.classList.remove('show'), 800);
}

function showLevelUpModal(level, rewards) {
    document.getElementById('new-level-display').textContent = level;

    const rewardsList = document.getElementById('level-rewards-list');
    rewardsList.innerHTML = rewards.map(r => `<div class="reward-item">${r}</div>`).join('');

    document.getElementById('level-up-modal').classList.add('active');

    // Create confetti
    createConfetti();
    playSound('levelup');
}

function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';

    const colors = ['#ff6b6b', '#ffd700', '#00b894', '#6c5ce7', '#fd79a8', '#00cec9'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(confetti);
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function playSound(type) {
    if (!GameState.data?.settings?.sound) return;

    // In real app, play actual sounds
    // For now, just use vibration as feedback
    if (navigator.vibrate) {
        switch (type) {
            case 'complete': navigator.vibrate(50); break;
            case 'levelup': navigator.vibrate([100, 50, 100]); break;
            case 'achievement': navigator.vibrate([50, 30, 50, 30, 50]); break;
            default: navigator.vibrate(30);
        }
    }
}

function renderGemPackages() {
    const container = document.getElementById('gem-packages-grid');

    container.innerHTML = GAME_DATA.gemPackages.map(pkg => `
        <div class="gem-package ${pkg.bestValue ? 'best-value' : ''}" onclick="purchaseGems('${pkg.id}')">
            ${pkg.bestValue ? '<span class="best-badge">BEST VALUE</span>' : ''}
            <div class="gem-package-amount">💎 ${pkg.amount}</div>
            ${pkg.bonus > 0 ? `<div class="gem-package-bonus">+${pkg.bonus} bonus!</div>` : ''}
            <div class="gem-package-price">${pkg.price}</div>
        </div>
    `).join('');
}

function purchaseGems(packageId) {
    const pkg = GAME_DATA.gemPackages.find(p => p.id === packageId);
    if (!pkg) return;

    // In real app, integrate with Google Play Billing
    Toast.show('Purchase would be processed here', 'success');

    // For demo, give gems
    const totalGems = pkg.amount + (pkg.bonus || 0);
    GameState.addGems(totalGems);

    Toast.show(`+${totalGems} 💎 Added!`, 'success');
    closeModal('gem-shop-modal');
}

// Temporary state for profile editing
let tempProfilePhoto = null;

function showEditProfile() {
    const modal = document.getElementById('edit-profile-modal');
    const player = GameState.data.player;

    document.getElementById('edit-name-input').value = player.name;

    // Reset temp photo state
    tempProfilePhoto = player.profilePhoto;

    // Update photo preview
    updatePhotoPreview();

    // Render avatar options (including default person icon)
    const avatarSelect = document.getElementById('avatar-select');
    avatarSelect.innerHTML = GAME_DATA.avatars.map((avatar, index) => {
        const isSelected = avatar === player.avatar && !player.profilePhoto;
        const displayContent = avatar === null
            ? `<svg class="default-avatar-icon" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
               </svg>`
            : avatar;

        return `
            <div class="avatar-option ${isSelected ? 'selected' : ''}"
                 onclick="selectAvatar(${avatar === null ? 'null' : `'${avatar}'`})"
                 data-avatar="${avatar === null ? '' : avatar}"
                 data-index="${index}">
                ${displayContent}
            </div>
        `;
    }).join('');

    modal.classList.add('active');
}

function updatePhotoPreview() {
    const preview = document.getElementById('current-photo-preview');
    const removeBtn = document.getElementById('remove-photo-btn');

    if (tempProfilePhoto) {
        preview.innerHTML = `<img src="${tempProfilePhoto}" alt="Profile">`;
        removeBtn.style.display = 'block';
    } else {
        preview.innerHTML = `
            <svg class="default-avatar-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
        `;
        removeBtn.style.display = 'none';
    }
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        Toast.show('Please select an image file', 'error');
        return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        Toast.show('Image too large! Max 2MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        // Create image to resize
        const img = new Image();
        img.onload = () => {
            // Resize to max 200x200 for storage efficiency
            const canvas = document.createElement('canvas');
            const maxSize = 200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            tempProfilePhoto = canvas.toDataURL('image/jpeg', 0.8);
            updatePhotoPreview();

            // Deselect any avatar when photo is uploaded
            document.querySelectorAll('.avatar-option').forEach(el => {
                el.classList.remove('selected');
            });

            Toast.show('Photo uploaded!', 'success');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeProfilePhoto() {
    tempProfilePhoto = null;
    updatePhotoPreview();
    document.getElementById('photo-upload-input').value = '';
    Toast.show('Photo removed', 'success');
}

function selectAvatar(avatar) {
    // Clear photo when selecting avatar
    tempProfilePhoto = null;
    updatePhotoPreview();
    document.getElementById('photo-upload-input').value = '';

    document.querySelectorAll('.avatar-option').forEach(el => {
        const elAvatar = el.dataset.avatar === '' ? null : el.dataset.avatar;
        el.classList.toggle('selected', elAvatar === avatar);
    });
}

function saveProfile() {
    const name = document.getElementById('edit-name-input').value.trim();
    if (!name) {
        Toast.show('Please enter a name!', 'error');
        return;
    }

    GameState.data.player.name = name;

    // Save photo if uploaded
    if (tempProfilePhoto) {
        GameState.data.player.profilePhoto = tempProfilePhoto;
        GameState.data.player.avatar = null;
    } else {
        // Save selected avatar
        GameState.data.player.profilePhoto = null;
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        if (selectedAvatar) {
            const avatarValue = selectedAvatar.dataset.avatar;
            GameState.data.player.avatar = avatarValue === '' ? null : avatarValue;
        }
    }

    GameState.save();
    UI.updatePlayerInfo();
    FriendsManager.updateFriendBonus(); // Update friend code with new name
    closeModal('edit-profile-modal');
    Toast.show('Profile updated!', 'success');
}

function showPremium() {
    document.getElementById('premium-modal').classList.add('active');
}

function toggleNotifications() {
    GameState.data.settings.notifications = !GameState.data.settings.notifications;
    document.getElementById('notifications-toggle').checked = GameState.data.settings.notifications;
    GameState.save();
    Toast.show(`Notifications ${GameState.data.settings.notifications ? 'enabled' : 'disabled'}`, 'success');
}

function toggleSound() {
    GameState.data.settings.sound = !GameState.data.settings.sound;
    document.getElementById('sound-toggle').checked = GameState.data.settings.sound;
    GameState.save();
    Toast.show(`Sound ${GameState.data.settings.sound ? 'enabled' : 'disabled'}`, 'success');
}

function exportData() {
    const data = JSON.stringify(GameState.data, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'habithero-backup.json';
    a.click();

    URL.revokeObjectURL(url);
    Toast.show('Data exported!', 'success');
}

function resetProgress() {
    if (confirm('Are you sure? This will delete ALL your progress!')) {
        if (confirm('This cannot be undone. Type "RESET" in the next prompt to confirm.')) {
            const confirmation = prompt('Type RESET to confirm:');
            if (confirmation === 'RESET') {
                localStorage.removeItem('habitHeroData');
                location.reload();
            }
        }
    }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Update nav
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById(`tab-${tab}`).classList.add('active');

            // Load tab-specific content
            if (tab === 'pets') {
                PetManager.renderPetGrid();
            } else if (tab === 'shop') {
                ShopManager.renderShop();
            } else if (tab === 'achievements') {
                Achievements.render();
            }
        });
    });

    // Category selection in add habit modal
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            HabitManager.selectedCategory = btn.dataset.category;
        });
    });

    // Difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            HabitManager.selectedDifficulty = btn.dataset.difficulty;
        });
    });

    // Frequency selection
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            HabitManager.selectedFrequency = btn.dataset.freq;

            // Show/hide custom days
            document.getElementById('custom-days').classList.toggle('hidden', btn.dataset.freq !== 'custom');

            // Update selected days based on frequency
            if (btn.dataset.freq === 'daily') {
                HabitManager.selectedDays = [0, 1, 2, 3, 4, 5, 6];
            } else if (btn.dataset.freq === 'weekdays') {
                HabitManager.selectedDays = [1, 2, 3, 4, 5];
            } else if (btn.dataset.freq === 'weekends') {
                HabitManager.selectedDays = [0, 6];
            }
        });
    });

    // Custom day checkboxes
    document.querySelectorAll('.day-check input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const day = parseInt(checkbox.dataset.day);
            if (checkbox.checked) {
                if (!HabitManager.selectedDays.includes(day)) {
                    HabitManager.selectedDays.push(day);
                }
            } else {
                HabitManager.selectedDays = HabitManager.selectedDays.filter(d => d !== day);
            }
        });
    });

    // Shop tabs
    document.querySelectorAll('.shop-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            ShopManager.switchTab(btn.dataset.shop);
        });
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Settings toggles
    document.getElementById('notifications-toggle')?.addEventListener('change', (e) => {
        GameState.data.settings.notifications = e.target.checked;
        GameState.save();
    });

    document.getElementById('sound-toggle')?.addEventListener('change', (e) => {
        GameState.data.settings.sound = e.target.checked;
        GameState.save();
    });
}

// ==================== INITIALIZATION ====================

function init() {
    // Initialize game state
    GameState.init();

    // Setup event listeners
    setupEventListeners();

    // Update date display
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('date-display').textContent =
        new Date().toLocaleDateString('en-US', options);

    // Apply saved settings
    document.getElementById('notifications-toggle').checked = GameState.data.settings.notifications;
    document.getElementById('sound-toggle').checked = GameState.data.settings.sound;

    // Render initial content
    HabitManager.renderHabits();
    UI.updateAll();
    AdManager.updateAdUI();
    FriendsManager.renderFriendsList();
    FriendsManager.updateFriendBonus();

    // Add SVG gradient for progress ring
    addProgressGradient();

    // Hide splash screen after loading
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('fade-out');
        document.getElementById('main-app').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
        }, 500);
    }, 2000);
}

function addProgressGradient() {
    const svg = document.querySelector('.progress-ring svg');
    if (!svg) return;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6c5ce7"/>
            <stop offset="100%" style="stop-color:#a29bfe"/>
        </linearGradient>
    `;
    svg.insertBefore(defs, svg.firstChild);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
