import React, { createContext, useContext, useState } from 'react';

// Define Language type directly since it's a simple type
export type Language = 'en' | 'ta';

export type TranslationKeys = 
  // Navigation
  | 'nav.home' | 'nav.edubridge' | 'nav.mindmap' | 'nav.studybuddy' | 'nav.eduassist'
  | 'nav.profile' | 'nav.requests' | 'nav.sessions' | 'nav.signIn' | 'nav.signOut'
  | 'nav.links'
  
  // Auth
  | 'auth.welcome' | 'auth.loginPrompt' | 'auth.email' | 'auth.password' | 'auth.rememberMe'
  | 'auth.forgotPassword' | 'auth.noAccount' | 'auth.register' | 'auth.registerPrompt'
  | 'auth.name' | 'auth.role' | 'auth.student' | 'auth.tutor' | 'auth.hasAccount'
  
  // Home
  | 'home.hero.title' | 'home.hero.subtitle' | 'home.hero.getStarted' | 'home.hero.learnMore'
  | 'home.hero.imageAlt'
  | 'home.features.title' | 'home.features.subtitle'
  | 'home.features.collaborative' | 'home.features.collaborativeDesc'
  | 'home.features.organize' | 'home.features.organizeDesc'
  | 'home.features.achieve' | 'home.features.achieveDesc'
  | 'home.features.edubridge' | 'home.features.mindmap'
  | 'home.features.studybuddy' | 'home.features.eduassist'
  | 'home.topContributors' | 'home.leaderboard' | 'home.leaderboardDesc'
  | 'home.cta.title' | 'home.cta.subtitle' | 'home.cta.register' | 'home.cta.demo'
  
  // Dashboard
  | 'dashboard.welcome' | 'dashboard.learningProgress' | 'dashboard.studyTime'
  | 'dashboard.flashcardsMastered' | 'dashboard.sessionAttendance'
  | 'dashboard.recommendedForYou' | 'dashboard.newSession' | 'dashboard.points'
  
  // EduAssist
  | 'eduassist.title' | 'eduassist.notes' | 'eduassist.summaries' | 'eduassist.flashcards'
  | 'eduassist.startQuiz' | 'eduassist.exportAll' | 'eduassist.backToFlashcards'
  | 'eduassist.createNote' | 'eduassist.generateSummary' | 'eduassist.addFlashcard'
  | 'eduassist.quizProgress' | 'eduassist.quizComplete' | 'eduassist.yourScore'
  | 'eduassist.retake' | 'eduassist.noNotes' | 'eduassist.noSummaries' | 'eduassist.noFlashcards'
  
  // StudyBuddy
  | 'studybuddy.title' | 'studybuddy.createGroup' | 'studybuddy.joinGroup'
  | 'studybuddy.findGroups' | 'studybuddy.myGroups' | 'studybuddy.upcomingSessions'
  | 'studybuddy.groupMembers' | 'studybuddy.groupSettings'
  
  // MindMap
  | 'mindmap.title' | 'mindmap.create' | 'mindmap.templates' | 'mindmap.share'
  | 'mindmap.export' | 'mindmap.collaborate' | 'mindmap.addNode'
  | 'mindmap.addConnection' | 'mindmap.saveChanges'
  
  // Common
  | 'common.loading' | 'common.error' | 'common.success' | 'common.cancel'
  | 'common.save' | 'common.edit' | 'common.delete' | 'common.search'
  | 'common.filter' | 'common.apply' | 'common.reset' | 'common.more'
  | 'common.less' | 'common.next' | 'common.previous' | 'common.submit'
  | 'common.points' | 'common.share' | 'common.regenerate' | 'common.noResults'
  | 'common.learnMore'

  // Quiz
  | 'quiz.title' | 'quiz.start' | 'quiz.next' | 'quiz.previous'
  | 'quiz.submit' | 'quiz.score' | 'quiz.timeLeft' | 'quiz.correct'
  | 'quiz.incorrect' | 'quiz.review' | 'quiz.tryAgain' | 'quiz.completed'
  | 'quiz.results'

  // Profile
  | 'profile.title' | 'profile.edit' | 'profile.save' | 'profile.badges'
  | 'profile.achievements' | 'profile.stats' | 'profile.activity'

  // Notifications
  | 'notifications.title' | 'notifications.markRead' | 'notifications.markAllRead'
  | 'notifications.clear' | 'notifications.empty'

  // Settings
  | 'settings.title' | 'settings.account' | 'settings.privacy'
  | 'settings.notifications' | 'settings.language' | 'settings.theme'
  | 'settings.save'

  // Errors
  | 'error.generic' | 'error.notFound' | 'error.unauthorized'
  | 'error.validation' | 'error.network';

export type TranslationType = Record<TranslationKeys, string>;

// English translations
const enTranslations: TranslationType = {
  // Navigation
  'nav.home': 'Home',
  'nav.edubridge': 'EduBridge',
  'nav.mindmap': 'MindMap Master',
  'nav.studybuddy': 'StudyBuddy',
  'nav.eduassist': 'EduAssist',
  'nav.profile': 'Profile',
  'nav.requests': 'Requests',
  'nav.sessions': 'Sessions',
  'nav.signIn': 'Sign In',
  'nav.signOut': 'Sign Out',
  'nav.links': 'Platform',

  // Auth Pages
  'auth.welcome': 'Welcome back',
  'auth.loginPrompt': 'Sign in to your account',
  'auth.email': 'Email address',
  'auth.password': 'Password',
  'auth.rememberMe': 'Remember me',
  'auth.forgotPassword': 'Forgot your password?',
  'auth.noAccount': 'Don\'t have an account?',
  'auth.register': 'Register',
  'auth.registerPrompt': 'Create your account',
  'auth.name': 'Full name',
  'auth.role': 'Role',
  'auth.student': 'Student',
  'auth.tutor': 'Tutor',
  'auth.hasAccount': 'Already have an account?',

  // Home Page
  'home.hero.title': 'Bridge the Gap in Education',
  'home.hero.subtitle': 'Connect with peers, organize study groups, create visual mind maps, and leverage AI-powered learning tools.',
  'home.hero.getStarted': 'Get Started',
  'home.hero.learnMore': 'Learn More',
  'home.hero.imageAlt': 'Students collaborating',
  'home.features.title': 'How EduBridge Works',
  'home.features.subtitle': 'Our platform provides the best experience for students and teachers.',
  'home.features.collaborative': 'Learn Together',
  'home.features.collaborativeDesc': 'Find teachers or study groups based on your subjects and learning style. Schedule and collaborate in live sessions.',
  'home.features.organize': 'Organize & Visualize',
  'home.features.organizeDesc': 'Create mind maps to organize concepts, collaborate on study materials, and export your work for easy review.',
  'home.features.achieve': 'Achieve & Excel',
  'home.features.achieveDesc': 'Track your progress with gamification features. Earn badges and climb the leaderboard by helping others learn.',
  'home.features.edubridge': 'Connect with Expert Tutors',
  'home.features.mindmap': 'Visual Learning Tools',
  'home.features.studybuddy': 'Collaborative Study Groups',
  'home.features.eduassist': 'AI-Powered Learning Assistant',
  'home.topContributors': 'Top Contributors',
  'home.leaderboard': 'View Full Leaderboard',
  'home.leaderboardDesc': 'Recognizing our most active community members.',
  'home.cta.title': 'Ready to Transform Your Learning Journey?',
  'home.cta.subtitle': 'Join thousands of students and teachers on EduBridge today.',
  'home.cta.register': 'Register Now',
  'home.cta.demo': 'Schedule a Demo',

  // Dashboard
  'dashboard.welcome': 'Welcome back',
  'dashboard.learningProgress': 'Learning Progress',
  'dashboard.studyTime': 'Study Time',
  'dashboard.flashcardsMastered': 'Flashcards Mastered',
  'dashboard.sessionAttendance': 'Session Attendance',
  'dashboard.recommendedForYou': 'Recommended for You',
  'dashboard.newSession': 'New Session',
  'dashboard.points': 'points',

  // EduAssist
  'eduassist.title': 'AI Learning Assistant',
  'eduassist.notes': 'Your Notes',
  'eduassist.summaries': 'AI Summaries',
  'eduassist.flashcards': 'Flashcards',
  'eduassist.startQuiz': 'Start Quiz',
  'eduassist.exportAll': 'Export All',
  'eduassist.backToFlashcards': 'Back to Flashcards',
  'eduassist.createNote': 'Create Note',
  'eduassist.generateSummary': 'Generate Summary',
  'eduassist.addFlashcard': 'Add Flashcard',
  'eduassist.quizProgress': 'Quiz Progress',
  'eduassist.quizComplete': 'Quiz Complete',
  'eduassist.yourScore': 'Your Score',
  'eduassist.retake': 'Retake Quiz',
  'eduassist.noNotes': 'No notes found',
  'eduassist.noSummaries': 'No summaries found',
  'eduassist.noFlashcards': 'No flashcards found',

  // StudyBuddy
  'studybuddy.title': 'Study Groups',
  'studybuddy.createGroup': 'Create Group',
  'studybuddy.joinGroup': 'Join Group',
  'studybuddy.findGroups': 'Find Groups',
  'studybuddy.myGroups': 'My Groups',
  'studybuddy.upcomingSessions': 'Upcoming Sessions',
  'studybuddy.groupMembers': 'Group Members',
  'studybuddy.groupSettings': 'Group Settings',

  // MindMap
  'mindmap.title': 'Mind Maps',
  'mindmap.create': 'Create Mind Map',
  'mindmap.templates': 'Templates',
  'mindmap.share': 'Share',
  'mindmap.export': 'Export',
  'mindmap.collaborate': 'Collaborate',
  'mindmap.addNode': 'Add Node',
  'mindmap.addConnection': 'Add Connection',
  'mindmap.saveChanges': 'Save Changes',

  // Common
  'common.loading': 'Loading...',
  'common.error': 'An error occurred',
  'common.success': 'Success',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.edit': 'Edit',
  'common.delete': 'Delete',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.apply': 'Apply',
  'common.reset': 'Reset',
  'common.more': 'More',
  'common.less': 'Less',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.submit': 'Submit',
  'common.points': 'Points',
  'common.share': 'Share',
  'common.regenerate': 'Regenerate',
  'common.noResults': 'No results found',
  'common.learnMore': 'Learn More',

  // Quiz
  'quiz.title': 'Quiz',
  'quiz.start': 'Start Quiz',
  'quiz.next': 'Next Question',
  'quiz.previous': 'Previous Question',
  'quiz.submit': 'Submit Answer',
  'quiz.score': 'Score',
  'quiz.timeLeft': 'Time Left',
  'quiz.correct': 'Correct Answer',
  'quiz.incorrect': 'Incorrect Answer',
  'quiz.review': 'Review Answers',
  'quiz.tryAgain': 'Try Again',
  'quiz.completed': 'Quiz Completed',
  'quiz.results': 'Quiz Results',

  // Profile
  'profile.title': 'Profile',
  'profile.edit': 'Edit Profile',
  'profile.save': 'Save Changes',
  'profile.badges': 'Badges',
  'profile.achievements': 'Achievements',
  'profile.stats': 'Statistics',
  'profile.activity': 'Recent Activity',

  // Notifications
  'notifications.title': 'Notifications',
  'notifications.markRead': 'Mark as Read',
  'notifications.markAllRead': 'Mark All as Read',
  'notifications.clear': 'Clear All',
  'notifications.empty': 'No new notifications',

  // Settings
  'settings.title': 'Settings',
  'settings.account': 'Account',
  'settings.privacy': 'Privacy',
  'settings.notifications': 'Notifications',
  'settings.language': 'Language',
  'settings.theme': 'Theme',
  'settings.save': 'Save Changes',

  // Errors
  'error.generic': 'Something went wrong',
  'error.notFound': 'Page not found',
  'error.unauthorized': 'Unauthorized access',
  'error.validation': 'Validation error',
  'error.network': 'Network error'
};

// Tamil translations
const taTranslations: TranslationType = {
  // Navigation
  'nav.home': 'முகப்பு',
  'nav.edubridge': 'எடுபிரிட்ஜ்',
  'nav.mindmap': 'மனவரைபட நிபுணர்',
  'nav.studybuddy': 'படிப்புத் தோழன்',
  'nav.eduassist': 'கல்வி உதவி',
  'nav.profile': 'சுயவிவரம்',
  'nav.requests': 'கோரிக்கைகள்',
  'nav.sessions': 'வகுப்புகள்',
  'nav.signIn': 'உள்நுழைக',
  'nav.signOut': 'வெளியேறு',
  'nav.links': 'தளம்',

  // Auth Pages
  'auth.welcome': 'மீண்டும் வரவேற்கிறோம்',
  'auth.loginPrompt': 'உங்கள் கணக்கில் உள்நுழையவும்',
  'auth.email': 'மின்னஞ்சல் முகவரி',
  'auth.password': 'கடவுச்சொல்',
  'auth.rememberMe': 'என்னை நினைவில் கொள்க',
  'auth.forgotPassword': 'கடவுச்சொல் மறந்துவிட்டதா?',
  'auth.noAccount': 'கணக்கு இல்லையா?',
  'auth.register': 'பதிவு செய்க',
  'auth.registerPrompt': 'உங்கள் கணக்கை உருவாக்குங்கள்',
  'auth.name': 'முழுப் பெயர்',
  'auth.role': 'பாத்திரம்',
  'auth.student': 'மாணவர்',
  'auth.tutor': 'ஆசிரியர்',
  'auth.hasAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',

  // Home Page
  'home.hero.title': 'கல்வியில் புதிய பரிமாணம்',
  'home.hero.subtitle': 'சக மாணவர்களுடன் இணைந்து, படிப்புக் குழுக்களை ஏற்படுத்தி, காட்சி மனவரைபடங்களை உருவாக்கி, AI-சக்தி கொண்ட கற்றல் கருவிகளைப் பயன்படுத்துங்கள்.',
  'home.hero.getStarted': 'தொடங்குங்கள்',
  'home.hero.learnMore': 'மேலும் அறிக',
  'home.hero.imageAlt': 'மாணவர்கள் ஒத்துழைத்தல்',
  'home.features.title': 'எடுபிரிட்ஜ் எப்படி செயல்படுகிறது',
  'home.features.subtitle': 'எங்கள் தளம் மாணவர்கள் மற்றும் ஆசிரியர்களுக்கு சிறந்த அனுபவத்தை வழங்குகிறது.',
  'home.features.collaborative': 'இணைந்து கற்றல்',
  'home.features.collaborativeDesc': 'உங்கள் பாடங்கள் மற்றும் கற்றல் பாணியின் அடிப்படையில் ஆசிரியர்கள் அல்லது படிப்புக் குழுக்களைக் கண்டறியுங்கள். அமர்வுகளை திட்டமிட்டு நேரலையில் ஒத்துழைக்கவும்.',
  'home.features.organize': 'ஒழுங்கமைத்தல் & காட்சிப்படுத்துதல்',
  'home.features.organizeDesc': 'கருத்துக்களை ஒழுங்கமைக்க மனவரைபடங்களை உருவாக்கி, படிப்பு பொருட்களில் ஒத்துழைத்து, எளிதாக மதிப்பாய்வு செய்ய உங்கள் வேலையை ஏற்றுமதி செய்யுங்கள்.',
  'home.features.achieve': 'சாதித்தல் & வெல்லுதல்',
  'home.features.achieveDesc': 'விளையாட்டு அம்சங்களுடன் உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும். மற்றவர்களுக்கு கற்றுக்கொடுப்பதன் மூலம் பதக்கங்களைப் பெற்று தரவரிசையில் உயரவும்.',
  'home.features.edubridge': 'நிபுணர் ஆசிரியர்களுடன் இணையுங்கள்',
  'home.features.mindmap': 'காட்சி கற்றல் கருவிகள்',
  'home.features.studybuddy': 'கூட்டு கற்றல் குழுக்கள்',
  'home.features.eduassist': 'AI-சக்தி கொண்ட கற்றல் உதவியாளர்',
  'home.topContributors': 'சிறந்த பங்களிப்பாளர்கள்',
  'home.leaderboard': 'முழு தரவரிசையைக் காண்க',
  'home.leaderboardDesc': 'எங்கள் மிகவும் சுறுசுறுப்பான சமூக உறுப்பினர்களை அங்கீகரித்தல்.',
  'home.cta.title': 'உங்கள் கற்றல் பயணத்தை மாற்ற தயாரா?',
  'home.cta.subtitle': 'இன்றே ஆயிரக்கணக்கான மாணவர்கள் மற்றும் ஆசிரியர்களுடன் எடுபிரிட்ஜில் இணையுங்கள்.',
  'home.cta.register': 'இப்போதே பதிவு செய்யுங்கள்',
  'home.cta.demo': 'செயல்விளக்கத்தை திட்டமிடுங்கள்',

  // Dashboard
  'dashboard.welcome': 'மீண்டும் வரவேற்கிறோம்',
  'dashboard.learningProgress': 'கற்றல் முன்னேற்றம்',
  'dashboard.studyTime': 'படிப்பு நேரம்',
  'dashboard.flashcardsMastered': 'கற்றுக்கொண்ட அட்டைகள்',
  'dashboard.sessionAttendance': 'வகுப்பு வருகை',
  'dashboard.recommendedForYou': 'உங்களுக்கான பரிந்துரைகள்',
  'dashboard.newSession': 'புதிய அமர்வு',
  'dashboard.points': 'புள்ளிகள்',

  // EduAssist
  'eduassist.title': 'AI கற்றல் உதவியாளர்',
  'eduassist.notes': 'உங்கள் குறிப்புகள்',
  'eduassist.summaries': 'AI சுருக்கங்கள்',
  'eduassist.flashcards': 'நினைவு அட்டைகள்',
  'eduassist.startQuiz': 'வினாடி வினாவைத் தொடங்கு',
  'eduassist.exportAll': 'அனைத்தையும் ஏற்றுமதி செய்',
  'eduassist.backToFlashcards': 'நினைவு அட்டைகளுக்குத் திரும்பு',
  'eduassist.createNote': 'குறிப்பு உருவாக்கு',
  'eduassist.generateSummary': 'சுருக்கம் உருவாக்கு',
  'eduassist.addFlashcard': 'நினைவு அட்டை சேர்',
  'eduassist.quizProgress': 'வினாடி வினா முன்னேற்றம்',
  'eduassist.quizComplete': 'வினாடி வினா முடிந்தது',
  'eduassist.yourScore': 'உங்கள் மதிப்பெண்',
  'eduassist.retake': 'மீண்டும் முயற்சி செய்',
  'eduassist.noNotes': 'குறிப்புகள் எதுவும் இல்லை',
  'eduassist.noSummaries': 'சுருக்கங்கள் எதுவும் இல்லை',
  'eduassist.noFlashcards': 'நினைவு அட்டைகள் எதுவும் இல்லை',

  // StudyBuddy
  'studybuddy.title': 'படிப்புக் குழுக்கள்',
  'studybuddy.createGroup': 'குழு உருவாக்கு',
  'studybuddy.joinGroup': 'குழுவில் சேர்',
  'studybuddy.findGroups': 'குழுக்களைக் கண்டறி',
  'studybuddy.myGroups': 'எனது குழுக்கள்',
  'studybuddy.upcomingSessions': 'வரவிருக்கும் அமர்வுகள்',
  'studybuddy.groupMembers': 'குழு உறுப்பினர்கள்',
  'studybuddy.groupSettings': 'குழு அமைப்புகள்',

  // MindMap
  'mindmap.title': 'மனவரைபடங்கள்',
  'mindmap.create': 'மனவரைபடம் உருவாக்கு',
  'mindmap.templates': 'வார்ப்புருக்கள்',
  'mindmap.share': 'பகிர்',
  'mindmap.export': 'ஏற்றுமதி செய்',
  'mindmap.collaborate': 'ஒத்துழை',
  'mindmap.addNode': 'முனை சேர்',
  'mindmap.addConnection': 'இணைப்பு சேர்',
  'mindmap.saveChanges': 'மாற்றங்களை சேமி',

  // Common
  'common.loading': 'ஏற்றுகிறது...',
  'common.error': 'பிழை ஏற்பட்டது',
  'common.success': 'வெற்றி',
  'common.cancel': 'ரத்து செய்',
  'common.save': 'சேமி',
  'common.edit': 'திருத்து',
  'common.delete': 'நீக்கு',
  'common.search': 'தேடு',
  'common.filter': 'வடிகட்டு',
  'common.apply': 'பயன்படுத்து',
  'common.reset': 'மீட்டமை',
  'common.more': 'மேலும்',
  'common.less': 'குறைவாக',
  'common.next': 'அடுத்து',
  'common.previous': 'முந்தைய',
  'common.submit': 'சமர்ப்பி',
  'common.points': 'புள்ளிகள்',
  'common.share': 'பகிர்',
  'common.regenerate': 'மீண்டும் உருவாக்கு',
  'common.noResults': 'முடிவுகள் எதுவும் இல்லை',
  'common.learnMore': 'மேலும் அறிக',

  // Quiz
  'quiz.title': 'வினாடி வினா',
  'quiz.start': 'வினாடி வினாவைத் தொடங்கு',
  'quiz.next': 'அடுத்த கேள்வி',
  'quiz.previous': 'முந்தைய கேள்வி',
  'quiz.submit': 'பதிலை சமர்ப்பி',
  'quiz.score': 'மதிப்பெண்',
  'quiz.timeLeft': 'மீதமுள்ள நேரம்',
  'quiz.correct': 'சரியான பதில்',
  'quiz.incorrect': 'தவறான பதில்',
  'quiz.review': 'பதில்களை மதிப்பாய்வு செய்',
  'quiz.tryAgain': 'மீண்டும் முயற்சி செய்',
  'quiz.completed': 'வினாடி வினா முடிந்தது',
  'quiz.results': 'வினாடி வினா முடிவுகள்',

  // Profile
  'profile.title': 'சுயவிவரம்',
  'profile.edit': 'சுயவிவரத்தை திருத்து',
  'profile.save': 'மாற்றங்களை சேமி',
  'profile.badges': 'பதக்கங்கள்',
  'profile.achievements': 'சாதனைகள்',
  'profile.stats': 'புள்ளிவிவரங்கள்',
  'profile.activity': 'சமீபத்திய செயல்பாடுகள்',

  // Notifications
  'notifications.title': 'அறிவிப்புகள்',
  'notifications.markRead': 'படித்ததாக குறி',
  'notifications.markAllRead': 'அனைத்தையும் படித்ததாக குறி',
  'notifications.clear': 'அனைத்தையும் அழி',
  'notifications.empty': 'புதிய அறிவிப்புகள் எதுவும் இல்லை',

  // Settings
  'settings.title': 'அமைப்புகள்',
  'settings.account': 'கணக்கு',
  'settings.privacy': 'தனியுரிமை',
  'settings.notifications': 'அறிவிப்புகள்',
  'settings.language': 'மொழி',
  'settings.theme': 'தீம்',
  'settings.save': 'மாற்றங்களை சேமி',

  // Errors
  'error.generic': 'ஏதோ தவறு நடந்துவிட்டது',
  'error.notFound': 'பக்கம் கிடைக்கவில்லை',
  'error.unauthorized': 'அங்கீகரிக்கப்படாத அணுகல்',
  'error.validation': 'சரிபார்ப்பு பிழை',
  'error.network': 'இணைய இணைப்பு பிழை'
};

// Define translations object
export const translations = {
  en: enTranslations,
  ta: taTranslations,
} as const;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage === 'en' || savedLanguage === 'ta') ? savedLanguage : 'en';
    } catch (error) {
      console.error('Error reading language from localStorage:', error);
      return 'en';
    }
  });

  // Update localStorage when language changes
  const handleLanguageChange = (newLanguage: Language) => {
    try {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
    }
  };

  const t = (key: TranslationKeys): string => {
    try {
      // Always return English translation if language is 'en'
      if (language === 'en') {
        const translation = translations.en[key];
        if (!translation) {
          console.error(`Translation key not found in English translations: ${key}`);
          return key;
        }
        return translation;
      }
      
      // Return Tamil translation if language is 'ta', fallback to English if Tamil translation is missing
      const translation = translations.ta[key] || translations.en[key];
      if (!translation) {
        console.error(`Translation key not found in either language: ${key}`);
        return key;
      }
      return translation;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  const value = React.useMemo(
    () => ({
      language,
      setLanguage: handleLanguageChange,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 