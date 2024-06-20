import React, { useState } from "react";
import styled from "styled-components";
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    width: 150px;
`;

const CareerRecord = ({ index, career, onRemove, onUpdate }) => {
    const checkboxOption = "재직";
    const [isChecked, setIsChecked] = useState(career.isCurrent);

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'date', career.date.split('-')[0]); // 현재 재직 중이라면 종료일 제거
        }
    };

    const [error, setError] = useState('');

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleDateChange = (startDate, endDate) => {
        const date = startDate + (endDate ? `-${endDate}` : '');
        onUpdate(index, 'date', date);
        if ((validateDate(startDate) && (endDate === '' || validateDate(endDate))) || date === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleSkillChange = (skills) => {
        onUpdate(index, 'techStack', skills);
    };

    return (
        <Border>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{
                    cursor: "pointer",
                    borderRadius: "0px 8px 0px 3px",
                    width: 30,
                    height: 20,
                    backgroundColor: "rgba(18, 73, 156, 50%)",
                    color: "white",
                    border: "none"
                }} onClick={onRemove}>-
                </button>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
                <Input placeholder="회사명" value={career.company} onChange={(e) => onUpdate(index, 'company', e.target.value)} />
                <Input placeholder="부서명/직책" value={career.department} onChange={(e) => onUpdate(index, 'department', e.target.value)} />
            </div>
            <div style={{ display: "flex", height: 35, alignItems: "center", marginTop: 5, gap: 5 }}>
            <Input style={{ width: 70 }} placeholder="YYYY.MM" value={career.date.split('-')[0]}
                    onChange={(e) => handleDateChange(e.target.value, career.date.split('-')[1] || '')} />
                <span>-</span>
                <Input style={{ width: 70, marginRight: 10 }} placeholder="YYYY.MM"
                    value={career.isCurrent ? '' : career.date.split('-')[1] || ''}
                    onChange={(e) => handleDateChange(career.date.split('-')[0], e.target.value)}
                    disabled={isChecked}
                />
                <CheckboxLabels option={checkboxOption} checked={isChecked} onChange={handleCheckboxChange}></CheckboxLabels>
            </div>
            {error && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error}</div>}
            <div style={{ height: 5 }}></div>
            <SkillSearchComponent
                selectedSkills={career.techStack}
                onSkillChange={handleSkillChange}
            />
            <Input as="textarea"
                style={{ marginTop: 5, width: 620, height: 60, fontFamily: "inherit" }}
                placeholder="업무 내용 또는 성과를 입력하세요."
                value={career.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
            />
        </Border>
    );
}

export default CareerRecord;
