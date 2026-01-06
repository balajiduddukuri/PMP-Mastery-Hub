
import { Domain } from './types';

export const DOMAINS: Domain[] = [
  {
    id: 'people',
    name: 'People',
    description: 'Focuses on the skills and activities associated with effectively leading a project team.',
    color: 'indigo',
    coverage: 33,
    tasks: [
      {
        id: 'p1',
        name: 'Develop a common vision',
        hook: 'One North Star',
        enablers: [
          { id: 'p1-1', description: 'Help ensure a shared vision with key stakeholders', hook: 'Stakeholder Buy-in' },
          { id: 'p1-2', description: 'Promote the shared vision', hook: 'Be the Evangelist' },
          { id: 'p1-3', description: 'Keep the vision current', hook: 'Vision Check-up' },
          { id: 'p1-4', description: 'Break down situations to identify root cause of misunderstanding', hook: '5-Whys Method' }
        ]
      },
      {
        id: 'p2',
        name: 'Manage conflicts',
        hook: 'EDUCE: Evaluate, Define, Understand, Choose, Execute',
        enablers: [
          { id: 'p2-1', description: 'Identify conflict sources', hook: 'Trace the Spark' },
          { id: 'p2-2', description: 'Analyze the context for the conflict', hook: 'Context is King' },
          { id: 'p2-3', description: 'Implement an agreed-on resolution strategy', hook: 'Collaborate > Force' },
          { id: 'p2-4', description: 'Communicate conflict management principles', hook: 'Transparent Ground Rules' },
          { id: 'p2-5', description: 'Establish ground rules environment', hook: 'Safety First' },
          { id: 'p2-6', description: 'Manage and rectify violations', hook: 'Swift & Private' }
        ]
      },
      {
        id: 'p3',
        name: 'Lead the project team',
        hook: 'Servant Leadership: Lead by Serving',
        enablers: [
          { id: 'p3-1', description: 'Establish expectations at team level', hook: 'Social Contract' },
          { id: 'p3-2', description: 'Empower the team', hook: 'Trust over Micro-mgmt' },
          { id: 'p3-3', description: 'Solve problems', hook: 'Blocker Removal' },
          { id: 'p3-4', description: 'Represent voice of team', hook: 'Team Shield' },
          { id: 'p3-5', description: "Support team's varied experiences, skills, perspectives", hook: 'Diversity = Strength' },
          { id: 'p3-6', description: 'Determine appropriate leadership style', hook: 'Situational Flex' },
          { id: 'p3-7', description: 'Establish clear roles and responsibilities', hook: 'RACI Clarity' }
        ]
      },
      {
        id: 'p4',
        name: 'Engage stakeholders',
        hook: 'Engage, Don\'t Just Manage',
        enablers: [
          { id: 'p4-1', description: 'Identify stakeholders', hook: 'Cast a Wide Net' },
          { id: 'p4-2', description: 'Analyze stakeholders', hook: 'Power/Interest Grid' },
          { id: 'p4-3', description: 'Tailor communication to stakeholder needs', hook: 'Personalized Push/Pull' },
          { id: 'p4-4', description: 'Execute stakeholder engagement plan', hook: 'Consistency counts' },
          { id: 'p4-5', description: 'Optimize alignment among needs/expectations/objectives', hook: 'WIIFM: What\'s In It For Me?' },
          { id: 'p4-6', description: 'Build trust and influence stakeholders', hook: 'Emotional Intelligence' }
        ]
      }
    ]
  },
  {
    id: 'process',
    name: 'Process',
    description: 'Reinforces the technical aspects of managing a project to deliver business value.',
    color: 'sky',
    coverage: 41,
    tasks: [
      {
        id: 'pr1',
        name: 'Develop integrated project management plan',
        hook: 'One Plan to Rule Them All',
        enablers: [
          { id: 'pr1-1', description: 'Assess project needs, complexity, magnitude', hook: 'Tailoring Start' },
          { id: 'pr1-2', description: 'Recommend development approach', hook: 'Agile vs Predictive?' }
        ]
      },
      {
        id: 'pr3',
        name: 'Help ensure value-based delivery',
        hook: 'Value = Outcome, not Output',
        enablers: [
          { id: 'pr3-1', description: 'Identify value components with stakeholders', hook: 'What is Success?' },
          { id: 'pr3-2', description: 'Prioritize work based on value and feedback', hook: 'MoSCoW Method' },
          { id: 'pr3-3', description: 'Assess opportunities to deliver value incrementally', hook: 'MVP thinking' }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Environment',
    description: 'Highlights the connection between projects and organizational strategy.',
    color: 'emerald',
    coverage: 26,
    tasks: [
      {
        id: 'be3',
        name: 'Manage and control changes',
        hook: 'Change is Constant; Control is Vital',
        enablers: [
          { id: 'be3-1', description: 'Execute change control process', hook: 'CCB Review' },
          { id: 'be3-2', description: 'Communicate status of proposed changes', hook: 'Status Feedback' }
        ]
      },
      {
        id: 'be5',
        name: 'Plan and manage risk',
        hook: 'Risk is Uncertainty that Matters',
        enablers: [
          { id: 'be5-1', description: 'Identify risks', hook: 'Think: What If?' },
          { id: 'be5-2', description: 'Analyze risks', hook: 'Qual vs Quant' },
          { id: 'be5-3', description: 'Monitor and control risks', hook: 'Keep the Register Alive' }
        ]
      }
    ]
  }
];
