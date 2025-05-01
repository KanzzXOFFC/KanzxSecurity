import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const validApiKeys = ['kiuu']; //apikey
  const usersFilePath = path.join(process.cwd(), 'users.json');

  let users = [];
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const apiKey = req.query.apikey;
  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.status(200).json(users);
}
