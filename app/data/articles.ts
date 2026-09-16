export interface ArticleBlock {
  type: 'p' | 'heading' | 'highlight' | 'list' | 'signature' | 'signatureName' | 'signatureRole' | 'signatureContact'
  text?: string
  items?: string[]
}

export interface Article {
  title: string
  slug: string
  image: string
  category: string
  categoryPath: string
  author: string
  date: string
  readTime?: string
  subtitle?: string
  body: ArticleBlock[]
}

export const articles: Record<string, Article> = {
  'mathematics-can-change-destiny-kcse-candidate': {
    title: 'Mathematics Can Change the Destiny of a KCSE Candidate: 53 Days to Turn Fear into Marks',
    slug: 'mathematics-can-change-destiny-kcse-candidate',
    image: '/images/img1.jpeg',
    category: 'Educational News',
    categoryPath: '/educational-news',
    author: 'Mwalimu Malata Benson',
    date: '11th September 2026',
    readTime: '8 min read',
    subtitle: 'A call to Principals, Heads of Mathematics, Mathematics Teachers and 2026 KCSE Candidates',
    body: [
      { type: 'p', text: 'Dear Principals, Heads of Mathematics, Teachers of Mathematics and 2026 KCSE Candidates,' },
      { type: 'p', text: 'Mathematics remains one of the most decisive subjects in the academic journey of a secondary school learner. We all know the implications to a learner if they score mathematics below C+ grade even if they scored KCSE overall grade of C+ and above. It is not merely a subject that learners are expected to pass in order to complete secondary education; it is a subject that can significantly influence the range of courses and career pathways available to a learner after KCSE.' },
      { type: 'p', text: 'As we approach the 2026 KCSE examinations, I wish to make one passionate appeal to every mathematics teacher: LET US CHANGE THE ATTITUDE TOWARDS MATHEMATICS BEFORE MATHEMATICS CHANGES THE DESTINY OF OUR LEARNERS.' },
      { type: 'p', text: 'The 2026 Mathematics examinations are scheduled for Tuesday, 3 November 2026 for Paper 1 and Monday, 9 November 2026 for Paper 2, both in the morning session from 8.00 a.m. to 10.30 a.m.' },
      { type: 'p', text: 'As of 11 September 2026, we have approximately 53 days before Mathematics Paper 1. Fifty-three days is not a short period when a teacher and learners deliberately work together every single day.' },
      { type: 'p', text: 'Imagine giving a candidate 20 mathematics questions every day for 53 days. That is 1,060 questions before Paper 1.' },
      { type: 'highlight', text: 'CAN A LEARNER REMAIN THE SAME AFTER 1,060 WELL-SELECTED, MARKED, CORRECTED AND REVISED MATHEMATICS QUESTIONS? I believe the answer is NO.' },
      { type: 'heading', text: 'Mathematics Requires Consistency, Not Magic' },
      { type: 'p', text: 'Mathematics is a subject of practice. A learner cannot become competent in mathematics by attending a lesson, copying notes and waiting for the examination.' },
      { type: 'p', text: 'The learner must see mathematics, attempt mathematics, make mistakes in mathematics, receive correction, understand the method and practise again.' },
      { type: 'p', text: 'Daily practice changes the learner’s attitude. A learner who initially says, "I hate mathematics," may eventually say, "I can do mathematics." That transformation begins with the teacher.' },
      { type: 'p', text: 'Mathematics becomes easier when the teacher simplifies the concepts, breaks difficult questions into manageable steps and works closely with the learner.' },
      { type: 'heading', text: 'Teachers Can Make or Break Mathematics Performance' },
      { type: 'p', text: 'There is a painful reality that mathematics teachers must confront:' },
      { type: 'highlight', text: 'STUDENTS FAILING MATHEMATICS MAY SOMETIMES BE A REFLECTION OF THE TEACHING PROCESS, JUST AS STUDENTS EXCELLING IN MATHEMATICS MAY BE A REFLECTION OF EFFECTIVE TEACHING.' },
      { type: 'p', text: 'This is not intended to blame teachers for every poor result. Learners have different abilities, backgrounds, attitudes and levels of commitment. However, the teacher has enormous influence over whether mathematics becomes frightening or manageable. Schools that consistently perform well in mathematics usually have a deliberate mathematics culture. They have programmes such as:' },
      { type: 'list', items: [
        '20 sums every day.',
        'A working mathematics hour.',
        'Lunch-time mathematics questions.',
        'Immediate marking and correction.',
        'Revision of questions that learners have failed.',
        'Close teacher-learner interaction.',
        'Focus on methodology, not just answers.',
        'Consistent practice of commonly tested KCSE areas.',
        'Identification and support of weak learners.',
        'Regular exposure to KCSE-style questions.',
      ]},
      { type: 'p', text: 'This is how mathematics performance is built. Are your students doing this?' },
      { type: 'heading', text: 'Mathematics Has a Large Scope — Know Your Territory' },
      { type: 'p', text: 'The current 8.4.4 mathematics syllabus has a wide scope of 68 topics. The analysis of KCSE 2020–2025 common-tested areas demonstrates that questions have been drawn from numerous areas across Forms 1–4.' },
      { type: 'p', text: 'A mathematics teacher must therefore know:' },
      { type: 'list', items: [
        'What is in the syllabus?',
        'What has been tested?',
        'How has it been tested?',
        'How many marks have been allocated?',
        'What methods do learners need to master?',
      ]},
      { type: 'p', text: 'A teacher who does not understand the scope of the subject may unintentionally leave learners exposed.' },
      { type: 'heading', text: 'Know the Commonly Tested Areas' },
      { type: 'p', text: 'The 2020–2025 analysis provides useful evidence for teachers planning final revision. In Paper 1, Form 1 areas have repeatedly contributed marks through topics such as rates and ratios, commercial arithmetic, geometric construction, bearings and common solids. Form 2 areas have included indices, equations of straight lines, transformations, trigonometry, quadratic expressions and equations, mensuration, linear motion, statistics and vectors. Form 3 areas include trigonometry and matrices, while Form 4 includes area approximation and differentiation.' },
      { type: 'p', text: 'In Paper 2, recurring areas include quadratic equations and expressions, commercial arithmetic, circles, formulae and variation, sequences and series, vectors, probability, graphical methods, matrices and transformations, statistics, loci, three-dimensional geometry, latitude and longitudes, linear programming and integration.' },
      { type: 'heading', text: 'What the 2020–2025 Data Tells Mathematics Teachers' },
      { type: 'p', text: 'The Paper 1 analysis shows that the distribution changes from year to year. In 2020, for example, the Form 1 total was 46 marks, Form 2 64, Form 3 10 and Form 4 10. In 2025, the corresponding totals were 31, 73, 10 and 16.' },
      { type: 'p', text: 'Paper 2 also demonstrates substantial contribution from Form 3 and Form 4 areas. The analysis records Form 3 totals of 85, 73, 74, 81, 92 and 84 marks from 2020 to 2025 respectively, while Form 4 contributed 45, 57, 56, 49, 38 and 46 marks.' },
      { type: 'highlight', text: 'DO NOT REVISE MATHEMATICS RANDOMLY. REVISE MATHEMATICS STRATEGICALLY.' },
      { type: 'heading', text: 'Mark the Method — Not Only the Final Answer' },
      { type: 'p', text: 'One of the most important areas requiring urgent attention is mathematics marking methodology. A learner may arrive at a wrong final answer but demonstrate a correct or partially correct method. The teacher must therefore train learners to:' },
      { type: 'list', items: [
        'Show their working.',
        'Show the formula.',
        'Show the substitution.',
        'Show the calculation.',
        'Show the reasoning.',
      ]},
      { type: 'p', text: 'A large tick placed against a final answer without examining the learner’s working can deny the teacher an opportunity to identify where the learner went wrong.' },
      { type: 'highlight', text: 'PLEASE, MATHEMATICS TEACHERS, MARK THE JOURNEY — NOT JUST THE DESTINATION.' },
      { type: 'heading', text: 'Principals and HODs, Please Ask the Hard Questions' },
      { type: 'p', text: 'Every Principal and Head of Mathematics should establish the truth about mathematics teaching in the school. Ask:' },
      { type: 'list', items: [
        'How many mathematics questions does every candidate do daily?',
        'Who marks them? Who corrects them?',
        'Do teachers analyse learners’ workings?',
        'Do we have a mathematics remediation programme?',
        'Do we have a list of weak areas for every candidate?',
        'Are teachers discussing common KCSE questions?',
        'Do our learners know how to score method marks?',
        'Do our teachers have an internal mathematics mentorship programme?',
      ]},
      { type: 'heading', text: 'The Mathematics Teacher Must Have a Mathematics Identity' },
      { type: 'p', text: 'In some schools, mathematics teachers acquire affectionate academic nicknames from learners based on the topics they teach passionately — Surds, Vectors, Matrix. Such a nickname may indicate that the teacher has become strongly associated with a particular mathematical concept.' },
      { type: 'p', text: 'So, my colleague mathematics teacher: Do your learners have a mathematics nickname for you? If they do not, it does not automatically mean that you are ineffective. But it should make you ask: What mathematics identity am I building among my learners?' },
      { type: 'p', text: 'A great mathematics teacher is remembered long after the examination because he or she made learners believe: "I CAN DO MATHEMATICS."' },
      { type: 'heading', text: 'Mathematics and the Future of the Learner' },
      { type: 'p', text: 'A strong mathematics grade can broaden a learner’s post-secondary options, particularly for programmes with substantial mathematical, scientific or quantitative requirements.' },
      { type: 'p', text: 'A learner who achieves C+ and above in Mathematics, where the relevant course requirements are also satisfied, may have a stronger opportunity to pursue a wider range of competitive programmes such as teaching, engineering, selected medical and health-related programmes, law and banking/finance-related pathways.' },
      { type: 'p', text: 'However, teachers should avoid telling learners that one Mathematics grade alone guarantees admission to these courses. University and professional programmes have specific overall grade, subject-cluster and institutional requirements.' },
      { type: 'p', text: 'The central message remains: LET US GIVE EVERY LEARNER THE BEST POSSIBLE MATHEMATICS GRADE BEFORE WE CLOSE THE DOOR ON THEIR OPTIONS.' },
      { type: 'heading', text: '20 Sums Daily for 53 Days — Finishing Strong and Smart' },
      { type: 'p', text: 'We have approximately 53 days before Mathematics Paper 1. Let every mathematics department establish the 20-sum daily programme. Every candidate should attempt 20 carefully selected mathematics questions every day. But there is an important condition:' },
      { type: 'highlight', text: '20 questions must not become 20 unanswered questions.' },
      { type: 'p', text: 'The teacher should ensure:' },
      { type: 'list', items: [
        'Questions are attempted.',
        'Workings are shown.',
        'Scripts are marked.',
        'Errors are identified.',
        'Methods are corrected.',
        'Difficult questions are reworked.',
        'Common mistakes are recorded.',
        'Similar questions are attempted again.',
      ]},
      { type: 'p', text: 'This is how practice becomes mastery.' },
      { type: 'heading', text: 'The Final Message to the 2026 Candidate' },
      { type: 'p', text: 'Dear 2026 KCSE candidate,' },
      { type: 'p', text: 'Do not fear mathematics. Respect it. Practise it. Ask questions. Show your working. Correct your mistakes. Repeat difficult questions.' },
      { type: 'p', text: 'Do not say, "I am not a mathematics person." Say: "I HAVE NOT MASTERED IT YET."' },
      { type: 'p', text: 'There is a difference. Your mathematics teacher is ready to help you. Your Principal is ready to support you. Your Head of Mathematics is ready to coordinate the department.' },
      { type: 'p', text: 'But ultimately, you must pick up your pen and solve the question.' },
      { type: 'heading', text: 'To the Mathematics Teacher — This Is Your Moment' },
      { type: 'p', text: 'My colleague,' },
      { type: 'p', text: 'You have approximately 53 days. Do not wait for another mock examination. Do not wait for October. Do not wait for the last week. Start now.' },
      { type: 'p', text: 'Take the learner by the hand. Give the learner 20 questions. Mark them. Correct them. Sit beside the learner. Explain the method. Repeat. Repeat. Repeat.' },
      { type: 'highlight', text: 'Let us save people’s children through mathematics.' },
      { type: 'signature', text: 'Yours in Education, Mentorship and Service,' },
      { type: 'signatureName', text: 'Mwalimu Malata O.J. Benson' },
      { type: 'signatureRole', text: 'Teacher – Mentor – Publisher – Writer – Political Analyst – Educational Consultant – Motivational Speaker' },
      { type: 'signatureContact', text: '0728701795 · bensonmalata65@gmail.com' },
    ],
  },
}
