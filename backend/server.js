require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Note: Mongoose 6+ automatically handles useNewUrlParser and useUnifiedTopology
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Mental Health Project API is running...');
});

// Authentication Routes
const authRoutes = require('./routes/authRoutes');
app.use(['/api/auth', '/auth'], authRoutes);

// Assessment Routes
const assessmentRoutes = require('./routes/assessmentRoutes');
app.use(['/api/assessments', '/assessments'], assessmentRoutes);

// Family Assessment Routes
const familyAssessmentRoutes = require('./routes/familyAssessmentRoutes');
app.use('/api/family-assessments', familyAssessmentRoutes);

// Referral Routes
const referralRoutes = require('./routes/referralRoutes');
const resourceHubRoutes = require('./routes/resourceHubRoutes');
app.use(['/api/referrals', '/referrals'], referralRoutes);
app.use(['/api/resourcehub', '/resourcehub'], resourceHubRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
