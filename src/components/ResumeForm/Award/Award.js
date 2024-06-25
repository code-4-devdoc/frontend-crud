import React, { useState, useEffect } from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AwardRecord from "./AwardRecord";

const Award = ({ awards, setAwards }) => {
    useEffect(() => {
        const savedAwards = JSON.parse(localStorage.getItem('awards'));
        if (savedAwards) {
            setAwards(savedAwards);
        } else {
            setAwards([{ id: null, awardName: '', awardingInstitution: '', date: '', description: '' }]);
        }
    }, [setAwards]);

    useEffect(() => {
        localStorage.setItem('awards', JSON.stringify(awards));
    }, [awards]);

    const addAward = () => {
        setAwards(prev => [
            ...prev,
            { id: prev.length, awardName: '', awardingInstitution: '', date: '', description: '' }
        ]);
    };

    const removeAward = (index) => {
        setAwards(prev => prev.filter((_, idx) => idx !== index));
    };

    const updateAward = (index, field, value) => {
        setAwards(prev => prev.map((awrd, idx) => idx === index ? { ...awrd, [field]: value } : awrd));
    };

    return (
        <SectionContainer title="Award">
            {awards.map((awrd, index) => (
                <AwardRecord
                    key={index}
                    index={index}
                    award={awrd}
                    onRemove={() => removeAward(index)}
                    onUpdate={updateAward}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="수상 이력" onClick={addAward}></AddRecord>
        </SectionContainer>
    );
};

export default Award;
