// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks?.forEach(link => {
    link?.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]')?.forEach(anchor => {
    anchor?.addEventListener('click', function (e) {
        const href = this?.getAttribute('href');
        if (href && href !== '#' && !href?.startsWith('#lucky-spin') && !href?.startsWith('#royal-vegas') && !href?.startsWith('#diamond') && !href?.startsWith('#mega-fortune') && !href?.startsWith('#turbo') && !href?.startsWith('#pocket') && !href?.startsWith('#nova') && !href?.startsWith('#easy-start')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target?.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// BONUS CALCULATOR
// ========================================

function calculateBonus() {
    const depositAmount = parseFloat(document.getElementById('depositAmount')?.value ?? 0);
    const bonusPercentage = parseFloat(document.getElementById('bonusPercentage')?.value ?? 0);

    if (!depositAmount || depositAmount < 10) {
        alert('Please enter a valid deposit amount (minimum $10)');
        return;
    }

    const bonusAmount = (depositAmount * bonusPercentage) / 100;
    const totalAmount = depositAmount + bonusAmount;
    const wageringRequirement = bonusAmount * 35; // Assuming 35x wagering

    const resultDiv = document.getElementById('calculatorResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>Your Bonus Calculation</h4>
            <div class="result-breakdown">
                <div class="result-item">
                    <div class="result-label">Your Deposit</div>
                    <div class="result-value">$${depositAmount.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Bonus Amount</div>
                    <div class="result-value">$${bonusAmount.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Total to Play</div>
                    <div class="result-value">$${totalAmount.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Wagering Required</div>
                    <div class="result-value">$${wageringRequirement.toFixed(2)}</div>
                </div>
            </div>
        `;
        resultDiv.classList.add('show');
    }
}

// ========================================
// CASINO FINDER QUIZ (UNIQUE FEATURE)
// ========================================

let quizAnswers = {};
let currentQuestion = 1;
const totalQuestions = 4;

const quizOptions = document.querySelectorAll('.quiz-option');
quizOptions?.forEach(option => {
    option?.addEventListener('click', function () {
        const question = this?.closest('.quiz-question');
        const questionNum = parseInt(question?.getAttribute('data-question') ?? 0);
        const value = this?.getAttribute('data-value') ?? '';

        // Store answer
        quizAnswers[`q${questionNum}`] = value;

        // Progress to next question or show result
        if (questionNum < totalQuestions) {
            showNextQuestion(questionNum + 1);
        } else {
            showQuizResult();
        }
    });
});

function showNextQuestion(questionNum) {
    const questions = document.querySelectorAll('.quiz-question');
    questions?.forEach(q => q?.classList.remove('active'));

    const nextQuestion = document.querySelector(`[data-question="${questionNum}"]`);
    nextQuestion?.classList.add('active');

    currentQuestion = questionNum;
    updateQuizProgress();
}

function updateQuizProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    const progressBar = document.getElementById('quizProgressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

function showQuizResult() {
    const questions = document.querySelectorAll('.quiz-question');
    questions?.forEach(q => q?.classList.remove('active'));

    const resultDiv = document.getElementById('quizResult');
    const recommendationDiv = document.getElementById('quizRecommendation');

    // Determine recommendation based on answers
    const recommendation = getRecommendation(quizAnswers);

    if (recommendationDiv) {
        recommendationDiv.innerHTML = `
            <h4>${recommendation?.name ?? 'Casino'}</h4>
            <p><strong>Why it's perfect for you:</strong> ${recommendation?.reason ?? 'Great choice'}</p>
            <p>${recommendation?.description ?? ''}</p>
            <div style="margin-top: 25px;">
                <a href="${recommendation?.link ?? '#'}" class="btn btn-primary" style="margin-right: 10px;">Visit Casino</a>
                <button class="btn btn-secondary" onclick="openReviewModal('${recommendation?.id ?? ''}')">Read Full Review</button>
            </div>
        `;
    }

    resultDiv?.classList.add('show');
    updateQuizProgress();
}

function getRecommendation(answers) {
    const priority = answers?.q1 ?? '';
    const experience = answers?.q2 ?? '';
    const games = answers?.q3 ?? '';
    const deposit = answers?.q4 ?? '';

    // Logic to match answers to casinos
    if (priority === 'bonus') {
        return {
            id: 'mega-fortune',
            name: 'Mega Fortune Slots',
            reason: 'You prioritize bonuses, and Mega Fortune offers the biggest welcome package with 250% up to $2,500 plus 200 free spins!',
            description: 'With low wagering requirements and a massive game library, you\'ll maximize your bonus value here.',
            link: '#mega-fortune-slots'
        };
    } else if (priority === 'speed') {
        return {
            id: 'turbo-casino',
            name: 'Turbo Casino',
            reason: 'Fast payouts are your priority, and Turbo Casino delivers with 10-minute withdrawals!',
            description: 'Lightning-fast transactions, instant deposits, and a modern platform built for speed.',
            link: '#turbo-casino'
        };
    } else if (priority === 'mobile') {
        return {
            id: 'pocket-casino',
            name: 'Pocket Casino Pro',
            reason: 'You want the best mobile experience, and Pocket Casino is specifically designed for mobile gaming!',
            description: 'iOS and Android apps, touch-optimized controls, and 2,800+ mobile games.',
            link: '#pocket-casino-pro'
        };
    } else if (experience === 'beginner') {
        return {
            id: 'easy-start',
            name: 'Easy Start Casino',
            reason: 'As a beginner, Easy Start Casino offers tutorials, free play mode, and step-by-step guides to help you learn!',
            description: 'Beginner-friendly interface, helpful support team, and educational resources.',
            link: '#easy-start-casino'
        };
    } else if (priority === 'games') {
        return {
            id: 'lucky-spin',
            name: 'Lucky Spin Casino',
            reason: 'You want variety, and Lucky Spin has 3,000+ games covering every category!',
            description: 'Massive game library, top providers, and excellent welcome bonus to explore everything.',
            link: '#lucky-spin-casino'
        };
    } else {
        return {
            id: 'royal-vegas',
            name: 'Royal Vegas Palace',
            reason: 'Based on your preferences, Royal Vegas offers a well-rounded experience with great bonuses, games, and reliability!',
            description: 'Established brand with live dealers, VIP program, and 2,500+ games.',
            link: '#royal-vegas-palace'
        };
    }
}

function restartQuiz() {
    quizAnswers = {};
    currentQuestion = 1;

    const resultDiv = document.getElementById('quizResult');
    resultDiv?.classList.remove('show');

    const questions = document.querySelectorAll('.quiz-question');
    questions?.forEach(q => q?.classList.remove('active'));

    const firstQuestion = document.querySelector('[data-question="1"]');
    firstQuestion?.classList.add('active');

    const progressBar = document.getElementById('quizProgressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

// ========================================
// CASINO COMPARISON TOOL
// ========================================

const casinoData = {
    'lucky-spin': {
        name: 'Lucky Spin Casino',
        bonus: '200% up to $2,000',
        freeSpins: '100 Free Spins',
        games: '3,000+',
        payout: '24-48 hours',
        rating: '9.8/10',
        support: '24/7 Live Chat',
        minDeposit: '$20'
    },
    'royal-vegas': {
        name: 'Royal Vegas Palace',
        bonus: '150% up to $1,500',
        freeSpins: '75 Free Spins',
        games: '2,500+',
        payout: '24-72 hours',
        rating: '9.6/10',
        support: '24/7 Live Chat',
        minDeposit: '$25'
    },
    'diamond-club': {
        name: 'Diamond Club Casino',
        bonus: '100% up to $1,000',
        freeSpins: '50 Free Spins',
        games: '1,800+',
        payout: '48-96 hours',
        rating: '9.4/10',
        support: 'Email & Chat',
        minDeposit: '$10'
    },
    'mega-fortune': {
        name: 'Mega Fortune Slots',
        bonus: '250% up to $2,500',
        freeSpins: '200 Free Spins',
        games: '3,500+',
        payout: '24 hours',
        rating: '9.7/10',
        support: '24/7 Support',
        minDeposit: '$30'
    },
    'turbo-casino': {
        name: 'Turbo Casino',
        bonus: '175% up to $1,750',
        freeSpins: '150 Free Spins',
        games: '2,200+',
        payout: '10 minutes',
        rating: '9.5/10',
        support: '24/7 Live Chat',
        minDeposit: '$20'
    },
    'pocket-casino': {
        name: 'Pocket Casino Pro',
        bonus: '125% up to $1,250',
        freeSpins: '100 Free Spins',
        games: '2,800+',
        payout: '48-72 hours',
        rating: '9.3/10',
        support: 'In-App Support',
        minDeposit: '$15'
    },
    'nova-gaming': {
        name: 'Nova Gaming',
        bonus: '300% up to $3,000',
        freeSpins: '250 Free Spins',
        games: '1,500+',
        payout: '24-48 hours',
        rating: '9.2/10',
        support: '24/7 Chat',
        minDeposit: '$50'
    },
    'easy-start': {
        name: 'Easy Start Casino',
        bonus: '100% up to $1,000',
        freeSpins: '50 Free Spins',
        games: '2,000+',
        payout: '24-48 hours',
        rating: '9.6/10',
        support: '24/7 Beginner Help',
        minDeposit: '$10'
    }
};

function updateComparison() {
    const casino1 = document.getElementById('compare1')?.value ?? '';
    const casino2 = document.getElementById('compare2')?.value ?? '';
    const casino3 = document.getElementById('compare3')?.value ?? '';

    const selectedCasinos = [casino1, casino2, casino3].filter(c => c !== '');

    if (selectedCasinos?.length === 0) {
        const tableContainer = document.getElementById('comparisonTable');
        if (tableContainer) {
            tableContainer.innerHTML = '<p class="comparison-placeholder">Select casinos above to start comparing</p>';
        }
        return;
    }

    let tableHTML = '<table class="comparison-result"><thead><tr><th>Feature</th>';

    selectedCasinos?.forEach(casinoId => {
        const casino = casinoData?.[casinoId];
        tableHTML += `<th>${casino?.name ?? 'Casino'}</th>`;
    });

    tableHTML += '</tr></thead><tbody>';

    const features = [
        { label: 'Rating', key: 'rating' },
        { label: 'Welcome Bonus', key: 'bonus' },
        { label: 'Free Spins', key: 'freeSpins' },
        { label: 'Total Games', key: 'games' },
        { label: 'Payout Speed', key: 'payout' },
        { label: 'Support', key: 'support' },
        { label: 'Min. Deposit', key: 'minDeposit' }
    ];

    features?.forEach(feature => {
        tableHTML += `<tr><td><strong>${feature?.label ?? ''}</strong></td>`;
        selectedCasinos?.forEach(casinoId => {
            const casino = casinoData?.[casinoId];
            tableHTML += `<td>${casino?.[feature?.key] ?? 'N/A'}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    const tableContainer = document.getElementById('comparisonTable');
    if (tableContainer) {
        tableContainer.innerHTML = tableHTML;
    }
}

// ========================================
// FAQ ACCORDION
// ========================================

function toggleFAQ(button) {
    const faqItem = button?.closest('.faq-item');
    const allFaqItems = document.querySelectorAll('.faq-item');

    // Close all other FAQ items
    allFaqItems?.forEach(item => {
        if (item !== faqItem) {
            item?.classList.remove('active');
        }
    });

    // Toggle current FAQ item
    faqItem?.classList.toggle('active');
}

// ========================================
// MODALS
// ========================================

function openReviewModal(casinoId) {
    const modal = document.getElementById('reviewModal');
    const content = document.getElementById('reviewModalContent');

    const reviews = {
        'lucky-spin': {
            name: 'Lucky Spin Casino',
            rating: '9.8/10',
            pros: [
                'Massive 200% welcome bonus up to $2,000',
                '3,000+ games from top providers',
                'Instant withdrawals with e-wallets',
                'Excellent 24/7 customer support',
                'Beginner-friendly interface',
                'Accepts cryptocurrency payments'
            ],
            cons: [
                'Higher minimum deposit than some competitors',
                'Wagering requirements could be lower'
            ],
            summary: 'Lucky Spin Casino is our top recommendation for new players. With an intuitive interface, generous bonuses, and excellent support, it provides everything beginners need to start their casino journey safely and enjoyably.'
        },
        'royal-vegas': {
            name: 'Royal Vegas Palace',
            rating: '9.6/10',
            pros: [
                '150% bonus up to $1,500',
                'Established and trusted brand',
                'Live dealer games available',
                'VIP loyalty program',
                'Mobile app for iOS and Android',
                '2,500+ quality games'
            ],
            cons: [
                'Slightly higher wagering requirements',
                'Account verification can take 24-48 hours'
            ],
            summary: 'Royal Vegas Palace combines reliability with quality. As an established operator, they offer a premium gaming experience with live dealers, VIP perks, and a solid game selection.'
        },
        'diamond-club': {
            name: 'Diamond Club Casino',
            rating: '9.4/10',
            pros: [
                'Low $10 minimum deposit',
                'Exclusive slot titles',
                'Weekly cashback offers',
                'Good loyalty rewards',
                'Clean, modern interface'
            ],
            cons: [
                'Smaller game library than competitors',
                'Slower payout times',
                'Support not available 24/7'
            ],
            summary: 'Diamond Club is perfect for budget-conscious players. With a low minimum deposit and exclusive games, it offers quality gaming without breaking the bank.'
        },
        'mega-fortune': {
            name: 'Mega Fortune Slots',
            rating: '9.7/10',
            pros: [
                'Industry-leading 250% bonus',
                'Lowest wagering requirements (25x)',
                '3,500+ games including exclusives',
                'Progressive jackpots',
                'Same-day withdrawals',
                'No wagering on some bonuses'
            ],
            cons: [
                'Higher minimum deposit ($30)',
                'Can be overwhelming for complete beginners'
            ],
            summary: 'Mega Fortune offers the best value for money with massive bonuses and low wagering. Perfect for players who want to maximize their bonus potential.'
        },
        'turbo-casino': {
            name: 'Turbo Casino',
            rating: '9.5/10',
            pros: [
                '10-minute withdrawal times',
                'Instant deposits with all methods',
                'E-wallet optimized',
                '175% welcome bonus',
                'Modern, fast platform',
                '2,200+ games'
            ],
            cons: [
                'Fewer traditional banking options',
                'Game library smaller than some competitors'
            ],
            summary: 'True to its name, Turbo Casino is all about speed. If fast payouts and quick transactions are priorities, this is your casino.'
        },
        'pocket-casino': {
            name: 'Pocket Casino Pro',
            rating: '9.3/10',
            pros: [
                'Best mobile gaming experience',
                'Dedicated iOS and Android apps',
                'Touch-optimized interface',
                '2,800+ mobile-compatible games',
                'Mobile-exclusive bonuses',
                '5G ready'
            ],
            cons: [
                'Desktop experience less impressive',
                'Some features only on mobile'
            ],
            summary: 'Pocket Casino Pro is designed mobile-first. With dedicated apps and touch controls, it's the best choice for on-the-go gaming.'
        },
        'nova-gaming': {
            name: 'Nova Gaming',
            rating: '9.2/10',
            pros: [
                'Massive 300% welcome bonus',
                'Gamification features',
                'Social gaming elements',
                'Tournament support',
                'Modern platform',
                'Innovative features'
            ],
            cons: [
                'New platform (less track record)',
                'Higher wagering requirements',
                'Higher minimum deposit'
            ],
            summary: 'Nova Gaming brings fresh innovation to online casinos with gamification and social features. Great for players seeking a modern, interactive experience.'
        },
        'easy-start': {
            name: 'Easy Start Casino',
            rating: '9.6/10',
            pros: [
                'Specifically designed for beginners',
                'Free play mode on all games',
                'Video tutorials and guides',
                'Step-by-step onboarding',
                'Patient support team',
                'Low minimum deposit'
            ],
            cons: [
                'Less exciting for experienced players',
                'Smaller bonus than competitors'
            ],
            summary: 'Easy Start Casino is perfect for complete beginners. With tutorials, free play, and helpful support, it makes learning to play online simple and stress-free.'
        }
    };

    const review = reviews?.[casinoId] ?? reviews['lucky-spin'];

    if (content) {
        content.innerHTML = `
            <h2>${review?.name ?? 'Casino'} - Full Review</h2>
            <div style="margin: 20px 0;">
                <div style="font-size: 24px; font-weight: 700; color: var(--primary-color);">Rating: ${review?.rating ?? 'N/A'}</div>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">✓ Pros</h3>
                <ul style="list-style: disc; margin-left: 20px;">
                    ${(review?.pros ?? [])?.map(pro => `<li style="margin-bottom: 8px; color: var(--text-gray);">${pro ?? ''}</li>`)?.join('') ?? ''}
                </ul>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: var(--text-gray); margin-bottom: 15px;">✗ Cons</h3>
                <ul style="list-style: disc; margin-left: 20px;">
                    ${(review?.cons ?? [])?.map(con => `<li style="margin-bottom: 8px; color: var(--text-gray);">${con ?? ''}</li>`)?.join('') ?? ''}
                </ul>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: var(--text-dark); margin-bottom: 15px;">Summary</h3>
                <p style="color: var(--text-gray); line-height: 1.7;">${review?.summary ?? ''}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <a href="#${casinoId}" class="btn btn-primary" style="display: inline-block;">Visit ${review?.name ?? 'Casino'}</a>
            </div>
        `;
    }

    modal?.classList.add('show');
}

function openGuideModal(guideId) {
    const modal = document.getElementById('guideModal');
    const content = document.getElementById('guideModalContent');

    const guides = {
        'getting-started': {
            title: 'Getting Started with Online Casinos',
            sections: [
                {
                    heading: '1. Choose a Licensed Casino',
                    text: 'Always verify the casino is licensed by a reputable authority (UK Gambling Commission, Malta Gaming Authority, etc.). Look for the license information in the footer.'
                },
                {
                    heading: '2. Register Your Account',
                    text: 'Provide accurate personal information during registration. You\'ll need to verify your identity later for withdrawals.'
                },
                {
                    heading: '3. Claim Your Welcome Bonus',
                    text: 'Click through our links to ensure you get the best bonus. Read the terms and conditions to understand wagering requirements.'
                },
                {
                    heading: '4. Make Your First Deposit',
                    text: 'Choose a payment method you\'re comfortable with. Start with the minimum deposit to test the waters.'
                },
                {
                    heading: '5. Try Free Play First',
                    text: 'Most games offer demo mode. Use this to learn game mechanics before playing with real money.'
                },
                {
                    heading: '6. Set a Budget',
                    text: 'Decide how much you can afford to lose and stick to it. Use deposit limits and self-exclusion tools if needed.'
                }
            ]
        },
        'slots-guide': {
            title: 'Understanding Slot Machines',
            sections: [
                {
                    heading: 'How Slots Work',
                    text: 'Slots use Random Number Generators (RNG) to ensure fair outcomes. Each spin is independent and random.'
                },
                {
                    heading: 'RTP (Return to Player)',
                    text: 'RTP shows the percentage of wagered money a slot returns over time. Look for slots with 96% RTP or higher.'
                },
                {
                    heading: 'Volatility',
                    text: 'Low volatility = frequent small wins. High volatility = rare but bigger wins. Choose based on your playing style and bankroll.'
                },
                {
                    heading: 'Paylines',
                    text: 'Paylines are patterns where matching symbols award wins. Modern slots can have hundreds of ways to win.'
                },
                {
                    heading: 'Bonus Features',
                    text: 'Free spins, multipliers, wilds, and bonus games add excitement and winning potential. Understand how they trigger.'
                },
                {
                    heading: 'Tips for Slots',
                    text: 'Start with low bets, choose high RTP games, take advantage of free spins bonuses, and never chase losses.'
                }
            ]
        },
        'table-games': {
            title: 'Table Games Basics',
            sections: [
                {
                    heading: 'Blackjack',
                    text: 'Goal: Beat the dealer by getting closer to 21 without going over. Learn basic strategy to reduce house edge to under 1%.'
                },
                {
                    heading: 'Roulette',
                    text: 'Bet on where the ball will land. European roulette (single zero) has better odds than American (double zero). Start with simple bets like red/black.'
                },
                {
                    heading: 'Baccarat',
                    text: 'Bet on Player, Banker, or Tie. Banker has the best odds. It\'s a simple game of chance - no strategy needed.'
                },
                {
                    heading: 'Poker',
                    text: 'Many variants exist. Start with video poker or casual poker games. Learn hand rankings first, then study strategy.'
                },
                {
                    heading: 'Live Dealer Games',
                    text: 'Play with real dealers via video stream. More immersive but higher minimum bets. Great for table game enthusiasts.'
                },
                {
                    heading: 'Practice First',
                    text: 'Use demo mode to learn rules and practice without risk. Many online guides and strategy charts are available free.'
                }
            ]
        },
        'bonus-terms': {
            title: 'Understanding Bonus Terms',
            sections: [
                {
                    heading: 'Wagering Requirements',
                    text: 'The number of times you must bet the bonus before withdrawing. Example: $100 bonus with 35x = $3,500 in total bets required.'
                },
                {
                    heading: 'Game Contributions',
                    text: 'Different games contribute differently to wagering. Slots usually count 100%, table games might count 10-20% or be excluded.'
                },
                {
                    heading: 'Maximum Bet',
                    text: 'Bonus terms often limit bet sizes (e.g., $5 max per spin). Exceeding this can void your bonus and winnings.'
                },
                {
                    heading: 'Expiration',
                    text: 'Bonuses have time limits. You might have 7-30 days to meet wagering requirements or the bonus expires.'
                },
                {
                    heading: 'Withdrawal Limits',
                    text: 'Some bonuses cap maximum withdrawals (e.g., max cashout $100 from no deposit bonus).'
                },
                {
                    heading: 'Tips',
                    text: 'Always read full terms, calculate if wagering is achievable, check game restrictions, and contact support if unclear.'
                }
            ]
        },
        'payments': {
            title: 'Payment Methods Guide',
            sections: [
                {
                    heading: 'Credit/Debit Cards',
                    text: 'Widely accepted, instant deposits. Withdrawals take 3-5 days. Some banks block gambling transactions.'
                },
                {
                    heading: 'E-Wallets (PayPal, Skrill, Neteller)',
                    text: 'Fast deposits and withdrawals (24-48 hours). May not qualify for certain bonuses. Small fees possible.'
                },
                {
                    heading: 'Bank Transfers',
                    text: 'Secure but slow (5-7 days). Good for large amounts. No fees from casino, but bank may charge.'
                },
                {
                    heading: 'Cryptocurrency',
                    text: 'Anonymous, fast, and secure. Growing acceptance. Volatility can affect value. Lower fees.'
                },
                {
                    heading: 'Prepaid Cards',
                    text: 'Control spending with prepaid amounts. Deposits only (can\'t withdraw to prepaid). Good for budget management.'
                },
                {
                    heading: 'Withdrawal Tips',
                    text: 'Complete KYC verification early, use same method as deposit when possible, check for minimum/maximum limits, and be patient during first withdrawal.'
                }
            ]
        },
        'safety': {
            title: 'Staying Safe Online',
            sections: [
                {
                    heading: 'Verify Licensing',
                    text: 'Check for valid licenses from UK, Malta, Curacao, or other reputable authorities. License numbers should be verifiable on authority websites.'
                },
                {
                    heading: 'SSL Encryption',
                    text: 'Look for HTTPS and padlock icon in browser. This encrypts your data and protects sensitive information.'
                },
                {
                    heading: 'Responsible Gambling Tools',
                    text: 'Use deposit limits, loss limits, session timers, and self-exclusion options. Good casinos promote these tools prominently.'
                },
                {
                    heading: 'Secure Your Account',
                    text: 'Use strong, unique passwords. Enable two-factor authentication if available. Never share login details.'
                },
                {
                    heading: 'Read Reviews',
                    text: 'Check player reviews and ratings. Avoid casinos with unresolved complaints or poor reputation.'
                },
                {
                    heading: 'Know the Signs',
                    text: 'Problem gambling signs: chasing losses, gambling with money you can\'t afford to lose, lying about gambling, neglecting responsibilities. Seek help if needed.'
                }
            ]
        }
    };

    const guide = guides?.[guideId] ?? guides['getting-started'];

    if (content) {
        content.innerHTML = `
            <h2>${guide?.title ?? 'Guide'}</h2>
            ${(guide?.sections ?? [])?.map(section => `
                <div style="margin: 30px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">${section?.heading ?? ''}</h3>
                    <p style="color: var(--text-gray); line-height: 1.7;">${section?.text ?? ''}</p>
                </div>
            `)?.join('') ?? ''}
        `;
    }

    modal?.classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal?.classList.remove('show');
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e?.target?.classList?.contains('modal')) {
        e.target?.classList?.remove('show');
    }
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries?.forEach(entry => {
        if (entry?.isIntersecting) {
            entry?.target?.style?.setProperty('opacity', '1');
            entry?.target?.style?.setProperty('transform', 'translateY(0)');
        }
    });
}, observerOptions);

// Observe casino cards for scroll animations
const casinoCards = document.querySelectorAll('.casino-card');
casinoCards?.forEach((card, index) => {
    card?.style?.setProperty('opacity', '0');
    card?.style?.setProperty('transform', 'translateY(30px)');
    card?.style?.setProperty('transition', `all 0.6s ease ${index * 0.1}s`);
    observer?.observe(card);
});

// ========================================
// INITIALIZE
// ========================================

// Set initial quiz progress
updateQuizProgress();

// Console welcome message
console.log('%cWelcome to Mr Free Slots! 🎰', 'color: #2A9D8F; font-size: 20px; font-weight: bold;');
console.log('%cPlaceholder affiliate links are used throughout this site.', 'color: #E9C46A; font-size: 14px;');
console.log('%cReplace them with your actual affiliate URLs before going live.', 'color: #E9C46A; font-size: 14px;');