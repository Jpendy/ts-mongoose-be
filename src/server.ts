import app from './lib/app';
import connect from './lib/utils/connect';

connect()
const PORT = process.env.PORT || 7890;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
