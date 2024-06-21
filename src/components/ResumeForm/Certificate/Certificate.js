import React, {useEffect, useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import LanguageRecord from "../Language/LanguageRecord";

// Certificate.js: 사용자가 Certificate 항목 내 입력란에 입력한 데이터들을 관리하고 표시함

const Certificate = (certificates, setCertificates) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedCertificates = JSON.parse(localStorage.getItem('certifications'));
        if (savedCertificates) {
            setCertificates(savedCertificates);
        } else {
            setCertificates([{ id: null, certificationName: '', issuer: '', issueDate: ''}]);
        }
    }, [setCertificates]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('certifications', JSON.stringify(certificates));
    }, [certificates]);

    // 추가 함수
    const addCertificate = () => {
        setCertificates(prev => [
            ...prev,
            {id: null, certificationName: '', issuer: '', issueDate: ''}
        ]);
    };

    // 삭제 함수
    const removeCertificate = (index) => {
        setCertificates(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateCertificate = (index, field, value) => {
        setCertificates(prev => prev.map((cert, idx) => idx === index ? { ...cert, [field]: value } : cert));
    };

    return (
        <SectionContainer title="Certificate">
            {certificates.map((cert, index) => (
                <LanguageRecord
                    key={index}
                    index={index}
                    certificate={cert}
                    onRemove={() => removeCertificate(index)}
                    onUpdate={updateCertificate}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="자격증 이력" onClick={addCertificate}></AddRecord>
        </SectionContainer>
    );
};

export default Certificate;
