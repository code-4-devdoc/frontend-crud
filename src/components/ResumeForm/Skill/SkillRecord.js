import React, { useState } from 'react';
import styled from "styled-components";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding: 20px;
`;

const Input = styled.textarea`
    padding: 8px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    width: 100%;
    height: 60px;
    font-family: inherit;
`;

const SkillRecord = ({ index, skill, onRemove, onUpdate }) => {
    const [value, setValue] = useState(skill.description);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onUpdate(index, 'description', newValue);
    };

    return (
        <Border>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>주요 기술</span>
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
            <div style={{ display: "flex", alignItems: 'center', gap: 15, marginTop: 10 }}>
                <SkillSearchComponent
                    singleSelection={true}
                    selectedSkills={skill.techStack}
                    onSkillChange={(skills) => onUpdate(index, 'techStack', skills)}
                />
                <Input
                    placeholder="부연 설명을 입력하세요."
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </Border>
    );
};

export default SkillRecord;
