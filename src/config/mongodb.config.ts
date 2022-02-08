
import { registerAs } from '@nestjs/config'

export default registerAs('mongodb', () => ({
  host: process.env.MONGO_DB_HOST,
  user: process.env.MONGO_DB_USER,
  password: process.env.MONGO_DB_PASSWORD,
  name: process.env.MONGO_DB_NAME,
}));
