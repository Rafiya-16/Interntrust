const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const Posting = require('../models/Posting');

const seedData = [
  {
    title: 'Frontend Developer Intern',
    company: 'Internshala Trainings',
    description: 'Work with the frontend team to build and maintain React-based learning dashboards. Great for students strengthening component-based UI skills.',
    requiredSkills: ['React', 'JavaScript', 'CSS'],
    stipend: '₹8,000 - ₹12,000/month',
    location: 'Remote',
    applyLink: 'https://internshala.com/internships/work-from-home-frontend-development-internship',
  },
  {
    title: 'Backend Developer Intern (Node.js)',
    company: 'Razorpay',
    description: 'Assist the payments engineering team with building and testing REST APIs. Exposure to production-grade Node.js and MongoDB systems.',
    requiredSkills: ['Node.js', 'Express', 'MongoDB'],
    stipend: '₹15,000/month',
    location: 'Bangalore, India',
    applyLink: 'https://razorpay.com/jobs/',
  },
  {
    title: 'Machine Learning Intern',
    company: 'Fractal Analytics',
    description: 'Support the applied AI team building predictive models for enterprise clients. Requires basic understanding of Python and ML fundamentals.',
    requiredSkills: ['Python', 'Machine Learning', 'Pandas'],
    stipend: '₹20,000/month',
    location: 'Mumbai, India',
    applyLink: 'https://fractal.ai/careers/',
  },
  {
    title: 'Full Stack Development Intern',
    company: 'Zoho Corporation',
    description: 'Contribute to internal tools using the MERN stack under the guidance of senior engineers. Strong learning environment for freshers.',
    requiredSkills: ['React', 'Node.js', 'MongoDB'],
    stipend: '₹18,000/month',
    location: 'Chennai, India',
    applyLink: 'https://www.zoho.com/careers/',
  },
  {
    title: 'Data Analyst Intern',
    company: 'Swiggy',
    description: 'Work with the analytics team to build dashboards and generate insights from operational data using SQL and Python.',
    requiredSkills: ['SQL', 'Python', 'Data Analysis'],
    stipend: '₹15,000/month',
    location: 'Bangalore, India',
    applyLink: 'https://careers.swiggy.com/',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Freshworks',
    description: 'Join a product engineering pod to ship features for Freshworks\' customer support platform. Mentorship provided throughout.',
    requiredSkills: ['Java', 'Spring Boot', 'SQL'],
    stipend: '₹25,000/month',
    location: 'Chennai, India',
    applyLink: 'https://www.freshworks.com/company/careers/',
  },
  {
    title: 'UI/UX Design Intern',
    company: 'CRED',
    description: 'Support the design team with wireframes, prototypes, and user research for CRED\'s consumer app.',
    requiredSkills: ['Figma', 'UI Design', 'Prototyping'],
    stipend: '₹20,000/month',
    location: 'Bangalore, India',
    applyLink: 'https://careers.cred.club/',
  },
  {
    title: 'Python Developer Intern',
    company: 'Practo',
    description: 'Assist backend engineers in building healthcare scheduling APIs using Django and PostgreSQL.',
    requiredSkills: ['Python', 'Django', 'PostgreSQL'],
    stipend: '₹15,000/month',
    location: 'Bangalore, India',
    applyLink: 'https://www.practo.com/company/careers',
  },
  {
    title: 'Cloud Engineering Intern',
    company: 'Tata Consultancy Services (TCS)',
    description: 'Support cloud migration projects, learning AWS fundamentals under senior cloud architects. Structured training provided.',
    requiredSkills: ['AWS', 'Linux', 'Networking Basics'],
    stipend: '₹12,000/month',
    location: 'Hyderabad, India',
    applyLink: 'https://www.tcs.com/careers',
  },
  {
    title: 'React Native Intern',
    company: 'Meesho',
    description: 'Work on cross-platform mobile features for Meesho\'s seller app, collaborating closely with product and design.',
    requiredSkills: ['React Native', 'JavaScript', 'Mobile Development'],
    stipend: '₹18,000/month',
    location: 'Bangalore, India',
    applyLink: 'https://careers.meesho.io/',
  },
  {
    title: 'DevOps Intern',
    company: 'Postman',
    description: 'Support the infrastructure team with CI/CD pipelines and containerized deployments. Great exposure to modern DevOps tooling.',
    requiredSkills: ['Docker', 'CI/CD', 'Linux'],
    stipend: '₹22,000/month',
    location: 'Bangalore, India',
    applyLink: 'https://www.postman.com/company/careers/',
  },
  {
    title: 'QA/Testing Intern',
    company: 'BrowserStack',
    description: 'Learn manual and automated testing practices while working alongside the quality engineering team on real product releases.',
    requiredSkills: ['Manual Testing', 'Selenium', 'JavaScript'],
    stipend: '₹15,000/month',
    location: 'Mumbai, India',
    applyLink: 'https://www.browserstack.com/company/careers',
  },
  {
    title: 'AI Research Intern',
    company: 'Wadhwani AI',
    description: 'Assist researchers applying AI to public health and agriculture problems. Ideal for students with an ML foundation and social interest.',
    requiredSkills: ['Python', 'Machine Learning', 'Research'],
    stipend: '₹18,000/month',
    location: 'Mumbai, India',
    applyLink: 'https://www.wadhwaniai.org/careers/',
  },
  {
    title: '"Free Registration" Marketing Internship',
    company: 'QuickEarn Global Pvt Ltd',
    description: 'Earn ₹50,000/month working just 2 hours a day! No experience needed. Pay a refundable ₹999 registration fee to secure your seat immediately — limited slots!',
    requiredSkills: ['Communication'],
    stipend: '₹50,000/month (unrealistic — seeded intentionally as a red-flag example)',
    location: 'Remote',
    applyLink: 'https://forms.gle/fake-example-link',
  },
  {
    title: 'Web Development Intern (Urgent Hiring)',
    company: 'Unknown Sender',
    description: 'DM for details. Great opportunity, apply now, spots filling fast. No company website listed — seeded intentionally as a red-flag example for testing legitimacy scoring.',
    requiredSkills: ['HTML', 'CSS'],
    stipend: 'Not specified',
    location: 'Remote',
    applyLink: 'https://bit.ly/fake-example-link',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding');

    for (const item of seedData) {
      const exists = await Posting.findOne({ title: item.title, company: item.company });
      if (exists) {
        console.log(`⏭  Skipping (already exists): ${item.title} @ ${item.company}`);
        continue;
      }
      await Posting.create({ ...item, submittedBy: null });
      console.log(`✅ Seeded: ${item.title} @ ${item.company}`);
    }

    console.log('🌱 Seeding complete.');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();