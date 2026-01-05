
import { Domain } from './types';

export const DOMAINS: Domain[] = [
  {
    id: 'people',
    name: 'People',
    description: 'Leading, managing, and supporting the team throughout the project lifecycle.',
    color: 'indigo',
    tasks: [
      {
        id: 'p1',
        name: 'Manage Conflict',
        enablers: [
          { id: 'p1-1', description: 'Interpret the source and stage of the conflict' },
          { id: 'p1-2', description: 'Analyze the context for the conflict' },
          { id: 'p1-3', description: 'Evaluate/recommend/reconcile the appropriate conflict resolution solution' }
        ]
      },
      {
        id: 'p2',
        name: 'Lead a Team',
        enablers: [
          { id: 'p2-1', description: 'Set a clear vision and mission' },
          { id: 'p2-2', description: 'Support diversity and inclusion' },
          { id: 'p2-3', description: 'Value servant leadership' },
          { id: 'p2-4', description: 'Determine an appropriate leadership style' },
          { id: 'p2-5', description: 'Inspire, motivate, and influence team members/stakeholders' }
        ]
      },
      {
        id: 'p3',
        name: 'Support Team Performance',
        enablers: [
          { id: 'p3-1', description: 'Appraise team member performance against KPIs' },
          { id: 'p3-2', description: 'Support and recognize team member growth and development' },
          { id: 'p3-3', description: 'Determine appropriate feedback approach' }
        ]
      },
      {
        id: 'p4',
        name: 'Empower Team Members and Stakeholders',
        enablers: [
          { id: 'p4-1', description: 'Organize around team strengths' },
          { id: 'p4-2', description: 'Support team task accountability' },
          { id: 'p4-3', description: 'Evaluate demonstration of task accountability' },
          { id: 'p4-4', description: 'Determine and bestow levels of decision-making authority' }
        ]
      },
      {
        id: 'p5',
        name: 'Ensure team members/stakeholders are adequately trained',
        enablers: [
          { id: 'p5-1', description: 'Determine required competencies and training needs' },
          { id: 'p5-2', description: 'Determine training options based on training needs' },
          { id: 'p5-3', description: 'Allocate resources for training' },
          { id: 'p5-4', description: 'Measure training outcomes' }
        ]
      },
      {
        id: 'p6',
        name: 'Build a Team',
        enablers: [
          { id: 'p6-1', description: 'Appraise stakeholder skills' },
          { id: 'p6-2', description: 'Deduce project resource requirements' },
          { id: 'p6-3', description: 'Continuously assess and refresh team skills' },
          { id: 'p6-4', description: 'Maintain team and knowledge transfer' }
        ]
      },
      {
        id: 'p7',
        name: 'Address and remove impediments, obstacles, and blockers',
        enablers: [
          { id: 'p7-1', description: 'Determine critical impediments, obstacles, and blockers for the team' },
          { id: 'p7-2', description: 'Prioritize critical impediments, obstacles, and blockers' },
          { id: 'p7-3', description: 'Use network to remove impediments, obstacles, and blockers' },
          { id: 'p7-4', description: 'Re-assess continually to ensure impediments are being addressed' }
        ]
      },
      {
        id: 'p8',
        name: 'Negotiate Project Agreements',
        enablers: [
          { id: 'p8-1', description: 'Analyze bounds of negotiations for agreement' },
          { id: 'p8-2', description: 'Assess priorities and determine ultimate objective(s)' },
          { id: 'p8-3', description: 'Verify objectives of the project agreement are met' },
          { id: 'p8-4', description: 'Listen to and participate in negotiation' },
          { id: 'p8-5', description: 'Determine a negotiation strategy' }
        ]
      },
      {
        id: 'p9',
        name: 'Collaborate with Stakeholders',
        enablers: [
          { id: 'p9-1', description: 'Evaluate engagement needs for stakeholders' },
          { id: 'p9-2', description: 'Optimize alignment between stakeholder needs and project objectives' },
          { id: 'p9-3', description: 'Build trust and influence stakeholders to accomplish project objectives' }
        ]
      },
      {
        id: 'p10',
        name: 'Build Shared Understanding',
        enablers: [
          { id: 'p10-1', description: 'Break down the situation to identify the root cause of misunderstanding' },
          { id: 'p10-2', description: 'Survey all necessary parties to reach consensus' },
          { id: 'p10-3', description: 'Support outcome of parties\' agreement' },
          { id: 'p10-4', description: 'Investigate misunderstandings' }
        ]
      },
      {
        id: 'p11',
        name: 'Engage and Support Virtual Teams',
        enablers: [
          { id: 'p11-1', description: 'Examine virtual team member needs (e.g., environment, geography, culture)' },
          { id: 'p11-2', description: 'Investigate alternatives for virtual team member engagement' },
          { id: 'p11-3', description: 'Implement options for virtual team member connectivity' },
          { id: 'p11-4', description: 'Evaluate effectiveness of virtual team member engagement' }
        ]
      },
      {
        id: 'p12',
        name: 'Define Team Ground Rules',
        enablers: [
          { id: 'p12-1', description: 'Communicate organizational principles to the team and stakeholders' },
          { id: 'p12-2', description: 'Establish an environment that fosters adherence to ground rules' },
          { id: 'p12-3', description: 'Manage and rectify ground rule violations' }
        ]
      },
      {
        id: 'p13',
        name: 'Mentor Relevant Stakeholders',
        enablers: [
          { id: 'p13-1', description: 'Allocate time to mentoring' },
          { id: 'p13-2', description: 'Recognize and act on mentoring opportunities' }
        ]
      },
      {
        id: 'p14',
        name: 'Promote team performance through Emotional Intelligence',
        enablers: [
          { id: 'p14-1', description: 'Assess behavior through the use of personality indicators' },
          { id: 'p14-2', description: 'Analyze personality indicators and adjust to the emotional needs of stakeholders' }
        ]
      }
    ]
  },
  {
    id: 'process',
    name: 'Process',
    description: 'Developing and managing the methodologies and frameworks to deliver value.',
    color: 'sky',
    tasks: [
      {
        id: 'pr1',
        name: 'Execute project with urgency to deliver business value',
        enablers: [
          { id: 'pr1-1', description: 'Assess opportunities to deliver value incrementally' },
          { id: 'pr1-2', description: 'Examine the business value throughout the project' },
          { id: 'pr1-3', description: 'Support the team to subdivide project tasks to find MVP' }
        ]
      },
      {
        id: 'pr2',
        name: 'Manage Communications',
        enablers: [
          { id: 'pr2-1', description: 'Analyze communication needs of all stakeholders' },
          { id: 'pr2-2', description: 'Determine communication methods, channels, frequency, and level of detail' },
          { id: 'pr2-3', description: 'Communicate project information and updates effectively' },
          { id: 'pr2-4', description: 'Confirm communication is understood and feedback is received' }
        ]
      },
      {
        id: 'pr3',
        name: 'Assess and Manage Risks',
        enablers: [
          { id: 'pr3-1', description: 'Determine risk management options' },
          { id: 'pr3-2', description: 'Iteratively assess and prioritize risks' }
        ]
      },
      {
        id: 'pr4',
        name: 'Engage Stakeholders',
        enablers: [
          { id: 'pr4-1', description: 'Analyze stakeholders (e.g., power interest grid, influence, impact)' },
          { id: 'pr4-2', description: 'Categorize stakeholders' },
          { id: 'pr4-3', description: 'Develop, execute, and validate a strategy for stakeholder engagement' }
        ]
      },
      {
        id: 'pr5',
        name: 'Plan and Manage Budget and Resources',
        enablers: [
          { id: 'pr5-1', description: 'Estimate budgetary needs based on the scope of the project and lessons learned' },
          { id: 'pr5-2', description: 'Anticipate future budget challenges' },
          { id: 'pr5-3', description: 'Monitor budget variations and work with governance to adjust' },
          { id: 'pr5-4', description: 'Plan and manage resources' }
        ]
      },
      {
        id: 'pr6',
        name: 'Plan and Manage Schedule',
        enablers: [
          { id: 'pr6-1', description: 'Estimate project tasks (milestones, dependencies, story points)' },
          { id: 'pr6-2', description: 'Utilize benchmarks and historical data' },
          { id: 'pr6-3', description: 'Prepare schedule based on methodology' },
          { id: 'pr6-4', description: 'Measure ongoing progress based on methodology' }
        ]
      },
      {
        id: 'pr7',
        name: 'Plan and Manage Quality of Products/Deliverables',
        enablers: [
          { id: 'pr7-1', description: 'Determine quality standard required for project deliverables' },
          { id: 'pr7-2', description: 'Recommend options for improvement based on quality gaps' },
          { id: 'pr7-3', description: 'Continuously survey project deliverable quality' }
        ]
      },
      {
        id: 'pr8',
        name: 'Plan and Manage Scope',
        enablers: [
          { id: 'pr8-1', description: 'Determine and prioritize requirements' },
          { id: 'pr8-2', description: 'Break down scope (e.g., WBS, backlog)' },
          { id: 'pr8-3', description: 'Monitor and validate scope' }
        ]
      },
      {
        id: 'pr9',
        name: 'Integrate Project Planning Activities',
        enablers: [
          { id: 'pr9-1', description: 'Consolidate the project/phase plans' },
          { id: 'pr9-2', description: 'Assess consolidated project plans for dependencies, gaps, and continued business value' },
          { id: 'pr9-3', description: 'Analyze the data collected' },
          { id: 'pr9-4', description: 'Collect and analyze data to make informed project decisions' }
        ]
      },
      {
        id: 'pr10',
        name: 'Manage Project Changes',
        enablers: [
          { id: 'pr10-1', description: 'Anticipate and embrace the need for change' },
          { id: 'pr10-2', description: 'Determine strategy to handle changes' },
          { id: 'pr10-3', description: 'Execute change management strategy according to the methodology' },
          { id: 'pr10-4', description: 'Determine a change response to move the project forward' }
        ]
      },
      {
        id: 'pr11',
        name: 'Plan and Manage Procurement',
        enablers: [
          { id: 'pr11-1', description: 'Define resource requirements and needs' },
          { id: 'pr11-2', description: 'Communicate resource requirements' },
          { id: 'pr11-3', description: 'Manage suppliers and contracts' },
          { id: 'pr11-4', description: 'Plan and manage procurement strategy' },
          { id: 'pr11-5', description: 'Develop a delivery solution' }
        ]
      },
      {
        id: 'pr12',
        name: 'Manage Project Artifacts',
        enablers: [
          { id: 'pr12-1', description: 'Determine the requirements (what, when, where, who, etc.) for managing the artifacts' },
          { id: 'pr12-2', description: 'Validate that the project information is kept up to date and accessible to all stakeholders' },
          { id: 'pr12-3', description: 'Assess the effectiveness of the management of the project artifacts' }
        ]
      },
      {
        id: 'pr13',
        name: 'Determine appropriate project methodology/methods and practices',
        enablers: [
          { id: 'pr13-1', description: 'Assess project needs, complexity, and magnitude' },
          { id: 'pr13-2', description: 'Recommend project execution strategy (e.g., contracting, finance)' },
          { id: 'pr13-3', description: 'Recommend a project methodology/approach (i.e., predictive, agile, hybrid)' },
          { id: 'pr13-4', description: 'Use iterative, incremental practices throughout the project life cycle' }
        ]
      },
      {
        id: 'pr14',
        name: 'Establish Project Governance Structure',
        enablers: [
          { id: 'pr14-1', description: 'Determine appropriate governance for a project' },
          { id: 'pr14-2', description: 'Define escalation paths and thresholds' }
        ]
      },
      {
        id: 'pr15',
        name: 'Manage Project Issues',
        enablers: [
          { id: 'pr15-1', description: 'Recognize when an issue becomes a risk and vice versa' },
          { id: 'pr15-2', description: 'Attack issues with the optimal action to achieve project success' },
          { id: 'pr15-3', description: 'Collaborate with relevant stakeholders on the approach to resolve the issues' }
        ]
      },
      {
        id: 'pr16',
        name: 'Ensure Knowledge Transfer for Project Continuity',
        enablers: [
          { id: 'pr16-1', description: 'Discuss project responsibilities within team' },
          { id: 'pr16-2', description: 'Outline expectations for working environment' },
          { id: 'pr16-3', description: 'Confirm approach for knowledge transfer' }
        ]
      },
      {
        id: 'pr17',
        name: 'Plan and Manage Project/Phase Closure or Transitions',
        enablers: [
          { id: 'pr17-1', description: 'Determine criteria for closure of the project or phase' },
          { id: 'pr17-2', description: 'Validate readiness for transition (e.g., to operations or next phase)' },
          { id: 'pr17-3', description: 'Conclude activities to close out project or phase' }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Environment',
    description: 'Managing the organizational context and compliance requirements.',
    color: 'emerald',
    tasks: [
      {
        id: 'be1',
        name: 'Plan and Manage Project Compliance',
        enablers: [
          { id: 'be1-1', description: 'Confirm project compliance requirements (security, health, safety, etc.)' },
          { id: 'be1-2', description: 'Classify compliance categories' },
          { id: 'be1-3', description: 'Analyze the consequences of noncompliance' },
          { id: 'be1-4', description: 'Determine necessary approach and action to address compliance needs' },
          { id: 'be1-5', description: 'Measure the extent to which the project is in compliance' }
        ]
      },
      {
        id: 'be2',
        name: 'Evaluate and Deliver Project Benefits and Value',
        enablers: [
          { id: 'be2-1', description: 'Investigate that benefits are identified' },
          { id: 'be2-2', description: 'Document agreement on ownership for ongoing benefit realization' },
          { id: 'be2-3', description: 'Verify measurement system is in place to track benefits' },
          { id: 'be2-4', description: 'Evaluate delivery options to demonstrate value' },
          { id: 'be2-5', description: 'Appraise stakeholders of value gain progress' }
        ]
      },
      {
        id: 'be3',
        name: 'Evaluate and address external business environment changes',
        enablers: [
          { id: 'be3-1', description: 'Survey changes to external business environment (e.g., regulations, technology, geopolitical, market)' },
          { id: 'be3-2', description: 'Assess and prioritize impact on project scope/backlog based on changes in external business environment' },
          { id: 'be3-3', description: 'Recommend options for scope/backlog changes' },
          { id: 'be3-4', description: 'Continually review external business environment for impacts on project scope/backlog' }
        ]
      },
      {
        id: 'be4',
        name: 'Support Organizational Change',
        enablers: [
          { id: 'be4-1', description: 'Assess organizational culture' },
          { id: 'be4-2', description: 'Evaluate impact of organizational change to project and determine required actions' },
          { id: 'be4-3', description: 'Evaluate impact of the project to the organization and determine required actions' }
        ]
      }
    ]
  }
];
