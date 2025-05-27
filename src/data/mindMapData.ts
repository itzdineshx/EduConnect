export const mockMindMaps = [
  {
    id: 'mm1',
    title: 'கணித அடிப்படை கருத்துக்கள்',
    description: 'முக்கிய கணித கருத்துக்களின் தொடர்புகள்',
    createdBy: '1',
    nodes: [
      {
        id: 'n1',
        label: 'கணிதம்',
        position: { x: 400, y: 300 },
        type: 'root'
      },
      {
        id: 'n2',
        label: 'வரம்புகள்',
        position: { x: 200, y: 200 },
        type: 'topic'
      },
      {
        id: 'n3',
        label: 'தொடர்ச்சி',
        position: { x: 600, y: 200 },
        type: 'topic'
      },
      {
        id: 'n4',
        label: 'வகையீடு',
        position: { x: 300, y: 400 },
        type: 'topic'
      },
      {
        id: 'n5',
        label: 'தொகையீடு',
        position: { x: 500, y: 400 },
        type: 'topic'
      }
    ],
    edges: [
      {
        id: 'e1',
        source: 'n1',
        target: 'n2',
        label: 'முன்தேவை'
      },
      {
        id: 'e2',
        source: 'n1',
        target: 'n3',
        label: 'முன்தேவை'
      },
      {
        id: 'e3',
        source: 'n2',
        target: 'n4',
        label: 'பயன்பாடு'
      },
      {
        id: 'e4',
        source: 'n3',
        target: 'n4',
        label: 'பயன்பாடு'
      },
      {
        id: 'e5',
        source: 'n4',
        target: 'n5',
        label: 'தொடர்பு'
      }
    ],
    collaborators: ['2'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-10'),
    isPublic: true,
    tags: ['கணிதம்', 'வரம்புகள்', 'தொடர்ச்சி', 'வகையீடு']
  },
  {
    id: 'mm2',
    title: 'குவாண்டம் இயக்கவியல் கருத்துக்கள்',
    description: 'குவாண்டம் இயக்கவியலின் முக்கிய கொள்கைகள்',
    createdBy: '2',
    nodes: [
      {
        id: 'n1',
        label: 'குவாண்டம் இயக்கவியல்',
        position: { x: 400, y: 300 },
        type: 'root'
      },
      {
        id: 'n2',
        label: 'அலை-துகள் இரட்டைத்தன்மை',
        position: { x: 200, y: 200 },
        type: 'topic'
      },
      {
        id: 'n3',
        label: 'நிச்சயமற்ற தத்துவம்',
        position: { x: 600, y: 200 },
        type: 'topic'
      },
      {
        id: 'n4',
        label: 'குவாண்டம் நிலைகள்',
        position: { x: 300, y: 400 },
        type: 'topic'
      },
      {
        id: 'n5',
        label: 'அலைச்சார்பு',
        position: { x: 500, y: 400 },
        type: 'topic'
      }
    ],
    edges: [
      {
        id: 'e1',
        source: 'n1',
        target: 'n2',
        label: 'அடிப்படை'
      },
      {
        id: 'e2',
        source: 'n1',
        target: 'n3',
        label: 'அடிப்படை'
      },
      {
        id: 'e3',
        source: 'n2',
        target: 'n4',
        label: 'விளைவு'
      },
      {
        id: 'e4',
        source: 'n3',
        target: 'n4',
        label: 'விளைவு'
      },
      {
        id: 'e5',
        source: 'n4',
        target: 'n5',
        label: 'விவரிப்பு'
      }
    ],
    collaborators: ['1'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-12'),
    isPublic: true,
    tags: ['இயற்பியல்', 'குவாண்டம்', 'அலைச்சார்பு']
  }
]; 