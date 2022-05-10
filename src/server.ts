import app from "./lib/app";
import pool from "./lib/utils/pool";

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

process.on('exit', () => {
    console.log('Goodbye!');
    pool.end();
});