/**
 * Calculates a "Smart Match" score between a candidate and a job.
 * This simulates an AI algorithm by analyzing skill overlap.
 * 
 * @param {Object} candidate - Candidate object with skills array
 * @param {Object} job - Job object with requiredSkills array
 * @returns {Object} result - containing score (0-100) and match details
 */
export const calculateMatchScore = (candidate, job) => {
    if (!candidate || !job || !candidate.skills || !job.requiredSkills) {
        return { score: 0, matches: [], missing: [] };
    }

    const candidateSkills = candidate.skills.map(s => s.toLowerCase());
    const jobSkills = job.requiredSkills.map(s => s.toLowerCase());

    const matches = jobSkills.filter(skill => candidateSkills.includes(skill));
    const missing = jobSkills.filter(skill => !candidateSkills.includes(skill));

    const score = Math.round((matches.length / jobSkills.length) * 100);

    return {
        score,
        matches,
        missing
    };
};

/**
 * Returns a color for the score visual indicator
 */
export const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Emerald
    if (score >= 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
};
