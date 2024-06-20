import React from 'react';
import CareerRecord from './CareerRecord';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";

// CareerSection 컴포넌트: 경력 섹션을 구성
const CareerSection = ({ careers, setCareers }) => {
    // 경력 추가 함수
    const addCareer = () => {
        setCareers([...careers, { id: careers.length, company: '', department: '', date: '', isCurrent: false, techStack: '', description: '' }]);
    };

    // 경력 제거 함수
    const removeCareer = (index) => {
        setCareers(careers.filter((_, idx) => idx !== index));
    };

    // 경력 업데이트 함수
    const updateCareer = (index, field, value) => {
        setCareers(careers.map((career, idx) => idx === index ? { ...career, [field]: value } : career));
    };

    return (
        <SectionContainer title="Career">
            {careers.map((career, index) => (
                <CareerRecord
                    key={index}
                    index={index}
                    career={career}
                    onRemove={() => removeCareer(index)}
                    onUpdate={updateCareer}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="경력" onClick={addCareer}></AddRecord>
        </SectionContainer>
    );
};

export default CareerSection;
