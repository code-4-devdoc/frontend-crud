import React from 'react';
import SkillRecord from './SkillRecord';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";

const SkillSection = ({ skills, setSkills }) => {
    // 기술 추가 함수
    const addSkill = () => {
        setSkills([...skills, { id: skills.length, techStack: '', description: '' }]);
    };

    // 기술 제거 함수
    const removeSkill = (index) => {
        setSkills(skills.filter((_, idx) => idx !== index));
    };

    // 기술 업데이트 함수
    const updateSkill = (index, field, value) => {
        setSkills(skills.map((skill, idx) => idx === index ? { ...skill, [field]: value } : skill));
    };

    return (
        <SectionContainer title="Skills">
            {skills.map((skill, index) => (
                <SkillRecord
                    key={index}
                    index={index}
                    skill={skill}
                    onRemove={() => removeSkill(index)}
                    onUpdate={updateSkill}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="주요 기술" onClick={addSkill}></AddRecord>
        </SectionContainer>
    );
};

export default SkillSection;
