const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('FemAura backend running');
});

app.post('/mood', (req, res) => {
  const moodData = req.body || {};
  const mood = moodData.mood || 'unknown';

  res.json({
    status: 'success',
    message: 'Mood data received',
    mood,
    received: moodData,
  });
});

app.post('/cycle', (req, res) => {
  const { lastPeriodDate, cycleLength = 28, periodDuration = 5 } = req.body || {};
  const result = {
    status: 'success',
    message: 'Cycle data processed',
    cycleSummary: {
      lastPeriodDate: lastPeriodDate || null,
      cycleLength,
      periodDuration,
      nextPeriodDate: null,
      ovulationDate: null,
      fertileWindow: null,
    },
  };

  if (lastPeriodDate) {
    const lastDate = new Date(lastPeriodDate);
    if (!Number.isNaN(lastDate.getTime())) {
      const nextPeriodDate = new Date(lastDate.getTime() + cycleLength * 24 * 60 * 60 * 1000);
      const ovulationDate = new Date(nextPeriodDate.getTime() - 14 * 24 * 60 * 60 * 1000);
      const fertileStart = new Date(ovulationDate.getTime() - 3 * 24 * 60 * 60 * 1000);
      const fertileEnd = new Date(ovulationDate.getTime() + 2 * 24 * 60 * 60 * 1000);

      const format = (date) => date.toISOString().split('T')[0];
      result.cycleSummary.nextPeriodDate = format(nextPeriodDate);
      result.cycleSummary.ovulationDate = format(ovulationDate);
      result.cycleSummary.fertileWindow = {
        start: format(fertileStart),
        end: format(fertileEnd),
      };
    }
  }

  res.json(result);
});

app.post('/chatbot', (req, res) => {
  const question = (req.body?.question || '').toString();
  const normalized = question.toLowerCase();

  let answer =
    'Thanks for your question! This is a sample response from the FemAura backend.';

  if (normalized.includes('pms')) {
    answer = 'PMS relief can include hydration, gentle movement, and rest. Keep a mood log to identify patterns.';
  } else if (normalized.includes('period') || normalized.includes('cycle')) {
    answer = 'Most cycles last between 21 and 35 days. Tracking your dates helps you understand your pattern.';
  } else if (normalized.includes('mood')) {
    answer = 'Mood changes are common. Balanced nutrition, sleep, and light exercise often help.';
  } else if (normalized.includes('menopause')) {
    answer = 'Menopause is a natural transition. Staying active and practicing self-care can ease symptoms.';
  }

  res.json({
    status: 'success',
    question,
    answer,
  });
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`FemAura backend running on port ${port}`);
});
