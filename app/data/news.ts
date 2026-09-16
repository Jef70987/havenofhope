export interface NewsItem {
  title: string
  slug: string
  image: string
  category: string
  categoryPath: string
  author: string
  date: string
  excerpt: string
}

export const featured: NewsItem = {
  title: 'Mathematics Can Change the Destiny of a KCSE Candidate: 53 Days to Turn Fear into Marks',
  slug: 'mathematics-can-change-destiny-kcse-candidate',
  image: '/images/img1.jpeg',
  category: 'Educational News',
  categoryPath: '/educational-news',
  author: 'Mwalimu Malata Benson',
  date: '11th September 2026',
  excerpt:
    'As we approach the 2026 KCSE examinations, one passionate appeal to every mathematics teacher: let us change the attitude towards mathematics before mathematics changes the destiny of our learners.',
}

export const allNews: NewsItem[] = [
  {
    title: 'Musingu Boys Posts Best KCSE Results in School History',
    slug: 'musingu-boys-best-kcse-results',
    image: '/images/img2.jpeg',
    category: 'Schools',
    categoryPath: '/schools',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'Musingu Boys High School has recorded a mean score of 8.95 in the 2025 KCSE examinations, its best performance yet, surpassing its long-time rival Sacred Heart Mukumu Girls in the Kiswahili mean score for the first time in over a decade.',
  },
  {
    title: 'TSC Re-Advertises 1,631 Promotion Jobs for Teachers',
    slug: 'tsc-re-advertises-1631-promotion-jobs',
    image: '/images/tsc-promotion-jobs.jpg',
    category: 'TSC',
    categoryPath: '/tsc',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'The Teachers Service Commission has re-advertised 1,631 promotional vacancies for serving teachers seeking appointment to school administrative positions in public primary and secondary schools.',
  },
  {
    title: 'KUPPET Threatens Countywide Strike Over TSC Principal Intimidation',
    slug: 'kuppet-threatens-countywide-strike',
    image: '/images/kuppet-strike.jpg',
    category: 'Politics',
    categoryPath: '/politics',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'KUPPET Nyamira County branch has accused a section of Catholic clergy and the BOM of intimidating a newly deployed principal at St. Peter’s Nyakemincha Senior School.',
  },
  {
    title: 'Kiswahili Teachers Attend National Workshop in Nakuru',
    slug: 'kiswahili-teachers-workshop-nakuru',
    image: '/images/kiswahili-workshop.jpg',
    category: 'Workshops',
    categoryPath: '/workshops',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'Over 400 Kiswahili teachers from across the country converged in Nakuru for a three-day workshop focused on improving performance in the subject at KCSE level.',
  },
  {
    title: 'KNEC Releases 2026 KCSE Examination Timetable',
    slug: 'knec-releases-2026-kcse-timetable',
    image: '/images/knec-timetable.jpg',
    category: 'KNEC',
    categoryPath: '/knec',
    author: 'Mwalimu Malata Benson',
    date: '8th September 2026',
    excerpt:
      'The Kenya National Examinations Council has released the official timetable for the 2026 KCSE examinations, with candidates expected to sit for their papers beginning November.',
  },
  {
    title: 'Ministry of Education Rolls Out New Leadership Training for Principals',
    slug: 'ministry-rolls-out-leadership-training',
    image: '/images/leadership-training.jpg',
    category: 'Leadership',
    categoryPath: '/leadership',
    author: 'Mwalimu Malata Benson',
    date: '8th September 2026',
    excerpt:
      'The Ministry of Education has launched a nationwide leadership development programme targeting school principals and deputy principals in public secondary schools.',
  },
  {
    title: 'Teachers Urged to Embrace Digital Literacy in the Classroom',
    slug: 'teachers-embrace-digital-literacy',
    image: '/images/digital-literacy.jpg',
    category: 'Social',
    categoryPath: '/social',
    author: 'Mwalimu Malata Benson',
    date: '8th September 2026',
    excerpt:
      'Education stakeholders have called on teachers to embrace digital literacy and integrate technology into their teaching to improve learning outcomes.',
  },
  {
    title: 'TSC Inducts 136 Newly Recruited Secretariat Staff',
    slug: 'tsc-inducts-136-new-staff',
    image: '/images/tsc-induction.jpg',
    category: 'TSC',
    categoryPath: '/tsc',
    author: 'Mwalimu Malata Benson',
    date: '7th September 2026',
    excerpt:
      'The Teachers Service Commission has commenced a week-long induction programme for 136 newly recruited secretariat staff in collaboration with the Kenya School of Government.',
  },
  {
    title: 'Mwalimu Comprehensive Medical Cover: What Teachers Get Under SHA',
    slug: 'mwalimu-comprehensive-medical-cover',
    image: '/images/mwalimu-medical.jpg',
    category: 'Educational News',
    categoryPath: '/educational-news',
    author: 'Mwalimu Malata Benson',
    date: '7th September 2026',
    excerpt:
      'Every TSC-employed teacher in Kenya is now covered under the Mwalimu Comprehensive Medical Cover, run by the Social Health Authority through POMSF.',
  },
  {
    title: 'TVET Tutors Issue 21-Day Ultimatum, Threaten Strike',
    slug: 'tvet-tutors-21-day-ultimatum',
    image: '/images/tvet-tutors.jpg',
    category: 'Educational News',
    categoryPath: '/educational-news',
    author: 'Mwalimu Malata Benson',
    date: '6th September 2026',
    excerpt:
      'Technical and Vocational Education and Training tutors have issued the Ministry of Education a 21-day ultimatum over curriculum changes, student assessments, medical cover and transfers.',
  },
  {
    title: 'Careers Related to Social Studies in Kenya: A Practical Guide',
    slug: 'careers-related-to-social-studies-kenya',
    image: '/images/social-studies-careers.jpg',
    category: 'Social',
    categoryPath: '/social',
    author: 'Mwalimu Malata Benson',
    date: '6th September 2026',
    excerpt:
      'Social studies opens the door to some of Kenya’s most stable and in-demand professions, from teaching and law to human resources, policy research and journalism.',
  },
  {
    title: 'Government Increases Funding for Teacher Promotions to Sh2 Billion',
    slug: 'government-increases-promotion-funding',
    image: '/images/promotion-funding.jpg',
    category: 'Politics',
    categoryPath: '/politics',
    author: 'Mwalimu Malata Benson',
    date: '5th September 2026',
    excerpt:
      'President William Ruto has announced an increase in the annual allocation for teacher promotions from Sh1 billion to Sh2 billion to facilitate career progression.',
  },
  {
    title: 'From Teacher to Mentor: The Journey of Mwalimu Malata Benson',
    slug: 'from-teacher-to-mentor-journey',
    image: '/images/teacher-mentor.jpg',
    category: 'Leadership',
    categoryPath: '/leadership',
    author: 'Mwalimu Malata Benson',
    date: '5th September 2026',
    excerpt:
      'Two decades of sacrifice, service and results. A look at the personal journey of one of Kenya’s most recognised educators and what it means to serve the child.',
  },
  {
    title: 'How Boarding Life Shapes Discipline in Kenyan Schools',
    slug: 'boarding-life-shapes-discipline',
    image: '/images/boarding-life.jpg',
    category: 'Schools',
    categoryPath: '/schools',
    author: 'Mwalimu Malata Benson',
    date: '4th September 2026',
    excerpt:
      'A deep dive into the role of boarding masters and matrons in shaping discipline, mentorship and academic performance in Kenyan secondary schools.',
  },
  {
    title: 'TSC Profile Update Online: Requirements and Steps',
    slug: 'tsc-profile-update-online-guide',
    image: '/images/tsc-profile-update.jpg',
    category: 'TSC',
    categoryPath: '/tsc',
    author: 'Mwalimu Malata Benson',
    date: '4th September 2026',
    excerpt:
      'If you are a registered teacher and need to correct or refresh your details with the Teachers Service Commission, you can now do it entirely online without visiting a TSC office.',
  },
  {
    title: 'The Role of Mentorship in Building the Next Generation of Teachers',
    slug: 'role-of-mentorship-next-generation-teachers',
    image: '/images/mentorship.jpg',
    category: 'Leadership',
    categoryPath: '/leadership',
    author: 'Mwalimu Malata Benson',
    date: '3rd September 2026',
    excerpt:
      'Why mentorship — not just training — is what transforms a teacher into a leader, and how schools across Kenya are embracing structured mentorship programmes.',
  },
  {
    title: 'TSC Payslip Registration: How to Activate and Use T-Pay in 2026',
    slug: 'tsc-payslip-registration-guide',
    image: '/images/tsc-payslip.jpg',
    category: 'TSC',
    categoryPath: '/tsc',
    author: 'Mwalimu Malata Benson',
    date: '3rd September 2026',
    excerpt:
      'Getting a TSC number and getting access to your online payslip are two different processes. This guide covers how to activate your T-Pay account and download your payslip.',
  },
  {
    title: 'How to Apply for TSC Sick Leave: HRMIS Process and Requirements',
    slug: 'tsc-sick-leave-application-process',
    image: '/images/tsc-sick-leave.jpg',
    category: 'TSC',
    categoryPath: '/tsc',
    author: 'Mwalimu Malata Benson',
    date: '2nd September 2026',
    excerpt:
      'A teacher who falls ill and cannot report to duty must formally apply for sick leave with the Teachers Service Commission through the HRMIS Leave Module.',
  },
  {
    title: 'TSC Announces New Transfer Guidelines for Teachers',
    slug: 'tsc-new-transfer-guidelines',
    image: '/images/tsc-transfer.jpg',
    category: 'TSC',
    categoryPath: '/tsc',
    author: 'Mwalimu Malata Benson',
    date: '2nd September 2026',
    excerpt:
      'The Teachers Service Commission has released updated transfer guidelines for teachers, outlining the minimum tenure requirements and application procedure.',
  },
  {
    title: 'The Future of CBC in Kenyan Secondary Schools',
    slug: 'future-of-cbc-kenyan-secondary-schools',
    image: '/images/cbc-future.jpg',
    category: 'Educational News',
    categoryPath: '/educational-news',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'As the Competency-Based Curriculum continues to roll out across Kenya, stakeholders weigh in on the opportunities, challenges and what the future holds for learners.',
  },
  {
    title: 'Mental Health Awareness Among Kenyan Teachers',
    slug: 'mental-health-awareness-kenyan-teachers',
    image: '/images/mental-health.jpg',
    category: 'Social',
    categoryPath: '/social',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'Teachers face unique pressures — workload, transfers, financial strain. This piece explores why mental health support for educators is now more urgent than ever.',
  },
]
