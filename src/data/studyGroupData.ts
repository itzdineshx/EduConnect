export const mockStudyGroups = [
  {
    id: 'sg1',
    name: 'கணித மேம்பாட்டு குழு',
    description: 'உயர்நிலை கணித கருத்துக்களை ஆராய்தல் மற்றும் பயிற்சி',
    subject: 'கணிதம்',
    members: [
      {
        userId: '1',
        role: 'admin',
        joinedAt: new Date('2024-01-15')
      },
      {
        userId: '2',
        role: 'member',
        joinedAt: new Date('2024-01-16')
      }
    ],
    sessions: [
      {
        id: 'ss1',
        title: 'வரம்புகள் மற்றும் தொடர்ச்சி பயிற்சி',
        description: 'வரம்புகள் மற்றும் தொடர்ச்சி தொடர்பான கணக்குகளை தீர்த்தல்',
        scheduledFor: new Date('2024-03-20T15:00:00'),
        duration: 90, // minutes
        status: 'scheduled',
        attendees: ['1', '2']
      }
    ],
    resources: [
      {
        id: 'r1',
        title: 'வரம்புகள் குறிப்புகள்',
        type: 'pdf',
        url: '/resources/limits-notes.pdf',
        uploadedBy: '2',
        uploadedAt: new Date('2024-01-20')
      }
    ],
    createdAt: new Date('2024-01-15'),
    maxMembers: 10,
    isPrivate: false
  },
  {
    id: 'sg2',
    name: 'குவாண்டம் இயக்கவியல் ஆய்வு குழு',
    description: 'குவாண்டம் இயக்கவியலின் அடிப்படை கொள்கைகளை ஆராய்தல்',
    subject: 'இயற்பியல்',
    members: [
      {
        userId: '2',
        role: 'admin',
        joinedAt: new Date('2024-02-01')
      },
      {
        userId: '1',
        role: 'member',
        joinedAt: new Date('2024-02-02')
      }
    ],
    sessions: [
      {
        id: 'ss2',
        title: 'அலை-துகள் இரட்டைத்தன்மை விளக்கம்',
        description: 'அலை-துகள் இரட்டைத்தன்மை மற்றும் அதன் தாக்கங்களை விவாதித்தல்',
        scheduledFor: new Date('2024-03-22T16:00:00'),
        duration: 120, // minutes
        status: 'scheduled',
        attendees: ['1', '2']
      }
    ],
    resources: [
      {
        id: 'r2',
        title: 'குவாண்டம் இயக்கவியல் விளக்கப்படங்கள்',
        type: 'pptx',
        url: '/resources/quantum-slides.pptx',
        uploadedBy: '2',
        uploadedAt: new Date('2024-02-05')
      }
    ],
    createdAt: new Date('2024-02-01'),
    maxMembers: 8,
    isPrivate: true
  }
];

export const mockStudyRequests = [
  {
    id: 'sr1',
    userId: '3',
    groupId: 'sg1',
    message: 'கணித பாடத்தில் உதவி தேவை. உங்கள் குழுவில் சேர விரும்புகிறேன்.',
    status: 'pending',
    createdAt: new Date('2024-03-15')
  },
  {
    id: 'sr2',
    userId: '1',
    groupId: 'sg2',
    message: 'குவாண்டம் இயக்கவியலில் ஆர்வமுள்ளது. குழுவில் சேர அனுமதிக்கவும்.',
    status: 'approved',
    createdAt: new Date('2024-02-01'),
    respondedAt: new Date('2024-02-02')
  }
]; 