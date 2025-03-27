HackTrack – AI-Powered Hackathon Team Selection & Management Portal HackTrack is an intelligent, AI-driven platform designed to streamline the team registration, project submission, and evaluation process for hackathons. By leveraging Natural Language Processing (NLP), Computer Vision, and GitHub repository analysis, it ensures a fair and automated shortlisting of teams while providing a seamless experience for both participants and organizers.

🔥 Key Features 👨‍💻 For Participants: 
✅ Team Registration & Management – Teams can sign up, add members, and manage their project details. 
✅ Project Submission Portal – Upload project descriptions, GitHub repositories, and demo links.
✅ Dashboard for Tracking – View submission status, hackathon timeline, and evaluation progress. 
✅ Automated Email Notifications – Get real-time updates on team shortlisting, results, and announcements.
✅ AI-Powered FAQ Chatbot – Instant query resolution with an AI-driven assistant.
✅ Dark/Light Mode UI – A modern, user-friendly interface with theme-switching options.

🛠️ For Organizers (Admins): 
🔹 AI-Based Project Evaluation – Uses NLP, image recognition, and GitHub activity analysis for automated shortlisting.
🔹 Manual Review & Result Declaration – Admins can manually assess shortlisted projects and declare winners. 
🔹 Team & Submission Management – View, approve, or disqualify team submissions through a centralized panel. 
🔹 Certificate Generation & Distribution – Generate and send certificates to winning teams automatically. 
🔹 Admin Dashboard – Oversee hackathon progress, monitor participation statistics, and manage announcements.

🏗️ Tech Stack Component Technology Used Frontend React.js, Tailwind CSS Backend Node.js, Express.js Database MongoDB Authentication JWT-based authentication AI Models NLP (for project description analysis), Computer Vision (for UI/UX evaluation), GitHub API (for code quality analysis) Deployment Vercel / AWS / Firebase 
⚙️ How HackTrack Works 
1️⃣ Team Registration & Submission Teams register, create their profile, and submit their project details, including GitHub repositories, project descriptions, and demo links.
2️⃣ AI-Powered Evaluation NLP Model: Analyzes project descriptions to assess creativity, feasibility, and problem-solving approach.
Computer Vision Model: Evaluates screenshots of the UI/UX to check design aesthetics.
GitHub API Analysis: Reviews commit frequency, contribution history, and code structure.
3️⃣ Admin Review & Shortlisting AI-generated scores help rank projects based on innovation, functionality, and technical complexity.
Organizers can override AI decisions, manually review projects, and approve/disqualify teams.
4️⃣ Results & Certificate Distribution Once evaluations are complete, admins publish results and distribute digital certificates automatically.

🏆 Why Choose HackTrack?
🚀 AI-Powered Shortlisting – Eliminates manual bias and speeds up hackathon evaluations.
💡 Efficient & Scalable – Designed for hackathons of any size, from college fests to global competitions.
📊 Comprehensive Dashboard – Gives participants and organizers full control over the process. 
📩 Seamless Communication – Automated emails keep participants informed.
🏅 Certificate Generation – Automates the post-hackathon process for hassle-free recognition.

🚀 Future Enhancements 
🔹 Leaderboard & Ranking System – Display team rankings dynamically. 
🔹 Real-Time Code Analysis – Use AI to detect plagiarism and originality in submissions. 
🔹 Live Chat Support – Allow participants to chat with mentors or organizers. 
🔹 Multi-Hackathon Support – Host and manage multiple hackathons on a single platform.


Link for my project(video uploaded on google drive)

https://drive.google.com/file/d/1J0cqQWpjJHpMFto-NesxLlT2Ph0DmEKj/view?usp=sharing

🛠️ Setup & Installation

Clone the Repository git clone https://github.com/mahekraigagla/Hackathon_Tracker_AI.git                                      

Install Dependencies
npm install

Start the Backend Server
cd server node index.js

Start the Frontend 
cd client npm start

Environment Variables 
Create a .env file and add necessary API keys: ini

MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret GITHUB_API_KEY=your_github_api_key
