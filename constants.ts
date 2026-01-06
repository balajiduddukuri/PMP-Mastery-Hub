
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
      },
      {
        id: 'p5',
        name: 'Align stakeholder expectations',
        hook: 'The Expectation Bridge',
        enablers: [
          { id: 'p5-1', description: 'Categorize stakeholders', hook: 'Grouping for Impact' },
          { id: 'p5-2', description: 'Identify stakeholder expectations', hook: 'Uncover the "Ask"' },
          { id: 'p5-3', description: 'Facilitate discussions to align expectations', hook: 'Mediation Mindset' },
          { id: 'p5-4', description: 'Organize and act on mentoring opportunities', hook: 'Growth Mentality' }
        ]
      },
      {
        id: 'p6',
        name: 'Manage stakeholder expectations',
        hook: 'Outcome Alignment',
        enablers: [
          { id: 'p6-1', description: 'Identify internal and external customer expectations', hook: 'Customer Centric' },
          { id: 'p6-2', description: 'Align and maintain outcomes to expectations', hook: 'Keeping Promises' },
          { id: 'p6-3', description: 'Monitor satisfaction/expectations and respond', hook: 'Feedback Loop' }
        ]
      },
      {
        id: 'p7',
        name: 'Help ensure knowledge transfer',
        hook: 'Bridge the Gap',
        enablers: [
          { id: 'p7-1', description: 'Identify knowledge critical to the project', hook: 'High-Value Intel' },
          { id: 'p7-2', description: 'Gather knowledge', hook: 'Knowledge Harvesting' },
          { id: 'p7-3', description: 'Foster an environment for knowledge transfer', hook: 'Culture of Sharing' }
        ]
      },
      {
        id: 'p8',
        name: 'Plan and manage communication',
        hook: 'The Transparent Loop',
        enablers: [
          { id: 'p8-1', description: 'Define a communication strategy', hook: 'The Roadmap' },
          { id: 'p8-2', description: 'Promote transparency and collaboration', hook: 'Open Doors' },
          { id: 'p8-3', description: 'Establish a feedback loop', hook: 'Two-Way Street' },
          { id: 'p8-4', description: 'Understand reporting requirements', hook: 'Data Needs' },
          { id: 'p8-5', description: 'Create reports aligned with expectations', hook: 'Tailored Reporting' },
          { id: 'p8-6', description: 'Support reporting and governance processes', hook: 'Compliance Engine' }
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
        name: 'Develop an integrated project management plan and plan delivery',
        hook: 'The Master Blueprint',
        enablers: [
          { id: 'pr1-1', description: 'Assess project needs, complexity, magnitude', hook: 'Scoping the Beast' },
          { id: 'pr1-2', description: 'Recommend development approach', hook: 'Choosing the Engine' },
          { id: 'pr1-3', description: 'Determine critical information requirements', hook: 'Vital Data' },
          { id: 'pr1-4', description: 'Tailor communication to stakeholder needs', hook: 'Personalized Push' },
          { id: 'pr1-5', description: 'Create integrated project management plan', hook: 'The Big Document' },
          { id: 'pr1-6', description: 'Estimate work effort and resource requirements', hook: 'Sizing Up' },
          { id: 'pr1-7', description: 'Assess consolidated plans for dependencies/gaps', hook: 'Network Analysis' },
          { id: 'pr1-8', description: 'Maintain the plan', hook: 'Living Document' },
          { id: 'pr1-9', description: 'Collect and analyze data for decisions', hook: 'Data-Driven PM' }
        ]
      },
      {
        id: 'pr2',
        name: 'Develop and manage project scope',
        hook: 'Boundary Watch',
        enablers: [
          { id: 'pr2-1', description: 'Define scope', hook: 'Drawing the Line' },
          { id: 'pr2-2', description: 'Obtain stakeholder agreement', hook: 'The Handshake' },
          { id: 'pr2-3', description: 'Break down scope', hook: 'WBS Power' }
        ]
      },
      {
        id: 'pr3',
        name: 'Help ensure value-based delivery',
        hook: 'Value First',
        enablers: [
          { id: 'pr3-1', description: 'Identify value components with stakeholders', hook: 'Outcome definition' },
          { id: 'pr3-2', description: 'Prioritize work based on value and feedback', hook: 'MoSCoW/Prioritization' },
          { id: 'pr3-3', description: 'Assess opportunities to deliver value incrementally', hook: 'Agile Increments' },
          { id: 'pr3-4', description: 'Examine business value throughout project', hook: 'Value Tracking' },
          { id: 'pr3-5', description: 'Verify measurement system for benefits', hook: 'Benefits Realization' },
          { id: 'pr3-6', description: 'Evaluate delivery options to demonstrate value', hook: 'Value demos' }
        ]
      },
      {
        id: 'pr4',
        name: 'Plan and manage resources',
        hook: 'Asset Allocation',
        enablers: [
          { id: 'pr4-1', description: 'Define and plan resources based on requirements', hook: 'Resource Plan' },
          { id: 'pr4-2', description: 'Manage and optimize resource needs/availability', hook: 'Leveling & Smoothing' }
        ]
      },
      {
        id: 'pr5',
        name: 'Plan and manage procurement',
        hook: 'Strategic Sourcing',
        enablers: [
          { id: 'pr5-1', description: 'Plan procurement', hook: 'Make-or-Buy' },
          { id: 'pr5-2', description: 'Execute procurement management plan', hook: 'Bidding' },
          { id: 'pr5-3', description: 'Select preferred contract types', hook: 'Risk Transfer' },
          { id: 'pr5-4', description: 'Evaluate vendor performance', hook: 'Vendor Scorecard' },
          { id: 'pr5-5', description: 'Verify objectives of agreement', hook: 'Goal Alignment' },
          { id: 'pr5-6', description: 'Participate in negotiations', hook: 'Win-Win' },
          { id: 'pr5-7', description: 'Determine negotiation strategy', hook: 'Strategy First' },
          { id: 'pr5-8', description: 'Manage suppliers and contracts', hook: 'Supplier Relations' },
          { id: 'pr5-9', description: 'Develop delivery solution', hook: 'Execution Partnering' }
        ]
      },
      {
        id: 'pr6',
        name: 'Plan and manage finance',
        hook: 'Fiscal Stewardship',
        enablers: [
          { id: 'pr6-1', description: 'Analyze project financial needs', hook: 'Budgeting' },
          { id: 'pr6-2', description: 'Quantify risk and contingency allocations', hook: 'Reserves' },
          { id: 'pr6-3', description: 'Plan spend tracking throughout life cycle', hook: 'Cash Flow' },
          { id: 'pr6-4', description: 'Plan financial reporting', hook: 'Reporting' },
          { id: 'pr6-5', description: 'Anticipate future challenges', hook: 'Financial Foresight' },
          { id: 'pr6-6', description: 'Monitor financial variations', hook: 'Variance Analysis' },
          { id: 'pr6-7', description: 'Manage financial reserves', hook: 'Reserve Control' }
        ]
      },
      {
        id: 'pr7',
        name: 'Plan and optimize quality of products/deliverables',
        hook: 'The Excellence Loop',
        enablers: [
          { id: 'pr7-1', description: 'Gather quality requirements', hook: 'Standard Setting' },
          { id: 'pr7-2', description: 'Plan quality processes and tools', hook: 'Quality Design' },
          { id: 'pr7-3', description: 'Execute quality management plan', hook: 'Quality Assurance' },
          { id: 'pr7-4', description: 'Help ensure regulatory compliance', hook: 'Rules of Law' },
          { id: 'pr7-5', description: 'Manage cost of quality and sustainability', hook: 'COQ focus' },
          { id: 'pr7-6', description: 'Conduct ongoing reviews', hook: 'Continuous Check' },
          { id: 'pr7-7', description: 'Implement continuous improvement', hook: 'PDCA Cycle' }
        ]
      },
      {
        id: 'pr8',
        name: 'Plan and manage schedule',
        hook: 'Time Precision',
        enablers: [
          { id: 'pr8-1', description: 'Prepare schedule based on development approach', hook: 'Timing the Engine' },
          { id: 'pr8-2', description: 'Coordinate with other projects/operations', hook: 'Dependency Check' },
          { id: 'pr8-3', description: 'Estimate project tasks', hook: 'Duration Guessing' },
          { id: 'pr8-4', description: 'Tailor benchmarks and historical data', hook: 'Analogous Estimating' },
          { id: 'pr8-5', description: 'Create project schedule', hook: 'Gantt Charting' },
          { id: 'pr8-6', description: 'Baseline project schedule', hook: 'Setting the Mark' },
          { id: 'pr8-7', description: 'Execute schedule management plan', hook: 'Time Control' },
          { id: 'pr8-8', description: 'Analyze schedule variation', hook: 'SV Calculation' }
        ]
      },
      {
        id: 'pr9',
        name: 'Evaluate project status',
        hook: 'Reality Check',
        enablers: [
          { id: 'pr9-1', description: 'Develop project metrics, analysis, reconciliation', hook: 'KPI Design' },
          { id: 'pr9-2', description: 'Identify and tailor needed artifacts', hook: 'Artifact Setup' },
          { id: 'pr9-3', description: 'Ensure artifacts created, reviewed, updated', hook: 'Artifact Lifecycle' },
          { id: 'pr9-4', description: 'Ensure accessibility of artifacts', hook: 'Info Radiator' },
          { id: 'pr9-5', description: 'Assess current progress', hook: 'Status Audit' },
          { id: 'pr9-6', description: 'Measure, analyze, update metrics', hook: 'Metric Pulse' },
          { id: 'pr9-7', description: 'Communicate project status', hook: 'Reporting Status' },
          { id: 'pr9-8', description: 'Assess effectiveness of artifact management', hook: 'Process Audit' }
        ]
      },
      {
        id: 'pr10',
        name: 'Manage project closure',
        hook: 'Clean Exit',
        enablers: [
          { id: 'pr10-1', description: 'Obtain project stakeholder approval', hook: 'Final Handshake' },
          { id: 'pr10-2', description: 'Determine successful closure criteria', hook: 'The Finish Line' },
          { id: 'pr10-3', description: 'Validate readiness for transition', hook: 'Go/No-Go' },
          { id: 'pr10-4', description: 'Conclude activities (lessons learned, retrospectives, procurement, financials, resources)', hook: 'Administrative Close' }
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
        id: 'be1',
        name: 'Define and establish project governance',
        hook: 'The Guardrails',
        enablers: [
          { id: 'be1-1', description: 'Describe and establish structure, rules, procedures, reporting, ethics, policies', hook: 'Governance Framework' },
          { id: 'be1-2', description: 'Define success metrics', hook: 'Measuring Success' },
          { id: 'be1-3', description: 'Outline governance escalation paths and thresholds', hook: 'Chain of Command' }
        ]
      },
      {
        id: 'be2',
        name: 'Plan and manage project compliance',
        hook: 'Integrity Check',
        enablers: [
          { id: 'be2-1', description: 'Confirm compliance requirements', hook: 'Mandate Check' },
          { id: 'be2-2', description: 'Classify compliance categories', hook: 'Risk Types' },
          { id: 'be2-3', description: 'Determine threats to compliance', hook: 'Compliance Risk' },
          { id: 'be2-4', description: 'Use methods to support compliance', hook: 'Supporting Tools' },
          { id: 'be2-5', description: 'Analyze consequences of noncompliance', hook: 'Impact Analysis' },
          { id: 'be2-6', description: 'Determine necessary approach and actions', hook: 'Action Plan' },
          { id: 'be2-7', description: 'Measure extent of compliance', hook: 'Compliance Metric' }
        ]
      },
      {
        id: 'be3',
        name: 'Manage and control changes',
        hook: 'Change is Constant',
        enablers: [
          { id: 'be3-1', description: 'Execute change control process', hook: 'CCB Flow' },
          { id: 'be3-2', description: 'Communicate status of proposed changes', hook: 'Feedback Cycle' },
          { id: 'be3-3', description: 'Implement approved changes', hook: 'Execution' },
          { id: 'be3-4', description: 'Update project documentation', hook: 'Documentation Integrity' }
        ]
      },
      {
        id: 'be4',
        name: 'Remove impediments and manage issues',
        hook: 'Path Clearer',
        enablers: [
          { id: 'be4-1', description: 'Evaluate impact of impediments', hook: 'Blocker Analysis' },
          { id: 'be4-2', description: 'Prioritize and highlight impediments', hook: 'Urgency Ranking' },
          { id: 'be4-3', description: 'Determine intervention strategy', hook: 'Intervention plan' },
          { id: 'be4-4', description: 'Reassess continually', hook: 'Constant Vigilance' },
          { id: 'be4-5', description: 'Recognize when risk becomes issue', hook: 'Trigger Tracking' },
          { id: 'be4-6', description: 'Collaborate with stakeholders on resolution', hook: 'Collective Solving' }
        ]
      },
      {
        id: 'be5',
        name: 'Plan and manage risk',
        hook: 'Uncertainty Radar',
        enablers: [
          { id: 'be5-1', description: 'Identify risks', hook: 'What If?' },
          { id: 'be5-2', description: 'Analyze risks', hook: 'Probability/Impact' },
          { id: 'be5-3', description: 'Monitor and control risks', hook: 'Register Management' },
          { id: 'be5-4', description: 'Develop risk management plan', hook: 'Strategy' },
          { id: 'be5-5', description: 'Maintain risk register', hook: 'Data Hub' },
          { id: 'be5-6', description: 'Execute risk management plan', hook: 'Actioning' },
          { id: 'be5-7', description: 'Communicate risk status and impact', hook: 'Risk Reporting' }
        ]
      },
      {
        id: 'be6',
        name: 'Continuous improvement',
        hook: 'Kaizen Mindset',
        enablers: [
          { id: 'be6-1', description: 'Utilize lessons learned', hook: 'Wisdom Use' },
          { id: 'be6-2', description: 'Ensure continuous improvement processes updated', hook: 'Process Evolution' },
          { id: 'be6-3', description: 'Update organizational process assets', hook: 'OPA Update' }
        ]
      },
      {
        id: 'be7',
        name: 'Support organizational change',
        hook: 'Culture Catalyst',
        enablers: [
          { id: 'be7-1', description: 'Assess organizational culture', hook: 'Culture Audit' },
          { id: 'be7-2', description: 'Evaluate impact of organizational change on project', hook: 'External Shift' }
        ]
      },
      {
        id: 'be8',
        name: 'Evaluate external business environment changes',
        hook: 'External Radar',
        enablers: [
          { id: 'be8-1', description: 'Survey changes to external environment', hook: 'Environmental Scan' },
          { id: 'be8-2', description: 'Assess and prioritize impact on scope/backlog', hook: 'Backlog Refinement' },
          { id: 'be8-3', description: 'Continually review for impacts', hook: 'Agile Monitoring' }
        ]
      }
    ]
  }
];
