import express from 'express';
import { z } from 'zod';
import { voteProgram } from '../../services/vote';

export const router = express.Router();

const voteProgramParser = z.number();
const userIdParser = z.string().nonempty().uuid();

router.post('/vote/:programId', async (req, res) => {
    const userId = userIdParser.parse(req.headers["Authorization"]);
    const programId = voteProgramParser.parse(req.params.programId);
    
    const r = voteProgram(userId, programId);
})