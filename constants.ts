
import { Domain } from './types';

export const DOMAINS: Domain[] = [
  {
    id: 'people',
    name: 'People',
    description: 'Focuses on the skills and activities associated with effectively leading a project team.',
    color: 'indigo',
    tasks: [
      {
        id: 'p1',
        name: 'Develop a common vision',
        enablers: [
          { id: 'p1-1', description: 'Help ensure a shared vision with key stakeholders' },
          { id: 'p1-2', description: 'Promote the shared vision' },
          { id: 'p1-3', description: 'Keep the vision current' },
          { id: 'p1-4', description: 'Break down situations to identify root cause of misunderstanding' }
        ]
      },
      {
        id: 'p2',
        name: 'Manage conflicts',
        enablers: [
          { id: 'p2-1', description: 'Identify conflict sources' },
          { id: 'p2-2', description: 'Analyze the context for the conflict' },
          { id: 'p2-3', description: 'Implement an agreed-on resolution strategy' },
          { id: 'p2-4', description: 'Communicate conflict management principles' },
          { id: 'p2-5', description: 'Establish ground rules environment' },
          { id: 'p2-6', description: 'Manage and rectify violations' }
        ]
      },
      {
        id: 'p3',
        name: 'Lead the project team',
        enablers: [
          { id: 'p3-1', description: 'Establish expectations at team level' },
          { id: 'p3-2', description: 'Empower the team' },
          { id: 'p3-3', description: 'Solve problems' },
          { id: 'p3-4', description: 'Represent voice of team' },
          { id: 'p3-5', description: "Support team's varied experiences, skills, perspectives" },
          { id: 'p3-6', description: 'Determine appropriate leadership style' },
          { id: 'p3-7', description: 'Establish clear roles and responsibilities' }
        ]
      },
      {
        id: 'p4',
        name: 'Engage stakeholders',
        enablers: [
          { id: 'p4-1', description: 'Identify stakeholders' },
          { id: 'p4-2', description: 'Analyze stakeholders' },
          { id: 'p4-3', description: 'Tailor communication to stakeholder needs' },
          { id: 'p4-4', description: 'Execute stakeholder engagement plan' },
          { id: 'p4-5', description: 'Optimize alignment among needs/expectations/objectives' },
          { id: 'p4-6', description: 'Build trust and influence stakeholders' }
        ]
      },
      {
        id: 'p5',
        name: 'Align stakeholder expectations',
        enablers: [
          { id: 'p5-1', description: 'Categorize stakeholders' },
          { id: 'p5-2', description: 'Identify stakeholder expectations' },
          { id: 'p5-3', description: 'Facilitate discussions to align expectations' },
          { id: 'p5-4', description: 'Organize and act on mentoring opportunities' }
        ]
      },
      {
        id: 'p6',
        name: 'Manage stakeholder expectations',
        enablers: [
          { id: 'p6-1', description: 'Identify internal and external customer expectations' },
          { id: 'p6-2', description: 'Align and maintain outcomes to expectations' },
          { id: 'p6-3', description: 'Monitor satisfaction/expectations and respond' }
        ]
      },
      {
        id: 'p7',
        name: 'Help ensure knowledge transfer',
        enablers: [
          { id: 'p7-1', description: 'Identify knowledge critical to the project' },
          { id: 'p7-2', description: 'Gather knowledge' },
          { id: 'p7-3', description: 'Foster an environment for knowledge transfer' }
        ]
      },
      {
        id: 'p8',
        name: 'Plan and manage communication',
        enablers: [
          { id: 'p8-1', description: 'Define a communication strategy' },
          { id: 'p8-2', description: 'Promote transparency and collaboration' },
          { id: 'p8-3', description: 'Establish a feedback loop' },
          { id: 'p8-4', description: 'Understand reporting requirements' },
          { id: 'p8-5', description: 'Create reports aligned with expectations' },
          { id: 'p8-6', description: 'Support reporting and governance processes' }
        ]
      }
    ]
  },
  {
    id: 'process',
    name: 'Process',
    description: 'Reinforces the technical aspects of managing a project to deliver business value.',
    color: 'sky',
    tasks: [
      {
        id: 'pr1',
        name: 'Develop an integrated project management plan and plan delivery',
        enablers: [
          { id: 'pr1-1', description: 'Assess project needs, complexity, magnitude' },
          { id: 'pr1-2', description: 'Recommend development approach' },
          { id: 'pr1-3', description: 'Determine critical information requirements' },
          { id: 'pr1-4', description: 'Recommend project execution strategy' },
          { id: 'pr1-5', description: 'Create integrated project management plan' },
          { id: 'pr1-6', description: 'Estimate work effort and resource requirements' },
          { id: 'pr1-7', description: 'Assess consolidated plans for dependencies/gaps' },
          { id: 'pr1-8', description: 'Maintain the plan' },
          { id: 'pr1-9', description: 'Collect and analyze data for decisions' }
        ]
      },
      {
        id: 'pr2',
        name: 'Develop and manage project scope',
        enablers: [
          { id: 'pr2-1', description: 'Define scope' },
          { id: 'pr2-2', description: 'Obtain stakeholder agreement' },
          { id: 'pr2-3', description: 'Break down scope' }
        ]
      },
      {
        id: 'pr3',
        name: 'Help ensure value-based delivery',
        enablers: [
          { id: 'pr3-1', description: 'Identify value components with stakeholders' },
          { id: 'pr3-2', description: 'Prioritize work based on value and feedback' },
          { id: 'pr3-3', description: 'Assess opportunities to deliver value incrementally' },
          { id: 'pr3-4', description: 'Examine business value throughout project' },
          { id: 'pr3-5', description: 'Verify measurement system for benefits' },
          { id: 'pr3-6', description: 'Evaluate delivery options to demonstrate value' }
        ]
      },
      {
        id: 'pr4',
        name: 'Plan and manage resources',
        enablers: [
          { id: 'pr4-1', description: 'Define and plan resources based on requirements' },
          { id: 'pr4-2', description: 'Manage and optimize resource needs/availability' }
        ]
      },
      {
        id: 'pr5',
        name: 'Plan and manage procurement',
        enablers: [
          { id: 'pr5-1', description: 'Plan procurement' },
          { id: 'pr5-2', description: 'Execute procurement management plan' },
          { id: 'pr5-3', description: 'Select preferred contract types' },
          { id: 'pr5-4', description: 'Evaluate vendor performance' },
          { id: 'pr5-5', description: 'Verify objectives of agreement' },
          { id: 'pr5-6', description: 'Participate in negotiations' },
          { id: 'pr5-7', description: 'Determine negotiation strategy' },
          { id: 'pr5-8', description: 'Manage suppliers and contracts' },
          { id: 'pr5-9', description: 'Plan and manage procurement strategy' },
          { id: 'pr5-10', description: 'Develop delivery solution' }
        ]
      },
      {
        id: 'pr6',
        name: 'Plan and manage finance',
        enablers: [
          { id: 'pr6-1', description: 'Analyze project financial needs' },
          { id: 'pr6-2', description: 'Quantify risk and contingency allocations' },
          { id: 'pr6-3', description: 'Plan spend tracking throughout life cycle' },
          { id: 'pr6-4', description: 'Plan financial reporting' },
          { id: 'pr6-5', description: 'Anticipate future challenges' },
          { id: 'pr6-6', description: 'Monitor financial variations' },
          { id: 'pr6-7', description: 'Manage financial reserves' }
        ]
      },
      {
        id: 'pr7',
        name: 'Plan and optimize quality of products/deliverables',
        enablers: [
          { id: 'pr7-1', description: 'Gather quality requirements' },
          { id: 'pr7-2', description: 'Plan quality processes and tools' },
          { id: 'pr7-3', description: 'Execute quality management plan' },
          { id: 'pr7-4', description: 'Help ensure regulatory compliance' },
          { id: 'pr7-5', description: 'Manage cost of quality and sustainability' },
          { id: 'pr7-6', description: 'Conduct ongoing reviews' },
          { id: 'pr7-7', description: 'Implement continuous improvement' }
        ]
      },
      {
        id: 'pr8',
        name: 'Plan and manage schedule',
        enablers: [
          { id: 'pr8-1', description: 'Prepare schedule based on development approach' },
          { id: 'pr8-2', description: 'Coordinate with other projects/operations' },
          { id: 'pr8-3', description: 'Estimate project tasks' },
          { id: 'pr8-4', description: 'Utilize benchmarks and historical data' },
          { id: 'pr8-5', description: 'Create project schedule' },
          { id: 'pr8-6', description: 'Baseline project schedule' },
          { id: 'pr8-7', description: 'Execute schedule management plan' },
          { id: 'pr8-8', description: 'Analyze schedule variation' }
        ]
      },
      {
        id: 'pr9',
        name: 'Evaluate project status',
        enablers: [
          { id: 'pr9-1', description: 'Develop project metrics, analysis, reconciliation' },
          { id: 'pr9-2', description: 'Identify and tailor needed artifacts' },
          { id: 'pr9-3', description: 'Ensure artifacts created, reviewed, updated' },
          { id: 'pr9-4', description: 'Ensure accessibility of artifacts' },
          { id: 'pr9-5', description: 'Assess current progress' },
          { id: 'pr9-6', description: 'Measure, analyze, update metrics' },
          { id: 'pr9-7', description: 'Communicate project status' },
          { id: 'pr9-8', description: 'Assess effectiveness of artifact management' }
        ]
      },
      {
        id: 'pr10',
        name: 'Manage project closure',
        enablers: [
          { id: 'pr10-1', description: 'Obtain project stakeholder approval' },
          { id: 'pr10-2', description: 'Determine successful closure criteria' },
          { id: 'pr10-3', description: 'Validate readiness for transition' },
          { id: 'pr10-4', description: 'Conclude activities (lessons learned, retrospectives, procurement, financials, resources)' }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Environment',
    description: 'Highlights the connection between projects and organizational strategy.',
    color: 'emerald',
    tasks: [
      {
        id: 'be1',
        name: 'Define and establish project governance',
        enablers: [
          { id: 'be1-1', description: 'Describe and establish structure, rules, procedures, reporting, ethics, policies' },
          { id: 'be1-2', description: 'Define success metrics' },
          { id: 'be1-3', description: 'Outline governance escalation paths and thresholds' }
        ]
      },
      {
        id: 'be2',
        name: 'Plan and manage project compliance',
        enablers: [
          { id: 'be2-1', description: 'Confirm compliance requirements' },
          { id: 'be2-2', description: 'Classify compliance categories' },
          { id: 'be2-3', description: 'Determine threats to compliance' },
          { id: 'be2-4', description: 'Analyze and support compliance' },
          { id: 'be2-5', description: 'Analyze consequences of non-compliance' },
          { id: 'be2-6', description: 'Determine necessary approach and actions' },
          { id: 'be2-7', description: 'Measure extent of compliance' }
        ]
      },
      {
        id: 'be3',
        name: 'Manage and control changes',
        enablers: [
          { id: 'be3-1', description: 'Execute change control process' },
          { id: 'be3-2', description: 'Communicate status of proposed changes' },
          { id: 'be3-3', description: 'Implement approved changes' },
          { id: 'be3-4', description: 'Update project documentation' }
        ]
      },
      {
        id: 'be4',
        name: 'Remove impediments and manage issues',
        enablers: [
          { id: 'be4-1', description: 'Evaluate impact of impediments' },
          { id: 'be4-2', description: 'Prioritize and highlight impediments' },
          { id: 'be4-3', description: 'Determine intervention strategy' },
          { id: 'be4-4', description: 'Reassess continually' },
          { id: 'be4-5', description: 'Recognize when risk becomes issue' },
          { id: 'be4-6', description: 'Collaborate with stakeholders on resolution' }
        ]
      },
      {
        id: 'be5',
        name: 'Plan and manage risk',
        enablers: [
          { id: 'be5-1', description: 'Identify risks' },
          { id: 'be5-2', description: 'Analyze risks' },
          { id: 'be5-3', description: 'Monitor and control risks' },
          { id: 'be5-4', description: 'Develop risk management plan' },
          { id: 'be5-5', description: 'Maintain risk register' },
          { id: 'be5-6', description: 'Execute risk management plan' },
          { id: 'be5-7', description: 'Communicate risk status and impact' }
        ]
      },
      {
        id: 'be6',
        name: 'Continuous improvement',
        enablers: [
          { id: 'be6-1', description: 'Utilize lessons learned' },
          { id: 'be6-2', description: 'Ensure continuous improvement processes updated' },
          { id: 'be6-3', description: 'Update organizational process assets' }
        ]
      },
      {
        id: 'be7',
        name: 'Support organizational change',
        enablers: [
          { id: 'be7-1', description: 'Assess organizational culture' },
          { id: 'be7-2', description: 'Evaluate impact of organizational change on project' }
        ]
      },
      {
        id: 'be8',
        name: 'Evaluate external business environment changes',
        enablers: [
          { id: 'be8-1', description: 'Survey changes to external environment' },
          { id: 'be8-2', description: 'Assess and prioritize impact on scope/backlog' },
          { id: 'be8-3', description: 'Continually review for impacts' }
        ]
      }
    ]
  }
];
