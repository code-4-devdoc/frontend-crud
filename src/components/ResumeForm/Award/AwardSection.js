import React, { useEffect } from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import AwardRecord from "./AwardRecord";

const AwardSection = ({ awards, setAwards, resumeId }) => {

    // 수상 추가 함수
    const addAward = () => {
        setAwards([...awards, { id: awards.length, awardName: '', awardingInstitution: '', date: '', description: ''}]);
    };

    // 수상 제거 함수
    const removeAward = (index) => {
        setAwards(awards.filter((_, idx) => idx !== index));
    };

    // 수상 업데이트 함수
    const updateAward = (index, field, value) => {
        setAwards(awards.map((awrd, idx) => idx === index ? { ...awrd, [field]: value } : awrd));
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
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="수상 이력" onClick={addAward}></AddRecord>
        </SectionContainer>
    );
};

export default AwardSection;

