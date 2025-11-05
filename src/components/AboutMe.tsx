import { AcademicCapIcon, LifebuoyIcon, CubeTransparentIcon, GlobeAltIcon } from '@heroicons/react/20/solid'

export const certs = [
  "AWS Cloud Practitioner Certified",
  "AWS Solution Architect Associate Certified",
  "AWS Solution Architect Professional Certified",
  "AWS Developer Associate Certified",
  "AWS SysOps Administrator Associate Certified",
  "AWS DevOps Engineer Professional Certified",
  "AWS Security Specialty Certified",
  "AWS Well-Architected Framework Trained"
]

export const languages1 = [
  "Terraform",
  "OpenTofu",
  "CloudFormation"
]
export const languages2 = [
  "Go",
  "Python",
  "Bash"
]

export const aws = [
  "EC2",
  "VPC",
  "ECS",
  "IAM",
  "KMS",
  "DynamoDB",
  "Lambda",
  "S3",
  "CloudWatch",
  "CloudTrail",
  "CloudFormation",
  "Kinesis",
  "SNS"
]

export const skills = [
  "Git",
  "GitHub",
  "Bitbucket",
  "AWS CLI",
  "Networking",
  "Embedded Systems",
  "CI/CD",
  "Linux",
  "Docker",
  "JIRA",
  "Documentation",
  "3D Printing",
  "IaC"
]

export const timeline = [
  {
    id: 11,
    company: 'Independent Consultant',
    location: 'Remote',
    date: 'January 2024',
    datetime: '2024-01-01',
    icon: CubeTransparentIcon,
    comment: 'Launched Bright Wrench Design as an independent AWS Cloud & DevOps Consultant'
  },
  {
    id: 10,
    company: 'Slalom Consulting',
    title: 'Independent Contract Employee',
    location: 'Remote',
    date: 'December 2024',
    datetime: '2024-12-01',
    icon: LifebuoyIcon,
    bullets: [
      "Contracted hourly independent project employee for Slalom Consulting",
      "Worked closely with a large cryptocurrency client to migrate from an on-prem GitHub Enterprise Server (GHES) instance to a GitHub Enterprise Cloud Data Residency instance (GHEC)",
      "Migrated complex GitHub Actions workflows from on-prem GHES to cloud-based GHEC",
      "Updated internal systems and infrastructure to be compatible with cloud-based workflows",
      "Assisted with designing and developing automated codebase migration tooling"
    ]
  },
  {
    id: 9,
    company: 'Gruntwork',
    title: 'Software Engineer',
    location: 'Remote',
    date: 'October 2022',
    datetime: '2022-10-01',
    icon: LifebuoyIcon,
    bullets: [
      "Led engineering work for the Infrastructure as Code Library. Built new Terraform modules, implemented new features to existing modules, and organized regular maintenance and upgrades on existing IaC components.",
      "Contributed to open source projects such as cloud-nuke, terragrunt, and terratest",
      "Worked closely with customers and other engineers across multiple time zones in a fully remote environment."
    ]
  },
  {
    id: 8,
    company: 'Altium Limited',
    title: 'DevOps Engineer',
    location: 'Remote',
    date: 'June 2022',
    datetime: '2022-05-01',
    icon: LifebuoyIcon,
    bullets: [
      "Provided guidance on best practices for deploying applications to a regulated AWS GovCloud environment"
    ]
  },
  {
    id: 7,
    company: 'Slalom Consulting',
    title: 'Senior Consultant - Cloud & DevOps',
    location: 'San Francisco, CA / Remote',
    date: 'January 2019',
    datetime: '2019-01-01',
    icon: LifebuoyIcon,
    bullets: [
      "Designed and developed DevOps pipelines for automating infrastructure deployments (CI/CD)",
      "Designed and built a terraform module catalog for use in developing a serverless data lake on AWS",
      "Worked with wide range of clients and projects from startups to large enterprise organizations"
    ]
  },
  {
    id: 6,
    company: 'Convergence CT',
    title: 'Solutions Architect',
    location: 'Livermore, CA',
    date: 'June 2018',
    datetime: '2018-06-01',
    icon: LifebuoyIcon,
    bullets: [
      "Lead Solution Architect for design and development of AWS components of the Global Healthcare Data Network",
      "Designed, recommended, and implemented a multi-account AWS strategy",
      "Designed, built and deployed AWS cross account roles, policies, and deployment pipelines for least-privileged access to maximize security while continuing to enable developer productivity.",
      "Deployed a cross-account centralized logging ELK stack utilizing S3, Elasticsearch, Lambda, Kinesis Firehose, with logs encrypted by KMS."
    ]
  },
  {
    id: 5,
    company: 'Pacific Gas & Electric Company',
    title: 'Systems Engineer',
    location: 'San Francisco, CA',
    date: 'October 2017',
    datetime: '2017-10-01',
    icon: LifebuoyIcon,
    bullets: [
      "Worked with Analytics team to design and deploy cloud infrastructure by coordinating between Solution Architecture, Infrastructure & Operations, and Business Technology groups",
      "Cloud Mentor for the Cloud Mentorship Program"
    ]
  },
  {
    id: 4,
    title: 'Programmer Analyst',
    date: 'January 2017',
    datetime: '2017-01-01',
    icon: null,
    bullets: [
      "Product Owner for Basecamp One: A course to introduce solution architects to cloud native systems in an engaging and experiential way",
      "Developed and implemented reference applications across different cloud service providers: AWS, Heroku, Pivotal CloudFoundry, and IBM Bluemix",
      "Implemented proof-of-concepts for various architecture based initiatives focused on integrating existing on-prem systems with cloud based-systems",
      "AWS Certified Solution Architect Professional, DevOps Engineer Professional, Associate Developer, Associate SysOps Administrator, Associate Solution Architect"
    ]
  },
  {
    id: 3,
    title: 'IT Rotational Engineer (ITRDP)',
    date: 'August 2015',
    datetime: '2015-08-01',
    icon: null,
    comment: "PG&E IT Rotational Development Program (ITRDP)",
    bullets: [
      "Developed cloud-based application back-end utilizing Node.js, Python and MongoDB",
      "Worked with the Solution Architecture team",
      "Assisted with documenting integration design patterns",
      "Testing with the Enterprise Integration API Management team",
      "Built an application utilizing Salesforce and Heroku platforms as a proof of concept",
    ]
  },
  {
    id: 2,
    company: 'Graduated from Sonoma State University',
    title: 'Bachelor of Science in Electrical Engineering',
    location: 'Rohnert Park, CA',
    date: 'May 2015',
    datetime: '2015-05-01',
    icon: AcademicCapIcon,
    bullets: []
  },
  {
    id: 1,
    company: 'Pacific Gas & Electric Company',
    title: 'Intern - Information Technology',
    location: "San Francisco, CA",
    date: 'May 2014',
    datetime: '2014-05-01',
    icon: GlobeAltIcon,
    comment: "Summer intern with IT HR Systems team",
    bullets: [
      "Assisted primarily with SAP HR process design mapping & improvements",
      "Tested internal HR systems and web applications",
      "Handled various HR data requests through SAP",
      "Created scripts to help improve and automate vital IT HR processes"
    ]
  },
  {
    id: 0
  }
]