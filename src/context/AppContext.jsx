import React, { createContext, useState, useContext, useEffect } from 'react';
import { candidates as mockCandidates, jobs as mockJobs, activity as mockActivity } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate async data fetching
        const timer = setTimeout(() => {
            setCandidates(mockCandidates);
            setJobs(mockJobs);
            setActivity(mockActivity);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const addCandidate = (candidate) => {
        const newCandidate = { ...candidate, id: Date.now().toString(), appliedDate: new Date().toISOString().split('T')[0] };
        setCandidates((prev) => [newCandidate, ...prev]);
        addActivity('System', 'New candidate addedmanual', newCandidate.name);
    };

    const updateCandidateStatus = (id, newStatus) => {
        setCandidates((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        const candidate = candidates.find(c => c.id === id);
        if (candidate) {
            addActivity('Recruiter', 'Updated status to ' + newStatus, candidate.name);
        }
    };

    const editCandidate = (updatedCandidate) => {
        setCandidates((prev) =>
            prev.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
        );
        addActivity('Recruiter', 'Updated details for', updatedCandidate.name);
    };

    const deleteCandidate = (id) => {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
    };

    const addJob = (job) => {
        const newJob = { ...job, id: Date.now().toString(), applicants: 0 };
        setJobs((prev) => [newJob, ...prev]);
    };

    const addActivity = (user, action, target) => {
        const newActivity = {
            id: Date.now(),
            user,
            action,
            target,
            time: 'Just now'
        };
        setActivity(prev => [newActivity, ...prev]);
    };

    const importData = (newCandidates) => {
        setCandidates(newCandidates);
        addActivity('System', 'Imported data', `${newCandidates.length} records`);
    };

    return (
        <AppContext.Provider
            value={{
                candidates,
                jobs,
                activity,
                loading,
                addCandidate,
                updateCandidateStatus,
                editCandidate,
                deleteCandidate,
                addJob,
                addActivity, // Exported for Comms
                importData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
