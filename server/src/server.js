import app from './app.js';
import { ensureSchema } from './bootstrap.js';

const port = process.env.PORT || 4000;

ensureSchema()
  .then(() => {
    app.listen(port, () => console.log(`🚀 Server on http://localhost:${port}`));
  })
  .catch((e) => {
    console.error('Schema init failed:', e);
    process.exit(1);
  });
