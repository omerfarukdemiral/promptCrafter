import app from './app';

const port = process.env.PORT || 5678;

// Vercel için export
module.exports = app;

// Local development için
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} 