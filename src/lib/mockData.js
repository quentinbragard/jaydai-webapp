// Mock data for testing the application without backend

export const mockTemplates = [
    {
      id: '1',
      title: 'Blog Post Writer',
      content: 'Write a comprehensive blog post about {topic}. Include an engaging introduction, detailed body paragraphs, and a compelling conclusion.',
      description: 'A template for creating engaging blog posts on any topic',
      folder_id: '1',
      is_free: true,
      usage_count: 15,
      created_at: '2024-01-15T10:30:00Z',
      last_used_at: '2024-01-20T14:22:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '2',
      title: 'Email Marketing Campaign',
      content: 'Create a compelling email marketing campaign for {product}. Focus on benefits, include a clear call-to-action, and maintain a professional yet friendly tone.',
      description: 'Template for creating effective email marketing campaigns',
      folder_id: '2',
      is_free: false,
      usage_count: 8,
      created_at: '2024-01-10T09:15:00Z',
      last_used_at: '2024-01-18T16:45:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '3',
      title: 'Social Media Post',
      content: 'Create an engaging social media post about {topic}. Keep it concise, include relevant hashtags, and encourage engagement.',
      description: 'Quick template for social media content creation',
      folder_id: null,
      is_free: true,
      usage_count: 32,
      created_at: '2024-01-05T11:20:00Z',
      last_used_at: '2024-01-21T08:30:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    }
  ]
  
  export const mockBlocks = [
    {
      id: '1',
      title: 'Professional Tone',
      content: 'Maintain a professional, authoritative tone throughout the response. Use clear, concise language and avoid jargon.',
      description: 'Sets a professional tone for business communications',
      type: 'tone_style',
      published: true,
      created_at: '2024-01-12T14:00:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '2',
      title: 'Marketing Expert Role',
      content: 'You are an experienced marketing expert with 10+ years in digital marketing, specializing in content creation and campaign optimization.',
      description: 'Establishes marketing expertise context',
      type: 'role',
      published: true,
      created_at: '2024-01-08T16:30:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '3',
      title: 'Target Audience Context',
      content: 'The target audience consists of small business owners aged 25-45 who are looking to improve their online presence and increase sales.',
      description: 'Defines the target audience for marketing content',
      type: 'audience',
      published: false,
      created_at: '2024-01-14T12:45:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '4',
      title: 'Call to Action',
      content: 'Include a clear and compelling call-to-action that encourages immediate response. Use action verbs and create urgency.',
      description: 'Ensures effective call-to-action inclusion',
      type: 'constraint',
      published: true,
      created_at: '2024-01-16T09:20:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    }
  ]
  
  export const mockFolders = [
    {
      id: '1',
      title: 'Content Marketing',
      description: 'Templates and blocks for content marketing campaigns',
      parent_folder_id: null,
      type: 'user',
      created_at: '2024-01-01T10:00:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '2',
      title: 'Email Templates',
      description: 'Collection of email marketing templates',
      parent_folder_id: '1',
      type: 'user',
      created_at: '2024-01-03T14:30:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '3',
      title: 'Social Media',
      description: 'Templates for various social media platforms',
      parent_folder_id: null,
      type: 'user',
      created_at: '2024-01-02T11:15:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    },
    {
      id: '4',
      title: 'Instagram Posts',
      description: 'Specific templates for Instagram content',
      parent_folder_id: '3',
      type: 'user',
      created_at: '2024-01-04T16:20:00Z',
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    }
  ]
  
  